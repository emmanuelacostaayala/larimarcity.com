"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";

interface Lead {
    id: string;
    name: string;
    email: string;
    phone?: string;
    source?: string;
    isJunk: boolean;
    junkReason?: string;
    createdAt: string;
    bitrixLeadId: string;
}

interface Deal {
    id: string;
    bitrixDealId: string;
    title: string;
    stageId: string;
    assignedTo?: string;
    stageDate?: string;
    createdAt: string;
}

interface DashboardData {
    summary: {
        totalLeads: number;
        junkLeads: number;
        totalDeals: number;
        stagnantCount: number;
        unassignedCount: number;
        dealsByStage?: { stage: string; count: number }[];
        leadsByDate?: { date: string; count: number }[];
        duplicateLeadsCount: number;
        funnelMetrics?: { tofu: number; mofu: number; bofu: number };
    };
    data: (Lead | Deal)[];
    pagination: {
        page: number;
        limit: number;
        totalItems: number;
        totalPages: number;
    }
}

interface SyncProgress {
    phase: "idle" | "leads" | "deals" | "complete" | "error";
    leadsCount: number;
    dealsCount: number;
    message: string;
}

function daysSince(dateStr: string) {
    const date = new Date(dateStr);
    return Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
}

function StatCard({ label, value, accent }: { label: string; value: number; accent: string }) {
    return (
        <div className={`bg-white/5 border ${accent} rounded-xl p-5 flex flex-col gap-1`}>
            <span className="text-3xl font-bold text-white">{value.toLocaleString()}</span>
            <span className="text-white/55 text-sm">{label}</span>
        </div>
    );
}

function SyncPanel({ progress }: { progress: SyncProgress }) {
    if (progress.phase === "idle" || progress.phase === "complete") return null;

    const isError = progress.phase === "error";
    const isLeads = progress.phase === "leads";
    const isDeals = progress.phase === "deals";

    return (
        <div className={`mb-6 p-4 rounded-xl border backdrop-blur ${isError ? "bg-red-500/10 border-red-500/30" : "bg-[#C9A84C]/5 border-[#C9A84C]/20"}`}>
            <div className="flex items-center gap-3 mb-3">
                {!isError && (
                    <div className="flex items-center gap-1.5">
                        <span className="inline-block w-2 h-2 rounded-full bg-[#C9A84C] animate-ping" />
                        <span className="text-[#C9A84C] text-sm font-semibold">Sincronizando con Bitrix24</span>
                    </div>
                )}
                {isError && <span className="text-red-400 text-sm font-semibold">⚠️ Error en sincronización</span>}
            </div>

            {/* Progress bars */}
            <div className="space-y-3">
                {/* Leads */}
                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className={isLeads ? "text-[#C9A84C]" : "text-white/40"}>
                            {isLeads ? "🔄 " : "✅ "}Leads
                        </span>
                        <span className={isLeads ? "text-[#C9A84C] font-mono font-bold" : "text-white/40"}>
                            {progress.leadsCount.toLocaleString()} registros
                        </span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all ${isLeads ? "bg-[#C9A84C] animate-pulse" : progress.leadsCount > 0 ? "bg-[#C9A84C]/50" : "bg-white/10"}`}
                            style={{ width: isLeads ? "100%" : progress.leadsCount > 0 ? "100%" : "0%" }}
                        />
                    </div>
                </div>

                {/* Deals */}
                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className={isDeals ? "text-blue-400" : "text-white/40"}>
                            {isDeals ? "🔄 " : progress.dealsCount > 0 ? "✅ " : "⏳ "}Deals
                        </span>
                        <span className={isDeals ? "text-blue-400 font-mono font-bold" : "text-white/40"}>
                            {isDeals || progress.dealsCount > 0 ? `${progress.dealsCount.toLocaleString()} registros` : "Esperando..."}
                        </span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all ${isDeals ? "bg-blue-400 animate-pulse" : progress.dealsCount > 0 ? "bg-blue-400/50" : "bg-white/10"}`}
                            style={{ width: isDeals ? "100%" : progress.dealsCount > 0 ? "100%" : "0%" }}
                        />
                    </div>
                </div>
            </div>

            <p className="text-white/40 text-xs mt-3">{progress.message}</p>
        </div>
    );
}

function DataInsights({ data, viewMode }: { data: DashboardData | null, viewMode: "leads" | "deals" }) {
    if (!data) return null;

    if (viewMode === "leads") {
        const junkPercentage = ((data.summary.junkLeads / data.summary.totalLeads) * 100).toFixed(1);
        const last7DaysTotal = data.summary.leadsByDate?.reduce((acc, curr) => acc + curr.count, 0) || 0;

        const duplicatesText = data.summary.duplicateLeadsCount > 0
            ? ` Adicionalmente, se han detectado ${data.summary.duplicateLeadsCount} perfiles duplicados (basado en coincidencia de email), requiriendo potencial limpieza en el CRM.`
            : " No se detectaron perfiles duplicados recientemente.";

        return (
            <div className="bg-[#C9A84C]/5 border border-[#C9A84C]/20 p-5 rounded-2xl mb-8">
                <h3 className="text-[#C9A84C] font-bold text-lg mb-2">
                    Análisis de Rendimiento: Marketing
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                    Actualmente gestionamos una base de datos de <strong className="text-white">{data.summary.totalLeads.toLocaleString()} Leads</strong>.
                    La calidad de los datos indica que el <strong className="text-red-400">{junkPercentage}% ({data.summary.junkLeads})</strong> se ha clasificado como inválido o spam ("Junk"), un factor crítico para la optimización de campañas de adquisición.{duplicatesText}
                    En los últimos siete días, el sistema ha importado <strong className="text-[#C9A84C]">{last7DaysTotal} nuevos prospectos directos</strong>, mostrando un flujo constante en la fase inicial del embudo (Top of Funnel).
                </p>
            </div>
        );
    }

    // Deals View
    const conversionRateText = data.summary.dealsByStage
        ? (() => {
            const wonDeals = data.summary.dealsByStage.find(s => s.stage.includes("WON"))?.count || 0;
            const rate = ((wonDeals / data.summary.totalDeals) * 100).toFixed(1);
            return `Resultando en una tasa de conversión estimada del ${rate}%.`;
        })()
        : "";

    return (
        <div className="bg-blue-500/10 border border-blue-500/20 p-5 rounded-2xl mb-8">
            <h3 className="text-blue-400 font-bold text-lg mb-2">
                Análisis de Pipeline: Ventas
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
                El ecosistema comercial cuenta con <strong className="text-white">{data.summary.totalDeals.toLocaleString()} Oportunidades (Deals)</strong> activas.
                Es necesario destacar que existen <strong className="text-amber-400">{data.summary.stagnantCount} negocios estancados</strong> que no han avanzado de etapa en más de 30 días, requiriendo acción de seguimiento.
                Además, <strong className="text-orange-400">{data.summary.unassignedCount} negocios están sin asignar</strong> (atrapados en colas genéricas de distribución), los cuales deben ser reubicados a brokers específicos para evitar el enfriamiento de la oportunidad comercial. {conversionRateText}
            </p>
        </div>
    );
}

