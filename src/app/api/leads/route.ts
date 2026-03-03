import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateLead } from "@/lib/junkDetector";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, source, ...rest } = body;

        // --- Server-side validation ---
        const validation = validateLead({ name, email, phone });
        if (!validation.isValid && !validation.isJunk) {
            return NextResponse.json({ error: validation.junkReason || "Invalid form data" }, { status: 400 });
        }

        // --- Store in local DB (always, before any Bitrix interaction) ---
        const lead = await prisma.lead.create({
            data: {
                name: (name || "").trim(),
                email: (email || "").toLowerCase().trim(),
                phone: phone?.trim() || null,
                source: source || "Website Form",
                isJunk: validation.isJunk,
                junkReason: validation.junkReason || null,
                payload: JSON.stringify({ ...rest, name, email, phone }),
            },
        });

        console.log(`[LEAD] Created: id=${lead.id} email=${lead.email} junk=${lead.isJunk}`);

        if (validation.isJunk) {
            // Do not reject — store silently for audit, but return success to not tip off spammers
            return NextResponse.json({ success: true, message: "Received" });
        }

        // TODO: Integrar API Write de Bitrix — enviar lead.id a Bitrix24 CRM
        // await sendToBitrix({ name, email, phone, source });

        return NextResponse.json({ success: true, message: "Gracias, nos pondremos en contacto pronto." });
    } catch (error) {
        console.error("[LEADS API] Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    // Dashboard internal use — protected by auth middleware
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter"); // junk | stale | unassigned

    let leads;
    if (filter === "junk") {
        leads = await prisma.lead.findMany({ where: { isJunk: true }, orderBy: { createdAt: "desc" } });
    } else {
        leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
    }
    return NextResponse.json(leads);
}
