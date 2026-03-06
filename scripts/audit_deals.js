const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const p = new PrismaClient();

async function audit() {
    const stages = await p.deal.groupBy({
        by: ['stageId'],
        _count: { id: true },
        _sum: { opportunity: true },
        orderBy: { _count: { id: 'desc' } },
    });

    let out = "=== ETAPAS Y MONTOS ===\n";
    for (const s of stages) {
        out += `${s.stageId.padEnd(35)} | Deals: ${String(s._count.id).padStart(6)} | Monto: $${(s._sum.opportunity || 0).toFixed(2)}\n`;
    }

    const totalDeals = await p.deal.count();
    const withMoney = await p.deal.count({ where: { opportunity: { gt: 0 } } });
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const last30 = await p.deal.count({ where: { createdAt: { gte: thirtyDaysAgo } } });

    const sampleWithMoney = await p.deal.findMany({
        where: { opportunity: { gt: 0 } },
        select: { stageId: true, opportunity: true, title: true },
        take: 10
    });
    const zeroOpportunity = await p.deal.count({ where: { opportunity: 0 } });

    out += `\n=== RESUMEN ===\n`;
    out += `Total deals en DB: ${totalDeals}\n`;
    out += `Deals con monto > 0: ${withMoney}\n`;
    out += `Deals con monto = 0: ${zeroOpportunity}\n`;
    out += `Deals ultimos 30 dias (createdAt): ${last30}\n`;

    if (sampleWithMoney.length) {
        out += `\n=== SAMPLE DEALS CON DINERO ===\n`;
        sampleWithMoney.forEach(d => out += `  Stage: ${d.stageId} | $${d.opportunity} | ${(d.title || "").slice(0, 50)}\n`);
    } else {
        out += `\n>>> NO HAY DEALS CON MONTO > 0 EN LA BASE DE DATOS <<<\n`;
    }

    fs.writeFileSync("C:/tmp/audit_result.txt", out);
    console.log("Audit written to C:/tmp/audit_result.txt");
    console.log(out);
}

audit().catch(console.error).finally(() => p.$disconnect());
