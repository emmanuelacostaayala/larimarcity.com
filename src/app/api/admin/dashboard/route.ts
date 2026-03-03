import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const tab = searchParams.get("tab") || "leads";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const search = searchParams.get("search") || "";
    const skip = (page - 1) * limit;

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // Unassigned logic: ID "14" is the generic "Ventas" user
    const unassignedFilter = { OR: [{ assignedTo: "14" }, { assignedTo: "Ventas" }, { assignedTo: "" }, { assignedTo: null }] };

    // 1️⃣ Parallel summary counts
    const [totalLeads, junkLeads, stagnantDeals, unassignedDeals, totalDeals, dealsByStageRows] = await Promise.all([
        prisma.lead.count(),
        prisma.lead.count({ where: { isJunk: true } }),
        prisma.deal.count({ where: { stageId: { contains: "NEW" }, stageDate: { lt: thirtyDaysAgo } } }),
        prisma.deal.count({ where: unassignedFilter }),
        prisma.deal.count(),
        prisma.deal.groupBy({ by: ['stageId'], _count: { id: true }, orderBy: { _count: { id: 'desc' } } }),
    ]);

    const dealsByStage = dealsByStageRows.map((row) => ({ stage: row.stageId, count: row._count.id }));

    // Aggregate leads by date (last 7 days)
    const rawLeadsByDate = await prisma.$queryRaw<Array<{ date: Date, count: bigint }>>`
        SELECT DATE("createdAt") as date, COUNT(*) as count 
        FROM "Lead" 
        GROUP BY DATE("createdAt") 
        ORDER BY date ASC 
        LIMIT 7
    `;
    const leadsByDate = rawLeadsByDate.map(r => ({
        date: new Date(r.date).toLocaleDateString("es-ES", { day: '2-digit', month: 'short' }),
        count: Number(r.count)
    }));

    // Find duplicates (Leads with same email)
    const duplicateLeadsRaw = await prisma.$queryRaw<Array<{ count: bigint }>>`
        SELECT COUNT(*) as count 
        FROM "Lead" 
        WHERE email IS NOT NULL AND email != '' 
        GROUP BY email 
        HAVING COUNT(*) > 1
    `;
    const duplicateLeadsCount = duplicateLeadsRaw.reduce((sum, row) => sum + (Number(row.count) - 1), 0);

    // 2️⃣ Fetch paginated data based on the selected tab
    let items: any[] = [];
    let totalItems = 0;

    if (tab === "leads" || tab === "junk") {
        const whereClause = {
            ...(tab === "junk" ? { isJunk: true } : {}),
            ...(search ? {
                OR: [
                    { name: { contains: search, mode: "insensitive" as const } },
                    { email: { contains: search, mode: "insensitive" as const } },
                    { phone: { contains: search, mode: "insensitive" as const } },
                ]
            } : {})
        };
        const [fetchedItems, count] = await Promise.all([
            prisma.lead.findMany({ where: whereClause, orderBy: { createdAt: "desc" }, skip, take: limit }),
            prisma.lead.count({ where: whereClause })
        ]);
        items = fetchedItems;
        totalItems = count;
    } else if (tab === "deals" || tab === "stagnant" || tab === "unassigned") {
        const baseWhere = tab === "stagnant"
            ? { stageId: { contains: "NEW" }, stageDate: { lt: thirtyDaysAgo } }
            : tab === "unassigned"
                ? unassignedFilter
                : {};

        const whereClause = {
            ...baseWhere,
            ...(search ? {
                OR: [
                    { title: { contains: search, mode: "insensitive" as const } },
                    { bitrixDealId: { contains: search, mode: "insensitive" as const } },
                    { assignedTo: { contains: search, mode: "insensitive" as const } },
                ]
            } : {})
        };
        const [fetchedItems, count] = await Promise.all([
            prisma.deal.findMany({ where: whereClause, orderBy: { createdAt: "desc" }, skip, take: limit }),
            prisma.deal.count({ where: whereClause })
        ]);
        items = fetchedItems;
        totalItems = count;
    }

    interface DashboardData {
        summary: {
            totalLeads: number;
            junkLeads: number;
            totalDeals: number;
            stagnantCount: number;
            unassignedCount: number;
            dealsByStage: { stage: string; count: number }[];
            leadsByDate: { date: string; count: number }[];
            duplicateLeadsCount: number;
        };
        data: any[];
        pagination: {
            page: number;
            limit: number;
            totalItems: number;
            totalPages: number;
        };
    }

    return NextResponse.json<DashboardData>({
        summary: { totalLeads, junkLeads, totalDeals, stagnantCount: stagnantDeals, unassignedCount: unassignedDeals, dealsByStage, leadsByDate, duplicateLeadsCount },
        data: items,
        pagination: {
            page,
            limit,
            totalItems,
            totalPages: Math.ceil(totalItems / limit)
        }
    });
}
