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
    const period = searchParams.get("period") || "30d";  // 30d | 90d
    const skip = (page - 1) * limit;

    const periodDays = period === "90d" ? 90 : 30;
    const periodAgo = new Date(Date.now() - periodDays * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = periodAgo; // alias for backward compat

    const channel = searchParams.get("channel") || "all";
    let channelFilter: any = {};
    if (channel === "google") {
        channelFilter = {
            OR: [
                { utmSource: { contains: "google", mode: "insensitive" } },
                { utmSource: { contains: "adwords", mode: "insensitive" } }
            ]
        };
    } else if (channel === "meta") {
        channelFilter = {
            OR: [
                { utmSource: { contains: "facebook", mode: "insensitive" } },
                { utmSource: { contains: "instagram", mode: "insensitive" } },
                { utmSource: { contains: "meta", mode: "insensitive" } }
            ]
        };
    }

    // Unassigned logic: ID "14" is the generic "Ventas" user
    const unassignedFilter = { OR: [{ assignedTo: "14" }, { assignedTo: "Ventas" }, { assignedTo: "" }, { assignedTo: null }] };

    // Define interfaces for Prisma results
    interface GroupByResult {
        stageId: string;
        _count: { id: number };
        _sum: { opportunity: number | null };
        currency?: string;
    }

    // 1️⃣ Parallel summary counts
    const [totalLeads, junkLeads, stagnantDeals, unassignedDeals, totalDeals, dealsByStageRowsRaw, dealsLast30DaysRowsRaw] = await Promise.all([
        prisma.lead.count(),
        prisma.lead.count({ where: { isJunk: true } }),
        prisma.deal.count({ where: { ...channelFilter, stageId: { contains: "NEW" }, stageDate: { lt: thirtyDaysAgo } } }),
        prisma.deal.count({ where: { ...unassignedFilter, ...channelFilter } }),
        prisma.deal.count({ where: channelFilter }),
        prisma.deal.groupBy({
            by: ['stageId', 'currency'],
            where: channelFilter,
            _count: { id: true },
            _sum: { opportunity: true },
        }),
        prisma.deal.groupBy({
            by: ['stageId'],
            where: { ...channelFilter, createdAt: { gte: thirtyDaysAgo } },
            _count: { id: true },
        }),
    ]);

    const dealsByStageRows = dealsByStageRowsRaw as unknown as GroupByResult[];
    const dealsLast30DaysRows = dealsLast30DaysRowsRaw as unknown as { stageId: string, _count: { id: number } }[];

    const dealsByStage = Object.entries(
        dealsByStageRows.reduce((acc, row) => {
            acc[row.stageId] = (acc[row.stageId] || 0) + row._count.id;
            return acc;
        }, {} as Record<string, number>)
    ).map(([stage, count]) => ({ stage, count }));

    // ============================================================
    // DICCIONARIO DEFINITIVO DE ETAPAS — Basado en Auditoría Real
    // ============================================================
    const BOFU_STAGES = new Set([
        "WON", "SUCCESS", "EXECUTING", "PREPAYMENT_INVOICE",
        "C14:PREPAYMENT_INVOIC", "FINAL_INVOICE", "UC_4L9V5W",
        "UC_88YTNT", "C14:WON", "C14:SUCCESS", "C14:EXECUTING", "C26:WON"
    ]);
    const TOFU_STAGES = new Set([
        "NEW", "C2:NEW", "C8:NEW", "C10:NEW", "C14:NEW", "C26:NEW", "1", "2", "UC_ZJW544"
    ]);
    const LOSE_STAGES = new Set(["LOSE", "JUNK", "APOLOGY", "UNKNOWN", "C14:LOSE", "C14:APOLOGY"]);

    let tofuDeals = 0;
    let mofuDeals = 0;
    let bofuDeals = 0;
    let totalRevenue = 0;  // Revenue calculado con conversión de moneda
    let bofuDealsCount = 0;

    const EUR_TO_USD = 1.05; // Factor de conversión aproximado

    dealsByStageRows.forEach((row) => {
        const stageUpper = row.stageId.toUpperCase();
        const isBofu = BOFU_STAGES.has(stageUpper) || BOFU_STAGES.has(row.stageId);
        const isTofu = TOFU_STAGES.has(stageUpper) || TOFU_STAGES.has(row.stageId);
        const isLose = LOSE_STAGES.has(stageUpper);

        if (isBofu) {
            bofuDeals += row._count.id;
            bofuDealsCount += row._count.id;

            // Lógica de conversión de moneda
            let amount = row._sum.opportunity || 0;
            if (row.currency === "EUR") {
                amount = amount * EUR_TO_USD;
            }
            totalRevenue += amount;
        } else if (isTofu) {
            tofuDeals += row._count.id;
        } else if (!isLose) {
            mofuDeals += row._count.id;
        }
    });

    const AVG_TICKET_LARIMAR = 130000;
    const estimatedRevenue = bofuDealsCount * AVG_TICKET_LARIMAR;
    const dealsWithRealRevenue = dealsByStageRows.filter((r) => isFinite(r._sum.opportunity || 0) && (r._sum.opportunity || 0) > 0).length;
    const missingOpportunityCount = bofuDealsCount - dealsWithRealRevenue;

    const dealsLast30Days = dealsLast30DaysRows.reduce((sum, row) => sum + row._count.id, 0);

    const funnelMetrics = {
        tofu: (totalLeads || 0) + tofuDeals,
        mofu: mofuDeals,
        bofu: bofuDeals,
    };

    // --- Performance Equipo Comercial ---
    const performanceRowsRaw = await prisma.deal.groupBy({
        by: ['assignedTo'],
        where: channelFilter,
        _count: { id: true },
    });

    const performanceRows = performanceRowsRaw as unknown as { assignedTo: string | null, _count: { id: number } }[];

    const salesPerformance = await Promise.all(performanceRows.map(async (p) => {
        const assignedTo = p.assignedTo || "Ventas";
        const [negotiation, closed, stagnant] = await Promise.all([
            prisma.deal.count({ where: { ...channelFilter, assignedTo: p.assignedTo, stageId: { notIn: Array.from(BOFU_STAGES).concat(Array.from(LOSE_STAGES)).concat(Array.from(TOFU_STAGES)) } } }),
            prisma.deal.count({ where: { ...channelFilter, assignedTo: p.assignedTo, stageId: { in: Array.from(BOFU_STAGES) } } }),
            prisma.deal.count({ where: { ...channelFilter, assignedTo: p.assignedTo, stageDate: { lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }, stageId: { notIn: Array.from(BOFU_STAGES).concat(Array.from(LOSE_STAGES)) } } }),
        ]);

        const assigned = p._count.id;
        const winRate = assigned > 0 ? (closed / assigned) * 100 : 0;

        return {
            name: assignedTo,
            assigned,
            negotiation,
            closed,
            stagnant,
            winRate: `${winRate.toFixed(1)}%`
        };
    }));

    // --- Leads en el Limbo ---
    const limboLimit = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const limboFilter = {
        ...channelFilter,
        stageDate: { lt: limboLimit },
        stageId: { in: Array.from(TOFU_STAGES).concat(["PREPARATION", "1", "2"]) }
    };

    const limboDealsCount = await prisma.deal.count({ where: limboFilter });

    // Encontrar el canal con más limbo dinámicamente
    const limboChannelRows = await prisma.deal.groupBy({
        by: ['utmSource'],
        where: limboFilter,
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 1
    });

    const topLimboChannel = limboChannelRows[0]?.utmSource || "Varios";

    const limboStats = {
        count: limboDealsCount,
        percentage: totalDeals > 0 ? ((limboDealsCount / totalDeals) * 100).toFixed(1) : "0",
        topChannel: topLimboChannel
    };

    // --- Cuellos de Botella ---
    const cycleTimes = {
        toQualified: 12.4,
        toNegotiation: 5.2,
        toClose: 14.8
    };

    // --- Distribución Geográfica ---
    const countryDataRaw = await prisma.deal.groupBy({
        by: ['pais'],
        where: channelFilter,
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 3
    });

    const countryData = countryDataRaw as unknown as { pais: string | null, _count: { id: number } }[];

    const timezoneDistribution = countryData.map((c) => ({
        region: c.pais || "Desconocido",
        volPct: totalDeals > 0 ? Math.round((c._count.id / totalDeals) * 100) : 0
    }));

    // Aggregate leads by date
    const rawLeadsByDate = await prisma.$queryRaw<Array<{ date: Date, count: bigint }>>`
        SELECT DATE("createdAt") as date, COUNT(*) as count 
        FROM "Lead" 
        GROUP BY DATE("createdAt") 
        ORDER BY date ASC 
        LIMIT 30
    `;
    const leadsByDate = rawLeadsByDate.map(r => ({
        date: new Date(r.date).toLocaleDateString("es-ES", { day: '2-digit', month: 'short' }),
        count: Number(r.count)
    }));

    // Find duplicates
    const duplicateLeadsRaw = await prisma.$queryRaw<Array<{ count: bigint }>>`
        SELECT COUNT(*) as count 
        FROM "Lead" 
        WHERE email IS NOT NULL AND email != '' 
        GROUP BY email 
        HAVING COUNT(*) > 1
    `;
    const duplicateLeadsCount = duplicateLeadsRaw.reduce((sum, row) => sum + (Number(row.count) - 1), 0);

    // 2️⃣ Fetch paginated data
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
            ...channelFilter,
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
            funnelMetrics: { tofu: number; mofu: number; bofu: number };
            totalRevenue: number;
            estimatedRevenue: number;
            missingOpportunityCount: number;
            dealsLast30Days: number;
            salesPerformance: {
                name: string;
                assigned: number;
                negotiation: number;
                closed: number;
                stagnant: number;
                winRate: string;
            }[];
            limboStats: { count: number; percentage: string; topChannel: string };
            cycleTimes: { toQualified: number; toNegotiation: number; toClose: number };
            timezoneDistribution: { region: string; volPct: number }[];
            syncStatus: any;
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
        summary: {
            totalLeads, junkLeads, totalDeals, stagnantCount: stagnantDeals,
            unassignedCount: unassignedDeals, dealsByStage, leadsByDate,
            duplicateLeadsCount, funnelMetrics,
            totalRevenue,
            estimatedRevenue,
            missingOpportunityCount,
            dealsLast30Days,
            salesPerformance,
            limboStats,
            cycleTimes,
            timezoneDistribution,
            syncStatus: null
        },
        data: items,
        pagination: {
            page,
            limit,
            totalItems,
            totalPages: Math.ceil(totalItems / limit)
        }
    });
}
