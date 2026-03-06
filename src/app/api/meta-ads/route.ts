import { NextResponse } from 'next/server';

const ACCESS_TOKEN = process.env.META_ADS_ACCESS_TOKEN || '';
const ACCOUNT_ID = process.env.META_ADS_ACCOUNT_ID || '';
const API_VERSION = 'v24.0';
const BASE_URL = `https://graph.facebook.com/${API_VERSION}`;

// Actions that represent a Lead in Meta Ads
const LEAD_ACTION_TYPES = [
    'lead',
    'offsite_conversion.fb_pixel_lead',
    'onsite_conversion.messaging_first_reply',
    'onsite_conversion.lead_grouped',
];

function extractLeads(actions: { action_type: string; value: string }[] | undefined): number {
    if (!actions) return 0;
    return actions
        .filter(a => LEAD_ACTION_TYPES.includes(a.action_type))
        .reduce((sum, a) => sum + parseFloat(a.value || '0'), 0);
}

export async function GET() {
    if (!ACCESS_TOKEN) {
        return NextResponse.json({ status: 'error', message: 'META_ADS_ACCESS_TOKEN not set.' }, { status: 500 });
    }

    try {
        // ─── 1. Aggregate account-level insights (last 30 days) ───────────────
        const accountParams = new URLSearchParams({
            access_token: ACCESS_TOKEN,
            date_preset: 'last_30d',
            fields: 'spend,impressions,clicks,actions,cost_per_action_type',
            level: 'account',
        });
        const accountRes = await fetch(`${BASE_URL}/${ACCOUNT_ID}/insights?${accountParams}`);
        if (!accountRes.ok) {
            const err = await accountRes.json();
            const code = err?.error?.code;
            const apiMsg = err?.error?.message || 'Graph API error';
            // Error 200 = permission denied (missing ads_read scope on token)
            const userMsg = code === 200
                ? 'El token de acceso no tiene el permiso "ads_read". Regenera el token desde Meta Business Manager con los permisos: ads_read, ads_management.'
                : apiMsg;
            return NextResponse.json({
                status: 'error',
                source: 'meta_ads_api',
                message: userMsg,
                error_code: code,
                raw: err,
            });
        }
        const accountJson = await accountRes.json();
        const accountRow = accountJson.data?.[0] ?? {};

        const totalSpend = parseFloat(accountRow.spend || '0');
        const totalImpressions = parseInt(accountRow.impressions || '0', 10);
        const totalClicks = parseInt(accountRow.clicks || '0', 10);
        const totalLeads = extractLeads(accountRow.actions);
        const avgCpl = totalLeads > 0 ? totalSpend / totalLeads : 0;
        const avgCpc = totalClicks > 0 ? totalSpend / totalClicks : 0;

        // ─── 2. Campaign-level breakdown ─────────────────────────────────────
        const campaignParams = new URLSearchParams({
            access_token: ACCESS_TOKEN,
            date_preset: 'last_30d',
            fields: 'campaign_id,campaign_name,spend,impressions,clicks,actions',
            level: 'campaign',
            sort: 'spend_descending',
            limit: '50',
        });
        const campaignRes = await fetch(`${BASE_URL}/${ACCOUNT_ID}/insights?${campaignParams}`);
        let campaigns: object[] = [];
        if (campaignRes.ok) {
            const campaignJson = await campaignRes.json();
            campaigns = (campaignJson.data || []).map((row: any) => {
                const spend = parseFloat(row.spend || '0');
                const leads = extractLeads(row.actions);
                const clicks = parseInt(row.clicks || '0', 10);
                return {
                    id: row.campaign_id,
                    name: row.campaign_name,
                    spend,
                    impressions: parseInt(row.impressions || '0', 10),
                    clicks,
                    leads,
                    cpl: leads > 0 ? spend / leads : 0,
                    cpc: clicks > 0 ? spend / clicks : 0,
                };
            });
        }

        return NextResponse.json({
            status: 'success',
            source: 'meta_ads_api',
            account_id: ACCOUNT_ID,
            aggregated_metrics: {
                total_spend: totalSpend,
                total_impressions: totalImpressions,
                total_clicks: totalClicks,
                total_leads: totalLeads,
                average_cpl: avgCpl,
                average_cpc: avgCpc,
            },
            campaigns,
        });
    } catch (error: any) {
        console.error('Meta Ads API Error:', error);
        return NextResponse.json({
            status: 'error',
            source: 'meta_ads_api',
            message: error?.message || 'Unexpected error fetching Meta Ads data',
        });
    }
}
