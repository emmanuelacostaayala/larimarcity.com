"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

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
    const [viewMode, setViewMode] = useState<"leads" | "deals">("leads");
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
    const handleViewModeChange = (mode: "leads" | "deals") => {
        setViewMode(mode);
        setActiveTab(mode === "leads" ? "leads" : "deals");
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
        { key: "junk", label: "� Leads Junk", count: data?.summary.junkLeads },
    ] as const;

    const dealsTabs = [
        { key: "deals", label: "💼 Pipeline de Negocios", count: data?.summary.totalDeals },
        { key: "unassigned", label: "� Sin Responsable", count: data?.summary.unassignedCount },
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
                <div className="bg-white/5 border border-white/10 rounded-xl p-1.5 flex lg:w-max mb-8">
                    <button
                        onClick={() => handleViewModeChange("leads")}
                        className={`flex-1 lg:px-8 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${viewMode === "leads" ? "bg-[#C9A84C] text-black shadow-lg" : "text-white/60 hover:text-white hover:bg-white/5"}`}
                    >
                        📈 Marketing (Leads)
                    </button>
                    <button
                        onClick={() => handleViewModeChange("deals")}
                        className={`flex-1 lg:px-8 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${viewMode === "deals" ? "bg-blue-500 text-white shadow-lg" : "text-white/60 hover:text-white hover:bg-white/5"}`}
                    >
                        💼 Ventas (Deals)
                    </button>
                </div>

                {/* --- AI TEXT REPORT --- */}
                <DataInsights data={data} viewMode={viewMode} />

                {/* --- HEALTH & ANALYTICS WIDGETS --- */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        {viewMode === "leads" ? "📊 Salud de Marketing" : "📊 Pipeline Management"}
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Summary Stats Column */}
                        <div className="space-y-4">
                            {viewMode === "leads" ? (
                                <>
                                    <StatCard label="Total Leads Importados" value={data?.summary.totalLeads || 0} accent="border-white/10" />
                                    <StatCard label="Leads Junk (Inválidos) 🚫" value={data?.summary.junkLeads || 0} accent="border-red-500/30" />
                                </>
                            ) : (
                                <>
                                    <StatCard label="Total Deals (Oportunidades)" value={data?.summary.totalDeals || 0} accent="border-blue-500/30" />
                                    <StatCard label="Deals sin Responsable 👤" value={data?.summary.unassignedCount || 0} accent="border-orange-500/30" />
                                    <StatCard label="Tratos Estancados ⏳" value={data?.summary.stagnantCount || 0} accent="border-amber-500/30" />
                                </>
                            )}
                        </div>

                        {/* Chart Column */}
                        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 h-[250px] flex flex-col">
                            <h3 className="text-sm text-white/50 mb-4 font-medium uppercase tracking-wider">
                                {viewMode === "leads" ? "Volumen de Leads" : "Distribución de Negocios por Etapa"}
                            </h3>
                            <div className="flex-1 w-full relative">
                                {viewMode === "deals" && data?.summary.dealsByStage ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={data.summary.dealsByStage} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                            <XAxis dataKey="stage" stroke="rgba(255,255,255,0.4)" fontSize={11} tickMargin={10} axisLine={false} tickLine={false} />
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
                    </div>
                </div>

                {/* --- CONTROLS BAR: SUB-TABS & SEARCH --- */}
                <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
                    <div className="flex gap-2 flex-wrap">
                        {activeTabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => { setActiveTab(tab.key); setPage(1); setSearch(""); }}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === tab.key
                                    ? "bg-[#C9A84C] text-black"
                                    : "bg-white/8 text-white/70 hover:bg-white/12 border border-white/10"
                                    }`}
                            >
                                {tab.label}
                                {(tab.count || 0) > 0 && (
                                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.key ? "bg-black/20" : "bg-white/15"}`}>
                                        {(tab.count || 0).toLocaleString()}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-64 flex-shrink-0">
                        <input
                            type="text"
                            placeholder="Buscar nombre, email, ID..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
                        />
                        <svg className="w-4 h-4 text-white/40 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Table Panel */}
                <div className="bg-white/4 border border-white/10 rounded-2xl overflow-hidden relative min-h-[400px]">
                    {loading && data && (
                        <div className="absolute top-0 inset-x-0 h-1 overflow-hidden bg-white/5 z-20">
                            <div className="w-1/2 h-full bg-[#C9A84C] animate-[pulse_1.5s_ease-in-out_infinite] rounded-full" />
                        </div>
                    )}

                    {/* Render table based on active tab type */}
                    {(activeTab === "leads" || activeTab === "junk") ? (
                        <AlertTable
                            title={activeTab === "leads" ? "📋 Base de Datos de Leads" : "⚠️ Leads Junk Detectados"}
                            subtitle={activeTab === "junk" ? "Registros identificados como datos sospechosos o inválidos." : "Todos los leads importados desde Bitrix24."}
                            headers={["Nombre", "Email", "Teléfono", "Fuente", "Fecha"]}
                            rows={(data?.data as Lead[] || []).map((l) => ({
                                id: l.id,
                                onClick: () => setSelectedRecord(l),
                                cells: [
                                    <div key={`n-${l.id}`} className="font-semibold">{l.name}</div>,
                                    <div key={`e-${l.id}`} className="text-white/70">{l.email}</div>,
                                    l.phone || "—",
                                    l.source || "—",
                                    new Date(l.createdAt).toLocaleDateString("es-ES"),
                                ]
                            }))}
                            emptyMsg="No se encontraron leads con estos criterios."
                        />
                    ) : (
                        <AlertTable
                            title={activeTab === "deals" ? "💼 Base de Datos de Deals" : activeTab === "stagnant" ? "⏳ Deals Estancados (> 30 días)" : "👤 Deals Sin Asignar"}
                            subtitle={activeTab === "stagnant" ? "Negocios sin avance en el pipeline durante más de 30 días." : activeTab === "unassigned" ? "Deals asignados al usuario genérico 'Ventas' (ID 14)." : "Todos los negocios (Deals) importados."}
                            headers={["Deal ID", "Título", "Etapa", "Asignado a", "Tiempo/Creado"]}
                            rows={(data?.data as Deal[] || []).map((d) => ({
                                id: d.id,
                                onClick: () => setSelectedRecord(d),
                                cells: [
                                    <span key={`id-${d.id}`} className="font-mono text-white/50">#{d.bitrixDealId}</span>,
                                    <div key={`t-${d.id}`} className="font-semibold truncate max-w-[200px]" title={d.title}>{d.title}</div>,
                                    <span key={`s-${d.id}`} className="px-2 py-1 rounded bg-white/10 text-xs">{d.stageId}</span>,
                                    <span key={`a-${d.id}`} className={(d.assignedTo === "14" || d.assignedTo === "Ventas" || !d.assignedTo) ? "text-orange-400" : "text-white/70"}>
                                        {d.assignedTo === "14" ? "Ventas (Sin Asignar)" : d.assignedTo || "Sin asignar"}
                                    </span>,
                                    activeTab === "stagnant"
                                        ? <span key={`time-${d.id}`} className="text-amber-400 font-semibold">{daysSince(d.stageDate || d.createdAt)}d parado</span>
                                        : new Date(d.createdAt).toLocaleDateString("es-ES"),
                                ]
                            }))}
                            emptyMsg="No se encontraron deals con estos criterios."
                        />
                    )}

                    {/* Pagination Controls */}
                    {data?.pagination && data.pagination.totalPages > 1 && (
                        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between text-sm">
                            <span className="text-white/40">
                                Mostrando {((data.pagination.page - 1) * data.pagination.limit) + 1} a {Math.min(data.pagination.page * data.pagination.limit, data.pagination.totalItems)} de {data.pagination.totalItems.toLocaleString()}
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={data.pagination.page === 1}
                                    className="px-3 py-1.5 rounded bg-white/5 border border-white/10 disabled:opacity-30 hover:bg-white/10 transition-colors"
                                >
                                    Anterior
                                </button>
                                <span className="px-2 text-white/70">
                                    Página {data.pagination.page} de {data.pagination.totalPages}
                                </span>
                                <button
                                    onClick={() => setPage(p => Math.min(data.pagination.totalPages, p + 1))}
                                    disabled={data.pagination.page === data.pagination.totalPages}
                                    className="px-3 py-1.5 rounded bg-white/5 border border-white/10 disabled:opacity-30 hover:bg-white/10 transition-colors"
                                >
                                    Siguiente
                                </button>
                            </div>
                        </div>
                    )}
                </div>

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
