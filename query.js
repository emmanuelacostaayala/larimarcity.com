const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
    const groupBy = await prisma.deal.groupBy({
        by: ['assignedTo'],
        _count: { assignedTo: true },
        orderBy: { _count: { assignedTo: 'desc' } },
        take: 5
    });
    console.log(groupBy);
}
main().finally(() => prisma.$disconnect());
