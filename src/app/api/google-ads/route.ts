import { NextResponse } from 'next/server';
import { GoogleAdsApi, enums } from 'google-ads-api';

// Configuración Base de Google Ads (Credenciales Maestras)
const CLIENT_ID = process.env.GOOGLE_ADS_CLIENT_ID || '';
const CLIENT_SECRET = process.env.GOOGLE_ADS_CLIENT_SECRET || '';
const DEVELOPER_TOKEN = process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '';
const REFRESH_TOKEN = process.env.GOOGLE_ADS_REFRESH_TOKEN || '';

// Customer IDs - Configurar en el .env cuando se obtengan los IDs de 10 dígitos (ej: 1234567890)
const LARIMAR_CUSTOMER_ID = process.env.GOOGLE_ADS_LARIMAR_ID || '';
const INFORGES_CUSTOMER_ID = process.env.GOOGLE_ADS_INFORGES_ID || '';
const MANAGER_CUSTOMER_ID = process.env.GOOGLE_ADS_MANAGER_ID || '';

export async function GET() {
    try {
        if (!LARIMAR_CUSTOMER_ID && !INFORGES_CUSTOMER_ID) {
            console.warn("Google Ads: Customer IDs not provided. Returning mock data to unblock UI.");
            return NextResponse.json(getMockData());
        }

        const client = new GoogleAdsApi({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            developer_token: DEVELOPER_TOKEN,
        });

        const customerIds = [LARIMAR_CUSTOMER_ID, INFORGES_CUSTOMER_ID].filter(Boolean);
        let totalMetrics = {
            spend: 0,
            impressions: 0,
            clicks: 0,
            conversions: 0,
        };

        let campaignsData: any[] = [];

        // GAQL Query para extraer inversión por campaña en los últimos 30 días
        const gaqlQuery = `
            SELECT 
                campaign.id, 
                campaign.name, 
                metrics.cost_micros, 
                metrics.impressions, 
                metrics.clicks, 
                metrics.conversions 
            FROM campaign 
            WHERE segments.date DURING LAST_30_DAYS 
            AND metrics.impressions > 0
        `;

        for (const customerId of customerIds) {
            const customer = client.Customer({
                customer_id: customerId.replace(/-/g, ''), // Asegurar formato sin guiones
                refresh_token: REFRESH_TOKEN,
                login_customer_id: MANAGER_CUSTOMER_ID ? MANAGER_CUSTOMER_ID.replace(/-/g, '') : undefined,
            });

            try {
                const response = await customer.query(gaqlQuery);

                response.forEach((row: any) => {
                    const spend = (row.metrics?.cost_micros || 0) / 1000000;
                    totalMetrics.spend += spend;
                    totalMetrics.impressions += row.metrics?.impressions || 0;
                    totalMetrics.clicks += row.metrics?.clicks || 0;
                    totalMetrics.conversions += row.metrics?.conversions || 0;

                    campaignsData.push({
                        id: row.campaign?.id,
                        name: row.campaign?.name,
                        spend: spend,
                        impressions: row.metrics?.impressions || 0,
                        clicks: row.metrics?.clicks || 0,
                        conversions: row.metrics?.conversions || 0,
                        cpc: row.metrics?.clicks > 0 ? spend / row.metrics.clicks : 0,
                        cpl: row.metrics?.conversions > 0 ? spend / row.metrics.conversions : 0,
                        account: customerId === LARIMAR_CUSTOMER_ID ? 'Larimar' : 'Inforges'
                    });
                });
            } catch (queryError) {
                console.error(`Error querying Google Ads for customer ${customerId}:`, queryError);
                // Si falla la API real por permisos o falta de ID, devolvemos mock temporal para no romper la UI
                return NextResponse.json(getMockData());
            }
        }

        const aggregateData = {
            status: "success",
            source: "google_ads_api",
            accounts_queried: customerIds.length,
            aggregated_metrics: {
                total_spend: totalMetrics.spend,
                total_impressions: totalMetrics.impressions,
                total_clicks: totalMetrics.clicks,
                total_conversions: totalMetrics.conversions,
                average_cpc: totalMetrics.clicks > 0 ? totalMetrics.spend / totalMetrics.clicks : 0,
                average_cpl: totalMetrics.conversions > 0 ? totalMetrics.spend / totalMetrics.conversions : 0,
            },
            campaigns: campaignsData
        };

        return NextResponse.json(aggregateData);

    } catch (error) {
        console.error("Google Ads Integration Error:", error);
        // Fallback seguro a datos simulados para no interrumpir la visualización del Dashboard
        return NextResponse.json(getMockData());
    }
}

// Datos simulados (Mock) para mantener la UI funcional mientras se obtienen los Customer IDs reales
function getMockData() {
    return {
        status: "mock",
        source: "google_ads_simulated",
        message: "Customer IDs pending or API error. Returning simulated data.",
        aggregated_metrics: {
            total_spend: 140000,
            total_impressions: 4500000,
            total_clicks: 164705,
            total_conversions: 2978,
            average_cpc: 0.85,
            average_cpl: 47.01
        },
        campaigns: [
            { id: 1, name: "Search - New Jersey (Larimar)", spend: 50000, impressions: 500000, clicks: 45000, conversions: 1200, cpc: 1.11, cpl: 41.66, account: "Larimar" },
            { id: 2, name: "Display - Retargeting LATAM (Inforges)", spend: 30000, impressions: 2000000, clicks: 50000, conversions: 300, cpc: 0.60, cpl: 100.00, account: "Inforges" },
            { id: 3, name: "Performance Max - Florida (Larimar)", spend: 60000, impressions: 2000000, clicks: 69705, conversions: 1478, cpc: 0.86, cpl: 40.59, account: "Larimar" }
        ]
    };
}
