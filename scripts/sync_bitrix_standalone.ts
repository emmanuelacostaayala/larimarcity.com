import { PrismaClient } from "@prisma/client";
// Use native global fetch (Node 18+) to avoid build issues in Vercel

const prisma = new PrismaClient();
const BITRIX_BASE_URL = process.env.BITRIX_BASE_URL || "";

async function syncDeals(priority = true) {
    console.log(`[STANDALONE SYNC] priority=${priority}`);

    const filter: any = {};
    if (priority) {
        const fortyFiveDaysAgo = new Date();
        fortyFiveDaysAgo.setDate(fortyFiveDaysAgo.getDate() - 45);
        filter[">DATE_CREATE"] = fortyFiveDaysAgo.toISOString();
    }

    let start = 0;
    let fetched = 0;
    const batchSize = 50;

    while (true) {
        const res = await fetch(`${BITRIX_BASE_URL}/crm.deal.list.json`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                select: [
                    "ID", "TITLE", "STAGE_ID", "ASSIGNED_BY_ID", "DATE_CREATE",
                    "OPPORTUNITY", "CURRENCY_ID", "CATEGORY_ID",
                    "UF_CRM_1738074094", "UF_CRM_678FA5F2E77CA", "UF_CRM_678FA5F32A335",
                    "UTM_SOURCE", "UTM_MEDIUM", "UTM_CAMPAIGN"
                ],
                filter,
                start,
            }),
        });

        const data = await res.json() as any;
        const deals = (data.result as any[]) || [];
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
                    proyecto: deal.UF_CRM_1738074094 || null,
                    interes: deal.UF_CRM_678FA5F2E77CA || null,
                    pais: deal.UF_CRM_678FA5F32A335 || null,
                    utmSource: deal.UTM_SOURCE || null,
                    utmMedium: deal.UTM_MEDIUM || null,
                    utmCampaign: deal.UTM_CAMPAIGN || null,
                    createdAt: bitrixDate,
                    updatedAt: new Date(),
                } as any,
                create: {
                    bitrixDealId: String(deal.ID),
                    title: deal.TITLE || `Deal #${deal.ID}`,
                    stageId: deal.STAGE_ID || "UNKNOWN",
                    assignedTo: String(deal.ASSIGNED_BY_ID || ""),
                    opportunity: parseFloat(deal.OPPORTUNITY || "0"),
                    currency: deal.CURRENCY_ID || "USD",
                    proyecto: deal.UF_CRM_1738074094 || null,
                    interes: deal.UF_CRM_678FA5F2E77CA || null,
                    pais: deal.UF_CRM_678FA5F32A335 || null,
                    utmSource: deal.UTM_SOURCE || null,
                    utmMedium: deal.UTM_MEDIUM || null,
                    utmCampaign: deal.UTM_CAMPAIGN || null,
                    createdAt: bitrixDate,
                    stageDate: bitrixDate,
                } as any,
            });
        }
        fetched += deals.length;
        console.log(`   Processed ${fetched} deals...`);
        if (deals.length < batchSize) break;
        start += batchSize;

        // Safety break for priority
        if (priority && fetched > 5000) break;
    }
    console.log(`[STANDALONE SYNC] Completed: ${fetched} deals synced.`);
}

syncDeals(true).catch(console.error).finally(() => prisma.$disconnect());
