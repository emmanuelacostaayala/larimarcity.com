/**
 * bulk-sync.js — Batched import of all Bitrix leads and deals to Neon.
 * Uses createMany with skipDuplicates for 50x speed vs individual upserts.
 * Run: node prisma/bulk-sync.js
 */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const BITRIX_BASE = "https://clerhp.bitrix24.es/rest/17138/uffopruff8sqx8i9";

async function fetchAll(endpoint, selectFields) {
    const all = [];
    let start = 0;
    let page = 1;
    while (true) {
        process.stdout.write(`\r  ↳ Página ${page} (${all.length.toLocaleString()} registros)...`);
        const res = await fetch(`${BITRIX_BASE}/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ select: selectFields, order: { ID: "ASC" }, start }),
        });
        if (!res.ok) { console.log(`\n  ⚠️  HTTP ${res.status}`); break; }
        const data = await res.json();
        if (data.error) { console.log(`\n  ⚠️  ${data.error_description}`); break; }
        const items = data.result || [];
        all.push(...items);
        if (items.length < 50) break;
        start += 50;
        page++;
        await new Promise(r => setTimeout(r, 150));
    }
    console.log();
    return all;
}

async function main() {
    console.log("═══════════════════════════════════════════════════");
    console.log("  Larimar City — Bulk Sync (BATCHED): Bitrix → Neon");
    console.log("═══════════════════════════════════════════════════\n");

    // ── LEADS (batched createMany) ──────────────────────────
    console.log("📥 Descargando LEADS desde Bitrix...");
    const leads = await fetchAll("crm.lead.list.json", [
        "ID", "TITLE", "NAME", "LAST_NAME", "EMAIL", "PHONE", "STATUS_ID", "DATE_CREATE"
    ]);
    console.log(`   Total: ${leads.length.toLocaleString()} leads\n`);

    const BATCH = 200;
    let lSaved = 0;
    console.log("💾 Guardando leads en Neon (createMany en lotes de 200)...");
    for (let i = 0; i < leads.length; i += BATCH) {
        const batch = leads.slice(i, i + BATCH).map(l => ({
            bitrixLeadId: String(l.ID),
            name: `${l.NAME || ""} ${l.LAST_NAME || ""}`.trim() || l.TITLE || `Lead #${l.ID}`,
            email: l.EMAIL?.[0]?.VALUE?.toLowerCase().trim() || `noemail+${l.ID}@bitrix.local`,
            phone: l.PHONE?.[0]?.VALUE || null,
            source: "Bitrix CRM",
            isJunk: l.STATUS_ID === "JUNK",
            junkReason: l.STATUS_ID === "JUNK" ? "Marcado JUNK en Bitrix" : null,
        }));
        const result = await prisma.lead.createMany({ data: batch, skipDuplicates: true });
        lSaved += result.count;
        process.stdout.write(`\r   Lote ${Math.ceil((i + BATCH) / BATCH)}/${Math.ceil(leads.length / BATCH)} — ${lSaved.toLocaleString()} guardados...`);
    }
    console.log(`\n   ✅ Leads: ${lSaved.toLocaleString()} guardados.\n`);

    // ── DEALS (batched createMany) ──────────────────────────
    console.log("📥 Descargando DEALS desde Bitrix...");
    const deals = await fetchAll("crm.deal.list.json", [
        "ID", "TITLE", "STAGE_ID", "ASSIGNED_BY_ID", "DATE_CREATE", "DATE_MODIFY"
    ]);
    console.log(`   Total: ${deals.length.toLocaleString()} deals\n`);

    let dSaved = 0;
    console.log("💾 Guardando deals en Neon (createMany en lotes de 200)...");
    for (let i = 0; i < deals.length; i += BATCH) {
        const batch = deals.slice(i, i + BATCH).map(d => ({
            bitrixDealId: String(d.ID),
            title: d.TITLE || `Deal #${d.ID}`,
            stageId: d.STAGE_ID || "UNKNOWN",
            assignedTo: String(d.ASSIGNED_BY_ID || ""),
            stageDate: d.DATE_CREATE ? new Date(d.DATE_CREATE) : new Date(),
        }));
        const result = await prisma.deal.createMany({ data: batch, skipDuplicates: true });
        dSaved += result.count;
        process.stdout.write(`\r   Lote ${Math.ceil((i + BATCH) / BATCH)}/${Math.ceil(deals.length / BATCH)} — ${dSaved.toLocaleString()} guardados...`);
    }
    console.log(`\n   ✅ Deals: ${dSaved.toLocaleString()} guardados.\n`);

    console.log("═══════════════════════════════════════════════════");
    console.log(`  ✅ ¡Sync completo!`);
    console.log(`     Leads: ${lSaved.toLocaleString()} | Deals: ${dSaved.toLocaleString()}`);
    console.log("═══════════════════════════════════════════════════\n");
}

main()
    .catch(e => { console.error("\n❌ Error:", e.message); process.exit(1); })
    .finally(() => prisma.$disconnect());
