import { PrismaClient } from '@prisma/client'
import { GoogleAdsApi } from 'google-ads-api'
import 'dotenv/config'

async function runTests() {
    console.log("=========================================")
    console.log("🧪 INICIANDO PRUEBAS DE ENTORNO (ENV) 🧪")
    console.log("=========================================\n")

    // 1. Prisma (Base de Datos Neon)
    console.log("[1/3] Probando Base de Datos (Neon PostgreSQL)...")
    try {
        // Force Prisma to use the exact ENV variable string without trailing characters
        const dbUrl = process.env.DATABASE_URL?.trim()
        const prisma = new PrismaClient({
            datasources: { db: { url: dbUrl } }
        })
        await prisma.$connect()

        // Quick test query
        const dealCount = await prisma.deal.count()
        console.log(`✅ Conexión exitosa a Base de Datos. Deals en BD local: ${dealCount}`)
        await prisma.$disconnect()
    } catch (e: any) {
        console.log("❌ Falló la conexión a la Base de Datos:", e.message)
    }

    // 2. Bitrix24
    console.log("\n[2/3] Probando Conexión a Bitrix24 (Webhook)...")
    try {
        const bitrixUrl = process.env.BITRIX_BASE_URL || 'https://clerhp.bitrix24.es/rest/17138/uffopruff8sqx8i9'
        const res = await fetch(`${bitrixUrl}/crm.deal.list.json?start=0`)
        if (res.ok) {
            const data = await res.json()
            if (data.result !== undefined) {
                console.log(`✅ Conexión a Bitrix exitosa. (Se leyeron correctamente los primeros ${data.result.length} deals)`)
            } else {
                console.log("⚠️ Conexión a Bitrix exitosa, pero el formato de respuesta fue inesperado.")
            }
        } else {
            console.log(`❌ La solicitud a Bitrix falló con el código HTTP: ${res.status}`)
        }
    } catch (e: any) {
        console.log("❌ Falló la conexión a Bitrix:", e.message)
    }

    // 3. Google Ads
    console.log("\n[3/3] Probando Conexión a Google Ads API...")
    try {
        if (!process.env.GOOGLE_ADS_DEVELOPER_TOKEN || !process.env.GOOGLE_ADS_CLIENT_ID || !process.env.GOOGLE_ADS_CLIENT_SECRET || !process.env.GOOGLE_ADS_REFRESH_TOKEN) {
            throw new Error("Faltan credenciales base de Google Ads en el archivo .env")
        }

        const client = new GoogleAdsApi({
            client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
            client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
            developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
        })

        // Instanciar cuentas
        const managerId = process.env.GOOGLE_ADS_MANAGER_ID ? process.env.GOOGLE_ADS_MANAGER_ID.replace(/-/g, '') : undefined
        const larimarId = process.env.GOOGLE_ADS_LARIMAR_ID?.replace(/-/g, '') || ''
        const inforgesId = process.env.GOOGLE_ADS_INFORGES_ID?.replace(/-/g, '') || ''

        if (!larimarId || !inforgesId) {
            throw new Error("Faltan los IDs (Larimar o Inforges) en el archivo .env")
        }

        // Probar cuenta Larimar
        console.log(`  -> Consultando Cuenta Larimar (${larimarId}) vía Manager (${managerId})...`)
        const larimarCustomer = client.Customer({
            customer_id: larimarId,
            refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
            login_customer_id: managerId
        })

        await larimarCustomer.query(`SELECT customer.id FROM customer LIMIT 1`)
        console.log("  ✅ Cuenta Larimar consultada correctamente. Token y permisos válidos.")

        // Probar cuenta Inforges
        console.log(`  -> Consultando Cuenta Inforges (${inforgesId}) vía Manager (${managerId})...`)
        const inforgesCustomer = client.Customer({
            customer_id: inforgesId,
            refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
            login_customer_id: managerId
        })
        await inforgesCustomer.query(`SELECT customer.id FROM customer LIMIT 1`)
        console.log("  ✅ Cuenta Inforges consultada correctamente. Token y permisos válidos.")

    } catch (e: any) {
        console.log("❌ Falló la conexión a Google Ads:", e.message || e)
    }

    console.log("\n=========================================")
    console.log("🏁 PRUEBAS FINALIZADAS")
    console.log("=========================================\n")
}

runTests()