export default function AdminDashboard() {
    const router = useRouter();
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    // Core Layout State
    const [viewMode, setViewMode] = useState<"leads" | "deals" | "intelligence">("intelligence");
    const [showHealth, setShowHealth] = useState(true);
    const [activeTab, setActiveTab] = useState<"leads" | "deals" | "junk" | "stagnant" | "unassigned">("leads");

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedRecord, setSelectedRecord] = useState<Deal | Lead | null>(null);
    const [lastSync, setLastSync] = useState<string | null>(null);
    const [syncProgress, setSyncProgress] = useState<SyncProgress>({
        phase: "idle", leadsCount: 0, dealsCount: 0, message: "",
    });
    const eventSourceRef = useRef<EventSource | null>(null);

    // Debounce search input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1); // Reset page on new search
        }, 500);
        return () => clearTimeout(handler);
    }, [search]);

    const fetchData = useCallback(async (showLoading = true) => {
        if (showLoading) setLoading(true);
        const res = await fetch(`/api/admin/dashboard?tab=${activeTab}&page=${page}&limit=50&search=${encodeURIComponent(debouncedSearch)}`);
        if (res.status === 401) { router.push("/admin"); return; }
        const json = await res.json();
        setData(json);
        if (showLoading) setLoading(false);
    }, [router, activeTab, page, debouncedSearch]);

    // Handle View Mode switch
    const handleViewModeChange = (mode: "leads" | "deals" | "intelligence") => {
        setViewMode(mode);
        if (mode !== "intelligence") {
            setActiveTab(mode === "leads" ? "leads" : "deals");
        }
        setPage(1);
        setSearch("");
    };

    const startSync = useCallback(() => {
        // Close any existing connection
        if (eventSourceRef.current) eventSourceRef.current.close();

        setSyncProgress({ phase: "leads", leadsCount: 0, dealsCount: 0, message: "Iniciando sync de Leads..." });

        const es = new EventSource("/api/admin/sync");
        eventSourceRef.current = es;

        es.onmessage = (event) => {
            const d = JSON.parse(event.data);

            if (d.phase === "leads") {
                setSyncProgress(prev => ({ ...prev, phase: "leads", leadsCount: d.count, message: d.message }));
            } else if (d.phase === "deals") {
                setSyncProgress(prev => ({ ...prev, phase: "deals", dealsCount: d.count, message: d.message }));
            } else if (d.phase === "complete") {
                setSyncProgress({ phase: "complete", leadsCount: d.totalLeads, dealsCount: d.totalDeals, message: d.message });
                setLastSync(new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }));
                // Refresh data from DB silently (no blackout) after sync completes
                fetchData(false);
                es.close();
            } else if (d.phase === "error") {
                setSyncProgress(prev => ({ ...prev, phase: "error", message: d.message }));
                es.close();
            }
        };

        es.onerror = () => {
            setSyncProgress(prev => ({ ...prev, phase: "error", message: "Conexión SSE interrumpida" }));
            es.close();
        };
    }, [fetchData]);

    useEffect(() => {
        // Load cached data immediately, then start sync
        fetchData().then(() => startSync());

        // Re-sync every 15 minutes
        const interval = setInterval(() => startSync(), 15 * 60 * 1000);
        return () => {
            clearInterval(interval);
            eventSourceRef.current?.close();
        };
    }, [fetchData, startSync]);

    const handleLogout = async () => {
        eventSourceRef.current?.close();
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin");
    };

    if (loading && !data) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center flex-col gap-4">
                <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
                <div className="text-white/50 text-sm">Cargando dashboard...</div>
            </div>
        );
    }

    // Separate tabs by context
    const leadsTabs = [
        { key: "leads", label: "📋 Base de Datos Leads", count: data?.summary.totalLeads },
        { key: "junk", label: " Leads Junk", count: data?.summary.junkLeads },
    ] as const;

    const dealsTabs = [
        { key: "deals", label: "💼 Pipeline de Negocios", count: data?.summary.totalDeals },
        { key: "unassigned", label: " Sin Responsable", count: data?.summary.unassignedCount },
        { key: "stagnant", label: "⏳ Estancados", count: data?.summary.stagnantCount },
    ] as const;

    const activeTabs = viewMode === "leads" ? leadsTabs : dealsTabs;

    // Helper for chart colors
    const getChartColor = (stage: string) => {
        if (stage.includes("WON") || stage.includes("CLOSE")) return "#4ade80"; // green
        if (stage.includes("LOSE") || stage.includes("JUNK")) return "#f87171"; // red
        if (stage.includes("NEW") || stage.includes("UNASSIGNED")) return "#facc15"; // yellow
        return "#60a5fa"; // blue
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f1520] to-[#0a0a0a] text-white overflow-x-hidden">
            {/* Header */}
            <header className="border-b border-white/10 bg-black/30 backdrop-blur sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#8B6914] flex items-center justify-center text-sm font-bold">L</div>
                        <div>
                            <h1 className="font-bold text-white leading-tight">CRM Dashboard</h1>
                            <p className="text-white/40 text-xs">Larimar City & Resort</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {syncProgress.phase !== "idle" && syncProgress.phase !== "complete" && syncProgress.phase !== "error" && (
                            <span className="text-[#C9A84C]/70 text-xs flex items-center gap-1.5">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-ping" />
                                Syncing...
                            </span>
                        )}
                        {lastSync && syncProgress.phase !== "leads" && syncProgress.phase !== "deals" && (
                            <span className="text-white/25 text-xs">
                                ✓ Sync {lastSync} · {syncProgress.leadsCount.toLocaleString()}L · {syncProgress.dealsCount.toLocaleString()}D
                            </span>
                        )}
                        <button onClick={handleLogout} className="text-white/40 hover:text-white/70 text-sm transition-colors">
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Live Sync Panel */}
                <SyncPanel progress={syncProgress} />

                {/* --- TOP-LEVEL VIEW SWITCHER --- */}
                <div className="flex flex-col md:flex-row mb-8 p-1 bg-white/5 rounded-xl border border-white/10 relative z-10">
                    <button
                        onClick={() => handleViewModeChange("intelligence")}
                        className={`flex-1 lg:px-8 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${viewMode === "intelligence" ? "bg-[#1E293B] text-white shadow-lg border border-white/10" : "text-white/60 hover:text-white hover:bg-white/5"}`}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                        Sales Intelligence
                    </button>
                    <button
                        onClick={() => handleViewModeChange("leads")}
                        className={`flex-1 lg:px-8 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${viewMode === "leads" ? "bg-[#C9A84C] text-black shadow-lg" : "text-white/60 hover:text-white hover:bg-white/5"}`}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        Marketing (Leads)
                    </button>
                    <button
                        onClick={() => handleViewModeChange("deals")}
                        className={`flex-1 lg:px-8 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${viewMode === "deals" ? "bg-blue-600 text-white shadow-lg" : "text-white/60 hover:text-white hover:bg-white/5"}`}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        Ventas (Deals)
                    </button>
                    {viewMode !== "intelligence" && (
                        <button
                            onClick={() => setShowHealth(!showHealth)}
                            className={`ml-4 px-4 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 border ${showHealth ? "bg-white/10 text-white border-white/20" : "bg-transparent text-white/40 border-white/5 hover:text-white/60"}`}
                            title={showHealth ? "Ocultar Health Analytics" : "Mostrar Health Analytics"}
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showHealth ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" : "M15 12a3 3 0 11-6 0 3 3 0 016 0z m-6 6a9 9 0 01-9-9 9 9 0 019-9 9 9 0 019 9 9 9 0 01-9 9z"} /></svg>
                            {showHealth ? "Ocultar Analytics" : "Ver Analytics"}
                        </button>
                    )}
                </div>

                {viewMode === "intelligence" && (
                    <div className="animate-fade-in space-y-8">
                        {/* 1. Header & UTM Filter Mockup */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 rounded-xl border-b border-white/10">
                            <div>
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    Command Center: Atribución y Rendimiento
                                </h2>
                                <p className="text-sm text-white/50 mt-1">Simulación Generación 1 - Enero 2026</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-white/40 uppercase tracking-wider font-semibold">Cruce Analítico:</span>
                                <select className="bg-white/5 border border-white/10 text-white/80 text-sm rounded-lg px-4 py-2 outline-none focus:border-zinc-500 hover:bg-white/10 transition-colors cursor-not-allowed" disabled>
                                    <option>UTM: New Jersey - Inglés</option>
                                    <option>UTM: Miami - Español</option>
                                    <option>Todas las Campañas</option>
                                </select>
                            </div>
                        </div>

                        {/* 2. Top KPIs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-[#18181b] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-colors">
                                <div className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">Coste MKT (Inversión)</div>
                                <div className="text-3xl font-light text-white mb-2">$153,400</div>
                                <div className="text-zinc-400 text-sm flex items-center gap-1">
                                    <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                                    3,263 Leads ($47 CPL)
                                </div>
                            </div>

                            <div className="bg-[#18181b] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-colors">
                                <div className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">Pre-Qualify Rate</div>
                                <div className="text-3xl font-light text-white mb-2">36.42%</div>
                                <div className="text-zinc-400 text-sm">1,188 Leads Calificados</div>
                            </div>

                            <div className="bg-[#18181b] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-colors">
                                <div className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">Win Rate (Cierre Neto)</div>
                                <div className="text-3xl font-light text-white mb-2">20%</div>
                                <div className="text-emerald-400/90 text-sm font-medium">90% Retención (32 Ventas)</div>
                            </div>

                            <div className="bg-[#18181b] border border-emerald-500/20 p-6 rounded-2xl relative overflow-hidden group shadow-[0_0_15px_rgba(16,185,129,0.05)]">
                                <div className="text-emerald-500/80 text-xs font-bold uppercase tracking-wider mb-2">Venta Neta (Ingresos)</div>
                                <div className="text-3xl font-light text-emerald-400 mb-2">$6,661,383</div>
                                <div className="text-zinc-400 text-sm">Objetivo Mensual Superado</div>
                            </div>
                        </div>

                        {/* 3. The Bitrix-Style Traffic Funnel Report */}
                        <div className="bg-[#18181b] border border-white/5 rounded-2xl overflow-hidden">
                            <div className="flex justify-between items-center p-6 border-b border-white/5">
                                <h3 className="text-white/90 font-semibold flex items-center gap-2">
                                    <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
                                    Informe de Tráfico y Rendimiento del Canal (Atribución Directa)
                                </h3>
                                <div className="text-xs font-medium bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">Últimos 30 días</div>
                            </div>

                            <div className="p-8">
                                {/* Simulated Bitrix Chart using Recharts */}
                                <div className="h-64 w-full relative">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={[
                                                { stage: 'Leads\nMarketing', value: 3263, rate: '100%' },
                                                { stage: 'Leads\nConvertidos', value: 2210, rate: '67.7%' },
                                                { stage: 'Leads\nCalificados', value: 1188, rate: '53.8%' },
                                                { stage: 'Calificados\npara Venta', value: 720, rate: '60.6%' },
                                                { stage: 'Próximos\nal Cierre', value: 178, rate: '24.7%' },
                                                { stage: 'Negociaciones\nCerradas', value: 36, rate: '20.2%' },
                                                { stage: 'Reservation\nPaid', value: 32, rate: '88.9%' },
                                                { stage: 'Negociaciones\nFirmadas', value: 29, rate: '90.6%' },
                                            ]}
                                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                            barSize={45}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff0a" />
                                            <XAxis
                                                dataKey="stage"
                                                axisLine={{ stroke: '#ffffff1a' }}
                                                tickLine={false}
                                                tick={{ fill: '#ffffff66', fontSize: 13, fontWeight: 500 }}
                                                dy={10}
                                            />
                                            <YAxis hide />
                                            <Tooltip
                                                cursor={{ fill: '#ffffff05' }}
                                                content={({ active, payload }) => {
                                                    if (active && payload && payload.length) {
                                                        const p = payload[0].payload;
                                                        return (
                                                            <div className="bg-[#111] border border-white/10 p-4 rounded-lg shadow-xl">
                                                                <p className="font-semibold text-white/90 mb-1">{p.stage}</p>
                                                                <p className="text-2xl font-light text-blue-400">{p.value.toLocaleString()}</p>
                                                                <p className="text-xs text-zinc-500 mt-1">Tasa de conversión: {p.rate}</p>
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                }}
                                            />
                                            <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                                                {
                                                    [0, 1, 2, 3, 4, 5, 6, 7].map((index) => {
                                                        const colors = ['#3b82f6', '#4f8ef0', '#5f9fe6', '#6db0d8', '#7ac0c6', '#3ab7a0', '#1ec98a', '#10b981'];
                                                        return <Cell key={`cell-${index}`} fill={colors[index]} />;
                                                    })
                                                }
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>

                                </div>

                                {/* Traffic Sources Breakdown below the chart */}
                                <div className="mt-8 pt-8 border-t border-white/5 space-y-6">
                                    <h4 className="text-sm font-bold text-white/80 uppercase tracking-widest flex items-center gap-2">
                                        <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                                        Desglose por Fuente de Tráfico Principal
                                    </h4>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Meta Ads Card */}
                                        <div className="bg-[#111] border border-white/5 p-5 rounded-xl">
                                            <div className="flex justify-between items-center mb-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded bg-blue-600/20 flex items-center justify-center">
                                                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                                    </div>
                                                    <span className="font-semibold text-white/90">Meta Ads (Facebook/IG)</span>
                                                </div>
                                                <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded font-medium border border-emerald-500/20">Alto ROI</span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2 text-sm">
                                                <div>
                                                    <div className="text-zinc-500 text-xs mb-1">Inversión</div>
                                                    <div className="text-white/80 font-mono">$85,200</div>
                                                </div>
                                                <div>
                                                    <div className="text-zinc-500 text-xs mb-1">Leads (CPL)</div>
                                                    <div className="text-white/80 font-mono">1,850 <span className="text-zinc-500 text-xs text-normal">($46)</span></div>
                                                </div>
                                                <div>
                                                    <div className="text-zinc-500 text-xs mb-1">Ventas (CAC)</div>
                                                    <div className="text-emerald-400 font-mono">22 <span className="text-emerald-500/50 text-xs text-normal">($3.8k)</span></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Google Ads Card */}
                                        <div className="bg-[#111] border border-white/5 p-5 rounded-xl">
                                            <div className="flex justify-between items-center mb-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded bg-red-500/10 flex items-center justify-center">
                                                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                                    </div>
                                                    <span className="font-semibold text-white/90">Google Ads (Search/Display)</span>
                                                </div>
                                                <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-1 rounded font-medium border border-amber-500/20">Optimizable</span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2 text-sm">
                                                <div>
                                                    <div className="text-zinc-500 text-xs mb-1">Inversión</div>
                                                    <div className="text-white/80 font-mono">$68,200</div>
                                                </div>
                                                <div>
                                                    <div className="text-zinc-500 text-xs mb-1">Leads (CPL)</div>
                                                    <div className="text-white/80 font-mono">1,413 <span className="text-zinc-500 text-xs text-normal">($48)</span></div>
                                                </div>
                                                <div>
                                                    <div className="text-zinc-500 text-xs mb-1">Ventas (CAC)</div>
                                                    <div className="text-emerald-400 font-mono">10 <span className="text-emerald-500/50 text-xs text-normal">($6.8k)</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ============================================================ */}
                        {/* SECCIÓN B: Comparativa de Campañas — Ranking por ROI        */}
                        {/* ============================================================ */}
                        <div className="bg-[#18181b] border border-white/5 rounded-2xl overflow-hidden">
                            <div className="flex justify-between items-center p-6 border-b border-white/5">
                                <h3 className="text-white/90 font-semibold flex items-center gap-2">
                                    <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                                    Comparativa de Campañas Activas — Ranking ROI
                                </h3>
                                <div className="text-xs text-zinc-500 italic">* Datos simulados — requiere API Google/Meta</div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-white/5">
                                            <th className="text-left p-4 text-zinc-500 font-medium uppercase tracking-wider text-xs">Campaña</th>
                                            <th className="text-left p-4 text-zinc-500 font-medium uppercase tracking-wider text-xs">Plataforma</th>
                                            <th className="text-right p-4 text-zinc-500 font-medium uppercase tracking-wider text-xs">Inversión</th>
                                            <th className="text-right p-4 text-zinc-500 font-medium uppercase tracking-wider text-xs">Leads</th>
                                            <th className="text-right p-4 text-zinc-500 font-medium uppercase tracking-wider text-xs">CPL</th>
                                            <th className="text-right p-4 text-zinc-500 font-medium uppercase tracking-wider text-xs">Qualify%</th>
                                            <th className="text-right p-4 text-zinc-500 font-medium uppercase tracking-wider text-xs">Ventas</th>
                                            <th className="text-right p-4 text-zinc-500 font-medium uppercase tracking-wider text-xs">CAC</th>
                                            <th className="text-center p-4 text-zinc-500 font-medium uppercase tracking-wider text-xs">ROI</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/[0.03]">
                                        {[
                                            { name: 'NJ English — Lead Form', platform: 'Meta', platformColor: 'text-blue-400', invest: '$42,000', leads: 1105, cpl: '$38', qualify: '42%', sales: 13, cac: '$3,230', roi: 'Alto', roiColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
                                            { name: 'Miami Spanish — Video Ads', platform: 'Meta', platformColor: 'text-blue-400', invest: '$43,200', leads: 771, cpl: '$56', qualify: '31%', sales: 9, cac: '$4,800', roi: 'Medio', roiColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
                                            { name: 'NJ Search — Brand Keywords', platform: 'Google', platformColor: 'text-red-400', invest: '$35,000', leads: 795, cpl: '$44', qualify: '40%', sales: 6, cac: '$5,833', roi: 'Medio', roiColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
                                            { name: 'Manchester — Display Network', platform: 'Google', platformColor: 'text-red-400', invest: '$33,200', leads: 592, cpl: '$56', qualify: '37%', sales: 4, cac: '$8,300', roi: 'Bajo', roiColor: 'bg-red-500/10 text-red-400 border-red-500/20' },
                                        ].map((camp, i) => (
                                            <tr key={i} className={`hover:bg-white/[0.02] transition-colors ${i === 0 ? 'bg-emerald-500/[0.02]' : ''}`}>
                                                <td className="p-4 text-white/80 font-medium">{camp.name}</td>
                                                <td className={`p-4 font-medium ${camp.platformColor}`}>{camp.platform}</td>
                                                <td className="p-4 text-white/60 text-right font-mono">{camp.invest}</td>
                                                <td className="p-4 text-white/60 text-right font-mono">{camp.leads.toLocaleString()}</td>
                                                <td className="p-4 text-white/60 text-right font-mono">{camp.cpl}</td>
                                                <td className="p-4 text-white/60 text-right font-mono">{camp.qualify}</td>
                                                <td className="p-4 text-emerald-400 text-right font-mono font-semibold">{camp.sales}</td>
                                                <td className="p-4 text-white/40 text-right font-mono">{camp.cac}</td>
                                                <td className="p-4 text-center">
                                                    <span className={`text-xs font-bold px-2 py-1 rounded border ${camp.roiColor}`}>{camp.roi}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="px-6 py-3 bg-emerald-500/5 border-t border-emerald-500/10 text-xs text-emerald-400/70">
                                Recomendación: Aumentar presupuesto en "NJ English — Lead Form" (Meta). Menor CAC del portfolio ($3,230 vs. promedio $5,541). Pausar "Manchester — Display" hasta optimizar segmentación.
                            </div>
                        </div>

                        {/* ============================================================ */}
                        {/* SECCIÓN C: Proyección Anual 2026 — Real vs Objetivo          */}
                        {/* ============================================================ */}
                        <div className="bg-[#18181b] border border-white/5 rounded-2xl overflow-hidden">
                            <div className="flex justify-between items-center p-6 border-b border-white/5">
                                <h3 className="text-white/90 font-semibold flex items-center gap-2">
                                    <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
                                    Proyección Anual 2026 — Ventas Netas: Real vs. Objetivo
                                </h3>
                                <div className="flex items-center gap-4 text-xs text-zinc-500">
                                    <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-0.5 bg-indigo-400"></span> Objetivo</span>
                                    <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-0.5 bg-emerald-400"></span> Real (YTD)</span>
                                    <span className="italic text-zinc-600">* Simulado</span>
                                </div>
                            </div>
                            <div className="p-6 h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={[
                                            { mes: 'Ene', objetivo: 32, real: 28 },
                                            { mes: 'Feb', objetivo: 33, real: 33 },
                                            { mes: 'Mar', objetivo: 33, real: 29 },
                                            { mes: 'Abr', objetivo: 37, real: null },
                                            { mes: 'May', objetivo: 40, real: null },
                                            { mes: 'Jun', objetivo: 53, real: null },
                                            { mes: 'Jul', objetivo: 57, real: null },
                                            { mes: 'Ago', objetivo: 62, real: null },
                                            { mes: 'Sep', objetivo: 66, real: null },
                                            { mes: 'Oct', objetivo: 83, real: null },
                                            { mes: 'Nov', objetivo: 91, real: null },
                                            { mes: 'Dic', objetivo: 100, real: null },
                                        ]}
                                        margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                                        barGap={4}
                                        barSize={18}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff08" />
                                        <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: '#ffffff55', fontSize: 12 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#ffffff40', fontSize: 11 }} />
                                        <Tooltip
                                            cursor={{ fill: '#ffffff05' }}
                                            contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                            itemStyle={{ color: '#fff' }}
                                            labelFormatter={(label) => `Mes: ${label}`}
                                        />
                                        <Bar dataKey="objetivo" fill="#6366f1" opacity={0.35} radius={[2, 2, 0, 0]} name="objetivo" />
                                        <Bar dataKey="real" fill="#10b981" radius={[2, 2, 0, 0]} name="real" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="grid grid-cols-3 divide-x divide-white/5 border-t border-white/5">
                                <div className="p-4 text-center">
                                    <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Objetivo Anual</div>
                                    <div className="text-white font-light text-xl">749 ventas</div>
                                    <div className="text-zinc-600 text-xs mt-1">$162M ingresos</div>
                                </div>
                                <div className="p-4 text-center">
                                    <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Real YTD (Q1)</div>
                                    <div className="text-emerald-400 font-light text-xl">90 ventas</div>
                                    <div className="text-zinc-600 text-xs mt-1">$18.3M ingresos</div>
                                </div>
                                <div className="p-4 text-center">
                                    <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Desviación Q1</div>
                                    <div className="text-red-400 font-light text-xl">–8 ventas</div>
                                    <div className="text-zinc-600 text-xs mt-1">Objetivo Q1: 98 ventas</div>
                                </div>
                            </div>
                        </div>

                        {/* ============================================================ */}
                        {/* SECCIÓN D: KPI4/KPI5 + Costes Operativos + EBITDA            */}
                        {/* ============================================================ */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* KPI4/KPI5 */}
                            <div className="bg-[#18181b] border border-white/5 rounded-2xl p-6 space-y-4">
                                <h3 className="text-white/90 font-semibold flex items-center gap-2 mb-2">
                                    <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
                                    KPI4 &amp; KPI5 — Eficiencia del Revenue
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-[#111] rounded-xl p-4">
                                        <div className="text-zinc-500 text-xs uppercase tracking-wider mb-2">KPI4 — Venta / Lead Calificado</div>
                                        <div className="text-2xl font-light text-white">$6,732</div>
                                        <div className="text-zinc-500 text-xs mt-1">ingreso generado por cada lead Q</div>
                                    </div>
                                    <div className="bg-[#111] rounded-xl p-4">
                                        <div className="text-zinc-500 text-xs uppercase tracking-wider mb-2">KPI5 — Venta / Lead Bruto</div>
                                        <div className="text-2xl font-light text-white">$2,452</div>
                                        <div className="text-zinc-500 text-xs mt-1">ingreso por cada lead captado</div>
                                    </div>
                                    <div className="bg-[#111] rounded-xl p-4 col-span-2">
                                        <div className="text-zinc-500 text-xs uppercase tracking-wider mb-2">CPS — Coste por Venta (CAC Operativo)</div>
                                        <div className="text-2xl font-light text-white">$4,781</div>
                                        <div className="text-zinc-500 text-xs mt-1">incluye marketing + comercial + operaciones</div>
                                    </div>
                                </div>
                            </div>

                            {/* Costes Operativos + EBITDA */}
                            <div className="bg-[#18181b] border border-white/5 rounded-2xl p-6 space-y-4">
                                <h3 className="text-white/90 font-semibold flex items-center gap-2 mb-2">
                                    <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Estructura de Costes — Enero 2026
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        { label: 'Coste Marketing (KPI1)', value: '$153,400', pct: '36.7%', color: 'bg-blue-500' },
                                        { label: 'Coste Laboral (1.30%)', value: '$104,000', pct: '24.9%', color: 'bg-amber-500' },
                                        { label: 'Coste Comisiones (2.00%)', value: '$160,000', pct: '38.4%', color: 'bg-purple-500' },
                                    ].map((item, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-zinc-400">{item.label}</span>
                                                <span className="text-white/60 font-mono">{item.value} <span className="text-zinc-600">({item.pct})</span></span>
                                            </div>
                                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <div className={`h-full ${item.color} rounded-full`} style={{ width: item.pct }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-white/5 pt-4 mt-4 grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Coste Total</div>
                                        <div className="text-white font-light text-xl">$417,400</div>
                                    </div>
                                    <div>
                                        <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">EBITDA Implícito</div>
                                        <div className="text-emerald-400 font-light text-xl">$6.24M</div>
                                        <div className="text-zinc-600 text-xs mt-0.5">Venta Neta − Costes Totales</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ============================================================ */}
                        {/* SECCIÓN E: Performance del Equipo Comercial                  */}
                        {/* ============================================================ */}
                        <div className="bg-[#18181b] border border-white/5 rounded-2xl overflow-hidden">
                            <div className="flex justify-between items-center p-6 border-b border-white/5">
                                <h3 className="text-white/90 font-semibold flex items-center gap-2">
                                    <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    Performance Equipo Comercial — Avance en el Pathway
                                </h3>
                                <div className="text-xs text-zinc-500 italic">* Requiere Webhook Bitrix en tiempo real</div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-white/5">
                                            <th className="text-left p-4 text-zinc-500 font-medium uppercase tracking-wider text-xs">Comercial</th>
                                            <th className="text-right p-4 text-zinc-500 font-medium uppercase tracking-wider text-xs">Asignados</th>
                                            <th className="text-right p-4 text-zinc-500 font-medium uppercase tracking-wider text-xs">En Negociación</th>
                                            <th className="text-right p-4 text-zinc-500 font-medium uppercase tracking-wider text-xs">Estancados +30d</th>
                                            <th className="text-right p-4 text-zinc-500 font-medium uppercase tracking-wider text-xs">Cerrados</th>
                                            <th className="text-right p-4 text-zinc-500 font-medium uppercase tracking-wider text-xs">Win Rate</th>
                                            <th className="text-center p-4 text-zinc-500 font-medium uppercase tracking-wider text-xs">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/[0.03]">
                                        {[
                                            { name: 'Pedro Torres', assigned: 45, negotiation: 20, stagnant: 4, closed: 7, winRate: '15.6%', status: 'ok', statusLabel: 'En ritmo', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
                                            { name: 'Marco Ruiz', assigned: 52, negotiation: 18, stagnant: 6, closed: 6, winRate: '11.5%', status: 'ok', statusLabel: 'En ritmo', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
                                            { name: 'Ana Castillo', assigned: 40, negotiation: 14, stagnant: 9, closed: 4, winRate: '10.0%', status: 'warn', statusLabel: 'Atención', statusColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
                                            { name: 'Susan Méndez', assigned: 38, negotiation: 6, stagnant: 15, closed: 1, winRate: '2.6%', status: 'alert', statusLabel: 'Alerta', statusColor: 'bg-red-500/10 text-red-400 border-red-500/20' },
                                        ].map((agent, i) => (
                                            <tr key={i} className={`hover:bg-white/[0.02] transition-colors ${agent.status === 'alert' ? 'bg-red-500/[0.02]' : ''}`}>
                                                <td className="p-4 text-white/80 font-medium">{agent.name}</td>
                                                <td className="p-4 text-white/60 text-right font-mono">{agent.assigned}</td>
                                                <td className="p-4 text-blue-400 text-right font-mono">{agent.negotiation}</td>
                                                <td className={`p-4 text-right font-mono font-semibold ${agent.stagnant > 10 ? 'text-red-400' : agent.stagnant > 6 ? 'text-amber-400' : 'text-white/40'}`}>{agent.stagnant}</td>
                                                <td className="p-4 text-emerald-400 text-right font-mono font-semibold">{agent.closed}</td>
                                                <td className="p-4 text-white/60 text-right font-mono">{agent.winRate}</td>
                                                <td className="p-4 text-center">
                                                    <span className={`text-xs font-bold px-2 py-1 rounded border ${agent.statusColor}`}>{agent.statusLabel}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* ============================================================ */}
                        {/* SECCIÓN F: Leads en el Limbo                                 */}
                        {/* ============================================================ */}
                        <div className="bg-[#18181b] border border-red-500/10 rounded-2xl overflow-hidden">
                            <div className="flex justify-between items-center p-6 border-b border-red-500/10">
                                <h3 className="text-white/90 font-semibold flex items-center gap-2">
                                    <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Leads en el Limbo — Sin Contactar / Sin Avanzar
                                </h3>
                                <div className="text-xs bg-red-500/10 text-red-400 px-3 py-1 rounded-full border border-red-500/20 font-semibold">Requiere Acción</div>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                                    <div className="md:col-span-1">
                                        <div className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Leads en Limbo</div>
                                        <div className="text-4xl font-light text-red-400">812</div>
                                        <div className="text-zinc-600 text-xs mt-1">24.9% del total captado</div>
                                    </div>
                                    <div>
                                        <div className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Tiempo Promedio Sin Contacto</div>
                                        <div className="text-4xl font-light text-amber-400">14d</div>
                                        <div className="text-zinc-600 text-xs mt-1">promedio de días inactivos</div>
                                    </div>
                                    <div>
                                        <div className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Canal con más Limbo</div>
                                        <div className="text-4xl font-light text-white">Meta</div>
                                        <div className="text-zinc-600 text-xs mt-1">67% de los sin contactar</div>
                                    </div>
                                    <div>
                                        <div className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Revenue en Riesgo</div>
                                        <div className="text-4xl font-light text-red-400">$1.99M</div>
                                        <div className="text-zinc-600 text-xs mt-1">si el 36.4% califica</div>
                                    </div>
                                </div>
                                <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4 text-sm text-red-300/70">
                                    <strong className="text-red-400">Diagnóstico:</strong> 812 leads calificados pendientes de primer contacto o de seguimiento.
                                </div>
                            </div>
                        </div>

                    </div>
                )}

                {/* --- HEALTH & ANALYTICS WIDGETS --- */}
                {viewMode !== "intelligence" && showHealth && (
                    <div className="mb-10 animate-fade-in">
                        {/* --- AI TEXT REPORT --- */}
                        <DataInsights data={data} viewMode={viewMode} />

                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <span>📊</span> Health Analytics
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* Chart 1 */}
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl h-[300px] flex flex-col">
                                <h3 className="text-sm font-semibold text-white/60 mb-6 uppercase tracking-wider">
                                    {viewMode === "deals" ? "Distribución por Etapa (Deals Activos)" : "Volumen de Captación (Últimos 7 días)"}
                                </h3>
                                <div className="flex-1 min-h-0 relative">
                                    {viewMode === "deals" && data?.summary.dealsByStage ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={data.summary.dealsByStage} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                                <XAxis dataKey="stage" stroke="rgba(255,255,255,0.4)" fontSize={11} tickMargin={10} axisLine={false} tickLine={false} tickFormatter={(val) => val.length > 10 ? val.substring(0, 10) + "..." : val} />
                                                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} axisLine={false} tickLine={false} />
                                                <Tooltip
                                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                                    contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                                    itemStyle={{ color: '#fff' }}
                                                />
                                                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                                    {data.summary.dealsByStage.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={getChartColor(entry.stage)} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    ) : viewMode === "leads" && data?.summary.leadsByDate ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={data.summary.leadsByDate} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                                <XAxis dataKey="date" stroke="rgba(255,255,255,0.4)" fontSize={11} tickMargin={10} axisLine={false} tickLine={false} />
                                                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} axisLine={false} tickLine={false} />
                                                <Tooltip
                                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                                    contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                                    itemStyle={{ color: '#fff' }}
                                                />
                                                <Bar dataKey="count" radius={[4, 4, 0, 0]} fill="#C9A84C" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-white/30 text-sm border border-dashed border-white/10 rounded-lg">
                                            Data insuficiente.
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Chart 2: Funnel */}
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl h-[300px] flex flex-col">
                                <h3 className="text-sm font-semibold text-white/60 mb-6 uppercase tracking-wider">Embudo de Conversión Comercial</h3>
                                <div className="flex-1 min-h-0 relative flex flex-col justify-center gap-2">
                                    {data?.summary.funnelMetrics ? (
                                        <div className="w-full max-w-sm mx-auto space-y-3">
                                            {/* TOFU */}
                                            <div className="w-full group">
                                                <div className="flex justify-between text-xs mb-1 text-white/60 group-hover:text-white transition-colors">
                                                    <span>Top of Funnel (Atracción)</span>
                                                    <span className="font-mono bg-white/10 px-1.5 rounded">{data.summary.funnelMetrics.tofu}</span>
                                                </div>
                                                <div className="h-6 w-full bg-[#facc15] rounded border border-white/10 shadow-[0_0_15px_rgba(250,204,21,0.2)]"></div>
                                            </div>

                                            {/* MOFU */}
                                            <div className="w-[75%] mx-auto group">
                                                <div className="flex justify-between text-xs mb-1 text-white/60 group-hover:text-white transition-colors">
                                                    <span>Mid of Funnel (Consideración)</span>
                                                    <span className="font-mono bg-white/10 px-1.5 rounded">{data.summary.funnelMetrics.mofu}</span>
                                                </div>
                                                <div className="h-6 w-full bg-[#60a5fa] rounded border border-white/10 shadow-[0_0_15px_rgba(96,165,250,0.2)]"></div>
                                            </div>

                                            {/* BOFU */}
                                            <div className="w-[45%] mx-auto group">
                                                <div className="flex justify-between text-xs mb-1 text-white/60 group-hover:text-white transition-colors">
                                                    <span>Bottom (Cierre)</span>
                                                    <span className="font-mono bg-white/10 px-1.5 rounded flex items-center gap-1">
                                                        {data.summary.funnelMetrics.bofu}
                                                        {data.summary.funnelMetrics.tofu > 0 && <span className="text-[#4ade80] ml-1">({((data.summary.funnelMetrics.bofu / data.summary.funnelMetrics.tofu) * 100).toFixed(1)}%)</span>}
                                                    </span>
                                                </div>
                                                <div className="h-6 w-full bg-[#4ade80] rounded border border-white/10 shadow-[0_0_15px_rgba(74,222,128,0.2)]"></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-white/30 text-sm border border-dashed border-white/10 rounded-lg">
                                            Recopilando métricas del Funnel...
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- CONTROLS BAR: SUB-TABS & SEARCH --- */}
                {viewMode !== "intelligence" && (
                    <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
                        <div className="flex flex-wrap gap-2">
                            {activeTabs.map((t) => (
                                <button
                                    key={t.key}
                                    onClick={() => { setActiveTab(t.key as any); setPage(1); }}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${activeTab === t.key ? "bg-white/20 text-white" : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"}`}
                                >
                                    {t.label} {t.count !== undefined && <span className="ml-2 bg-black/30 px-2 py-0.5 rounded text-xs">{t.count}</span>}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full md:w-64">
                            <input
                                type="text"
                                placeholder={`Buscar en ${viewMode === "leads" ? "leads" : "deals"}...`}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-white/30 transition-colors"
                            />
                            <svg className="w-4 h-4 text-white/30 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                    </div>
                )}

                {/* --- MAIN DATA TABLE --- */}
                {viewMode !== "intelligence" && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden relative min-h-[400px]">
                        {loading && (
                            <div className="absolute inset-0 bg-[#0F0F0F]/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
                                <div className="w-8 h-8 border-4 border-white/20 border-t-[#C9A84C] rounded-full animate-spin mb-4"></div>
                                <div className="text-white/60 text-sm font-medium tracking-wide uppercase">Cargando datos...</div>
                            </div>
                        )}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-white/80">
                                <thead className="text-xs uppercase bg-white/5 text-white/40 font-semibold border-b border-white/10">
                                    <tr>
                                        {viewMode === "leads" ? (
                                            <>
                                                <th className="px-6 py-4">Usuario</th>
                                                <th className="px-6 py-4">Contacto</th>
                                                <th className="px-6 py-4">Fuente / Estado</th>
                                                <th className="px-6 py-4">Fecha Captura</th>
                                            </>
                                        ) : (
                                            <>
                                                <th className="px-6 py-4">Negocio</th>
                                                <th className="px-6 py-4">Etapa Actual</th>
                                                <th className="px-6 py-4">Responsable</th>
                                                <th className="px-6 py-4 text-right">Bitrix ID</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center text-white/40">
                                                No se encontraron resultados
                                            </td>
                                        </tr>
                                    ) : (
                                        data?.data.map((item) => (
                                            <tr
                                                key={item.id}
                                                onClick={() => setSelectedRecord(item)}
                                                className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group"
                                            >
                                                {viewMode === "leads" ? (
                                                    // LEAD ROW
                                                    <>
                                                        <td className="px-6 py-4">
                                                            <div className="font-semibold text-white group-hover:text-white transition-colors">{(item as Lead).name}</div>
                                                            <div className="text-xs text-white/40 mt-0.5">ID: {item.id.split('-')[0]}</div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="text-white/80">{(item as Lead).email}</div>
                                                            <div className="text-white/50 text-xs mt-0.5">{(item as Lead).phone || '-'}</div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {(item as Lead).isJunk ? (
                                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 text-xs border border-red-500/20 font-medium tracking-wide" title={(item as Lead).junkReason || ""}>
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Junk
                                                                </span>
                                                            ) : (
                                                                <span className="text-white/60">{(item as Lead).source || 'API'}</span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 text-white/50">
                                                            {new Date(item.createdAt).toLocaleString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                                        </td>
                                                    </>
                                                ) : (
                                                    // DEAL ROW
                                                    <>
                                                        <td className="px-6 py-4">
                                                            <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">{(item as Deal).title}</div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/5 text-white/80 text-xs border border-white/10 font-medium">
                                                                {(item as Deal).stageId}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {((item as Deal).assignedTo === "14" || !(item as Deal).assignedTo) ? (
                                                                <span className="text-orange-400 font-medium text-xs flex items-center gap-1.5">
                                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                                                    Sin Asignar
                                                                </span>
                                                            ) : (
                                                                <span className="text-white/60">{(item as Deal).assignedTo}</span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 text-right text-white/40 font-mono text-xs">
                                                            #{(item as Deal).bitrixDealId}
                                                        </td>
                                                    </>
                                                )}
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* --- PAGINATION --- */}
                {viewMode !== "intelligence" && (
                    <div className="flex justify-between items-center mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className="text-sm text-white/40">
                            Mostrando página <span className="font-semibold text-white">{data?.pagination.page}</span> de <span className="font-semibold text-white">{data?.pagination.totalPages || 1}</span> (Total: {data?.pagination.totalItems})
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-4 py-2 bg-white/5 text-white/80 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Anterior
                            </button>
                            <button
                                onClick={() => setPage(p => p + 1)}
                                disabled={page === (data?.pagination.totalPages || 1)}
                                className="px-4 py-2 bg-white/5 text-white/80 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                )}

                {/* Webhook info */}
                <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/15 rounded-xl text-xs text-blue-300/70">
                    <strong>Webhook Entrante (Bitrix → Sistema):</strong>{" "}
                    <code className="bg-white/10 px-2 py-0.5 rounded">{typeof window !== "undefined" ? window.location.origin : ""}/api/webhooks/bitrix</code>
                </div>
            </main>

            {/* Selected Record Modal */}
            {
                selectedRecord && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedRecord(null)}>
                        <div
                            className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors text-xl p-2"
                                onClick={() => setSelectedRecord(null)}
                            >
                                ✕
                            </button>

                            <div className="flex items-center gap-3 mb-6 pr-8">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0 ${'bitrixDealId' in selectedRecord ? 'bg-blue-500/20 text-blue-400' : 'bg-[#C9A84C]/20 text-[#C9A84C]'}`}>
                                    {'bitrixDealId' in selectedRecord ? 'D' : 'L'}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white truncate max-w-[300px]" title={'bitrixDealId' in selectedRecord ? selectedRecord.title : selectedRecord.name}>
                                        {'bitrixDealId' in selectedRecord ? `Deal #${selectedRecord.bitrixDealId}` : 'Detalles del Lead'}
                                    </h2>
                                    <p className="text-sm text-white/50">
                                        {'bitrixDealId' in selectedRecord ? 'Pipeline de Negocios' : 'Perfil de Contacto'}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-white/40 uppercase tracking-wider">
                                        {'bitrixDealId' in selectedRecord ? 'Título' : 'Nombre Completo'}
                                    </label>
                                    <div className="font-semibold text-lg text-white">
                                        {'title' in selectedRecord ? selectedRecord.title : selectedRecord.name}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                                    <div>
                                        <label className="text-xs text-white/40 uppercase tracking-wider block mb-1">
                                            {'bitrixDealId' in selectedRecord ? 'Etapa Actual' : 'Email'}
                                        </label>
                                        {'bitrixDealId' in selectedRecord ? (
                                            <span className="px-2 py-1 rounded bg-white/10 text-sm font-medium border border-white/10">
                                                {selectedRecord.stageId}
                                            </span>
                                        ) : (
                                            <span className="text-sm text-white/80 break-all">{selectedRecord.email}</span>
                                        )}
                                    </div>
                                    <div>
                                        <label className="text-xs text-white/40 uppercase tracking-wider block mb-1">
                                            {'bitrixDealId' in selectedRecord ? 'Asignado a' : 'Teléfono / Status'}
                                        </label>
                                        {'bitrixDealId' in selectedRecord ? (
                                            (selectedRecord.assignedTo === "14" || !selectedRecord.assignedTo) ? (
                                                <span className="text-orange-400 text-sm font-medium flex items-center gap-1">
                                                    ⚠️ Ventas (Sin Asignar)
                                                </span>
                                            ) : (
                                                <span className="text-white/80 text-sm font-medium">{selectedRecord.assignedTo}</span>
                                            )
                                        ) : (
                                            <span className={`text-sm font-medium ${selectedRecord.isJunk ? 'text-red-400' : 'text-white/80'}`}>
                                                {selectedRecord.isJunk ? '⚠️ Marcado Junk' : (selectedRecord.phone || 'Sin teléfono')}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-white/40 uppercase tracking-wider">Creado el</label>
                                        <div className="text-sm text-white/80">{new Date(selectedRecord.createdAt).toLocaleString("es-ES")}</div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-white/40 uppercase tracking-wider">
                                            {'bitrixDealId' in selectedRecord ? 'Actualizado el' : 'Origen'}
                                        </label>
                                        <div className="text-sm text-white/80">
                                            {'bitrixDealId' in selectedRecord
                                                ? (selectedRecord.stageDate ? new Date(selectedRecord.stageDate).toLocaleString("es-ES") : "Desconocida")
                                                : (selectedRecord.source || "Bitrix CRM")}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-4 border-t border-white/10 flex justify-end gap-3">
                                <button
                                    onClick={() => setSelectedRecord(null)}
                                    className="bg-white/10 text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                                >
                                    Cerrar Detalles
                                </button>
                                {'bitrixDealId' in selectedRecord ? (
                                    <a
                                        href={`https://clerhp.bitrix24.es/crm/deal/details/${selectedRecord.bitrixDealId}/`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
                                    >
                                        Abrir en Bitrix24
                                    </a>
                                ) : 'bitrixLeadId' in selectedRecord && selectedRecord.bitrixLeadId ? (
                                    <a
                                        href={`https://clerhp.bitrix24.es/crm/lead/details/${selectedRecord.bitrixLeadId}/`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="bg-[#C9A84C] text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#b0913e] transition-colors"
                                    >
                                        Abrir en Bitrix24
                                    </a>
                                ) : null}
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
function AlertTable({
    title,
    subtitle,
    headers,
    rows,
    emptyMsg,
}: {
    title: string;
    subtitle?: string;
    headers: string[];
    rows: { id: string; onClick?: () => void; cells: (string | React.ReactNode)[] }[];
    emptyMsg: string;
}) {
    return (
        <div className="w-full">
            <div className="px-6 py-4 border-b border-white/8">
                <h2 className="font-semibold text-white">{title}</h2>
                {subtitle && <p className="text-white/45 text-xs mt-0.5">{subtitle}</p>}
            </div>
            {rows.length === 0 ? (
                <div className="py-16 text-center text-white/40 text-sm">{emptyMsg}</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/8">
                                {headers.map((h) => (
                                    <th key={h} className="text-left px-6 py-3 text-white/40 font-medium text-xs uppercase tracking-wider">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row) => (
                                <tr
                                    key={row.id}
                                    onClick={row.onClick}
                                    className={`border-b border-white/5 transition-colors ${row.onClick ? "cursor-pointer hover:bg-white/5" : "hover:bg-white/3"}`}
                                >
                                    {row.cells.map((cell, j) => (
                                        <td key={j} className="px-6 py-3 text-white/75">{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
