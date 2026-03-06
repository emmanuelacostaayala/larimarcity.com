import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const email = "admin@larimarcity.com";
    const password = process.env.ADMIN_PASSWORD || "L4r1m4r_2026_!Safe";
    const passwordHash = await bcrypt.hash(password, 10);

    console.log(`Creating admin user: ${email}...`);
    await prisma.user.upsert({
        where: { email },
        update: { passwordHash },
        create: {
            email,
            passwordHash,
        },
    });
    console.log("Admin user created successfully.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
