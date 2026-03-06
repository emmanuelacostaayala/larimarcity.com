import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const BITRIX_BASE_URL = process.env.BITRIX_BASE_URL || "";

/**
 * POST — Bitrix Outbound Webhook Listener (real-time updates)
 * Configure this URL in Bitrix24: Settings > Outbound Webhooks
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.text();
        const params = new URLSearchParams(body);
        const event = params.get("event");
        const dealId = params.get("data[FIELDS][ID]");
        const stageId = params.get("data[FIELDS][STAGE_ID]");
        const assignedBy = params.get("data[FIELDS][ASSIGNED_BY_ID]");

        console.log(`[WEBHOOK INBOUND] event=${event} dealId=${dealId} stage=${stageId}`);

        if (event?.startsWith("ONCRM") && dealId) {
            await prisma.deal.upsert({
                where: { bitrixDealId: dealId },
                update: {
                    stageId: stageId || "UNKNOWN",
                    assignedTo: assignedBy || null,
                    stageDate: new Date(),
                    updatedAt: new Date(),
                },
                create: {
                    bitrixDealId: dealId,
                    title: `Deal #${dealId}`,
                    stageId: stageId || "UNKNOWN",
                    assignedTo: assignedBy || null,
                    stageDate: new Date(),
                },
            });
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("[WEBHOOK INBOUND] Error:", error);
        return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
    }
}

/**
 * GET — Trigger a full sync from Bitrix (used by cron job every 15 min)
 * Call: GET /api/webhooks/bitrix?secret=<CRON_SECRET>
 */
export async function GET(req: NextRequest) {
    const secret = req.nextUrl.searchParams.get("secret");
    if (secret !== (process.env.CRON_SECRET || "")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isFullSync = req.nextUrl.searchParams.get("full") === "true";
    const isPriority = req.nextUrl.searchParams.get("priority") === "true";

    try {
        // Enforce a 30-day window for priority sync to avoid timeout
        const filter: any = {};
        if (isPriority) {
            const fortyFiveDaysAgo = new Date();
            fortyFiveDaysAgo.setDate(fortyFiveDaysAgo.getDate() - 45);
            filter[">DATE_CREATE"] = fortyFiveDaysAgo.toISOString();
        }

        let start = 0;
        let fetched = 0;
        const batchSize = 50;
        const maxPerExecution = isFullSync ? 5000 : 500; // Limit per request to prevent server timeout

        console.log(`[SYNC] Starting sync: priority=${isPriority}, full=${isFullSync}`);

        // Paginate through Bitrix deals
        while (fetched < maxPerExecution) {
            const res = await fetch(`${BITRIX_BASE_URL}/crm.deal.list.json`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    select: [
                        "ID", "TITLE", "STAGE_ID", "ASSIGNED_BY_ID", "DATE_CREATE",
                        "OPPORTUNITY", "CURRENCY_ID", "CATEGORY_ID",
                        "UF_CRM_1738074094", // Proyecto
                        "UF_CRM_678FA5F2E77CA", // Interés
                        "UF_CRM_678FA5F32A335", // País
                        "UTM_SOURCE", "UTM_MEDIUM", "UTM_CAMPAIGN"
                    ],
                    filter,
                    start,
                }),
            });

            const data = await res.json();
            const deals = data.result || [];

            if (deals.length === 0) break;

            for (const deal of deals) {
                const bitrixDate = deal.DATE_CREATE ? new Date(deal.DATE_CREATE) : new Date();

                await prisma.deal.upsert({
                    where: { bitrixDealId: String(deal.ID) },
                    update: {
                        title: deal.TITLE || `Deal #${deal.ID}`,
                        stageId: deal.STAGE_ID || "UNKNOWN",
                        assignedTo: String(deal.ASSIGNED_BY_ID || ""),
                        opportunity: parseFloat(deal.OPPORTUNITY || "0"),
                        currency: deal.CURRENCY_ID || "USD",
                        categoryId: deal.CATEGORY_ID ? String(deal.CATEGORY_ID) : "0",
                        proyecto: deal.UF_CRM_1738074094 || null,
                        interes: deal.UF_CRM_678FA5F2E77CA || null,
                        pais: deal.UF_CRM_678FA5F32A335 || null,
                        utmSource: deal.UTM_SOURCE || null,
                        utmMedium: deal.UTM_MEDIUM || null,
                        utmCampaign: deal.UTM_CAMPAIGN || null,
                        bitrixCreatedAt: bitrixDate,
                        createdAt: bitrixDate, // Force for stats
                        updatedAt: new Date(),
                    } as any,
                    create: {
                        bitrixDealId: String(deal.ID),
                        title: deal.TITLE || `Deal #${deal.ID}`,
                        stageId: deal.STAGE_ID || "UNKNOWN",
                        assignedTo: String(deal.ASSIGNED_BY_ID || ""),
                        opportunity: parseFloat(deal.OPPORTUNITY || "0"),
                        currency: deal.CURRENCY_ID || "USD",
                        categoryId: deal.CATEGORY_ID ? String(deal.CATEGORY_ID) : "0",
                        proyecto: deal.UF_CRM_1738074094 || null,
                        interes: deal.UF_CRM_678FA5F2E77CA || null,
                        pais: deal.UF_CRM_678FA5F32A335 || null,
                        utmSource: deal.UTM_SOURCE || null,
                        utmMedium: deal.UTM_MEDIUM || null,
                        utmCampaign: deal.UTM_CAMPAIGN || null,
                        bitrixCreatedAt: bitrixDate,
                        createdAt: bitrixDate,
                        stageDate: bitrixDate,
                    } as any,
                });
            }

            fetched += deals.length;
            if (deals.length < batchSize) break;
            start += batchSize;
        }

        console.log(`[SYNC] Executed batch: synced ${fetched} deals`);
        return NextResponse.json({
            success: true,
            synced: fetched,
            message: fetched >= maxPerExecution ? "Batch complete, more records pending" : "Sync finished"
        });
    } catch (error) {
        console.error("[SYNC] Error:", error);
        return NextResponse.json({ error: "Sync failed" }, { status: 500 });
    }
}
