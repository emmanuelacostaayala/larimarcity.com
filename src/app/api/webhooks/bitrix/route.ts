import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const BITRIX_BASE_URL = "https://clerhp.bitrix24.es/rest/17138/uffopruff8sqx8i9";

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
    if (secret !== (process.env.CRON_SECRET || "larimar_cron_2026")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        let start = 0;
        let fetched = 0;

        // Paginate through Bitrix deals
        while (true) {
            const res = await fetch(`${BITRIX_BASE_URL}/crm.deal.list.json`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    select: ["ID", "TITLE", "STAGE_ID", "ASSIGNED_BY_ID", "DATE_CREATE"],
                    start,
                }),
            });

            const data = await res.json();
            const deals = data.result || [];

            for (const deal of deals) {
                await prisma.deal.upsert({
                    where: { bitrixDealId: String(deal.ID) },
                    update: {
                        title: deal.TITLE || `Deal #${deal.ID}`,
                        stageId: deal.STAGE_ID || "UNKNOWN",
                        assignedTo: String(deal.ASSIGNED_BY_ID || ""),
                        updatedAt: new Date(),
                    },
                    create: {
                        bitrixDealId: String(deal.ID),
                        title: deal.TITLE || `Deal #${deal.ID}`,
                        stageId: deal.STAGE_ID || "UNKNOWN",
                        assignedTo: String(deal.ASSIGNED_BY_ID || ""),
                        stageDate: deal.DATE_CREATE ? new Date(deal.DATE_CREATE) : new Date(),
                    },
                });
            }

            fetched += deals.length;
            if (deals.length < 50) break;
            start += 50;
        }

        console.log(`[SYNC] Synced ${fetched} deals from Bitrix`);
        return NextResponse.json({ success: true, synced: fetched });
    } catch (error) {
        console.error("[SYNC] Error:", error);
        return NextResponse.json({ error: "Sync failed" }, { status: 500 });
    }
}
