import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const BITRIX_BASE = "https://clerhp.bitrix24.es/rest/17138/uffopruff8sqx8i9";

function sendEvent(controller: ReadableStreamDefaultController, data: object) {
    const payload = `data: ${JSON.stringify(data)}\n\n`;
    controller.enqueue(new TextEncoder().encode(payload));
}

export async function GET(req: NextRequest) {
    const session = await getSession();
    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const stream = new ReadableStream({
        async start(controller) {
            try {
                let totalLeads = 0;
                let totalDeals = 0;

                // --- Sync Leads ---
                sendEvent(controller, { phase: "leads", message: "Iniciando sync de Leads...", count: 0, done: false });

                let start = 0;

                // LIMIT TO 1 PAGE (50 records) max per invocation for Vercel Serverless timeout
                const resLeads = await fetch(`${BITRIX_BASE}/crm.lead.list.json`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        select: ["ID", "TITLE", "NAME", "LAST_NAME", "EMAIL", "PHONE", "STATUS_ID", "DATE_CREATE"],
                        order: { ID: "DESC" }, // Fetch newest
                        start,
                    }),
                });

                if (resLeads.ok) {
                    const data = await resLeads.json();
                    const leads = data.result || [];

                    for (const l of leads) {
                        const email = l.EMAIL?.[0]?.VALUE?.toLowerCase().trim() || `noemail+${l.ID}@bitrix.local`;
                        const name = `${l.NAME || ""} ${l.LAST_NAME || ""}`.trim() || l.TITLE || `Lead #${l.ID}`;
                        const phone = l.PHONE?.[0]?.VALUE || null;
                        const isJunk = l.STATUS_ID === "JUNK";

                        await prisma.lead.upsert({
                            where: { bitrixLeadId: String(l.ID) },
                            update: { name, email, phone, isJunk, updatedAt: new Date() },
                            create: {
                                bitrixLeadId: String(l.ID),
                                name,
                                email,
                                phone,
                                source: "Bitrix CRM",
                                isJunk,
                                junkReason: isJunk ? "Marcado JUNK en Bitrix" : null,
                            },
                        }).catch(() => null);
                        totalLeads++;
                    }
                    sendEvent(controller, { phase: "leads", message: `Leads sincronizados: ${totalLeads}`, count: totalLeads, done: false });
                }

                sendEvent(controller, { phase: "leads", message: `✅ Leads completo: ${totalLeads}`, count: totalLeads, done: true });

                // --- Sync Deals ---
                sendEvent(controller, { phase: "deals", message: "Iniciando sync de Deals...", count: 0, done: false });

                start = 0;
                const resDeals = await fetch(`${BITRIX_BASE}/crm.deal.list.json`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        select: ["ID", "TITLE", "STAGE_ID", "ASSIGNED_BY_ID", "DATE_CREATE", "DATE_MODIFY"],
                        order: { ID: "DESC" }, // Fetch newest
                        start,
                    }),
                });

                if (resDeals.ok) {
                    const data = await resDeals.json();
                    const deals = data.result || [];

                    for (const d of deals) {
                        await prisma.deal.upsert({
                            where: { bitrixDealId: String(d.ID) },
                            update: {
                                title: d.TITLE || `Deal #${d.ID}`,
                                stageId: d.STAGE_ID || "UNKNOWN",
                                assignedTo: String(d.ASSIGNED_BY_ID || ""),
                                stageDate: d.DATE_MODIFY ? new Date(d.DATE_MODIFY) : undefined,
                                updatedAt: new Date(),
                            },
                            create: {
                                bitrixDealId: String(d.ID),
                                title: d.TITLE || `Deal #${d.ID}`,
                                stageId: d.STAGE_ID || "UNKNOWN",
                                assignedTo: String(d.ASSIGNED_BY_ID || ""),
                                stageDate: d.DATE_CREATE ? new Date(d.DATE_CREATE) : new Date(),
                            },
                        }).catch(() => null);
                        totalDeals++;
                    }
                    sendEvent(controller, { phase: "deals", message: `Deals sincronizados: ${totalDeals}`, count: totalDeals, done: false });
                }

                sendEvent(controller, { phase: "deals", message: `✅ Deals completo: ${totalDeals}`, count: totalDeals, done: true });
                sendEvent(controller, { phase: "complete", message: `Sync completo: ${totalLeads} leads · ${totalDeals} deals`, totalLeads, totalDeals, done: true });
            } catch (err) {
                sendEvent(controller, { phase: "error", message: "Error durante la sincronización", done: true });
                console.error("[SYNC SSE] Error:", err);
            } finally {
                controller.close();
            }
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
        },
    });
}
