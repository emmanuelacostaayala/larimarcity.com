/**
 * Seed script: creates the default admin user.
 * Run: node prisma/seed.js
 */
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
    const email = "admin@larimarcity.com";
    const password = "L4r1m4r_2026_!Safe";
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.upsert({
        where: { email },
        update: { passwordHash },
        create: { email, passwordHash },
    });

    console.log(`✅ Admin user seeded: ${user.email}`);
    console.log(`   Login credentials: ${email} / ${password}`);
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
