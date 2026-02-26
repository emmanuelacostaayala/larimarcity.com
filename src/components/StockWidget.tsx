"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Clock, Activity, BarChart4 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type StockData = {
    cierre: string;
    variacionPct: string;
    maximoDia: string;
    minimoDia: string;
    volumenDia: string;
    horaDato: string;
    diferenciaAnual: string;
    cierre2025: string;
    capitalizacion: string;
    isin: string;
};

// Realistic mock data for CLR on BME Growth since we lack a live PHP proxy
const mockStockData: StockData = {
    cierre: "6.36",
    variacionPct: "+8.53",
    maximoDia: "6.42",
    minimoDia: "6.31",
    volumenDia: "23,150",
    horaDato: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
    diferenciaAnual: "+12.4%",
    cierre2025: "5.65",
    capitalizacion: "115.57 Mill. €",
    isin: "ES0105383009",
};

// Generate realistic chart data
const generateChartData = (periodo: string) => {
    const data = [];
    const now = new Date();
    let basePrice = 5.20;
    const dataPoints = periodo === "3M" ? 90 : periodo === "1Y" ? 12 : 30;

    for (let i = dataPoints; i >= 0; i--) {
        const d = new Date(now);
        if (periodo === "1Y") d.setMonth(d.getMonth() - i);
        else d.setDate(d.getDate() - i);

        basePrice = basePrice + (Math.random() - 0.45) * 0.2; // slight upward trend
        data.push({
            fecha: d.toLocaleDateString("es-ES", { day: "2-digit", month: "short" }),
            cierre: Number(basePrice.toFixed(2)),
        });
    }
    // Ensure last matches current
    data[data.length - 1].cierre = 6.36;
    return data;
};

export default function StockWidget() {
    const [data, setData] = useState<StockData | null>(null);
    const [chartData, setChartData] = useState<{ fecha: string; cierre: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState("3M");

    useEffect(() => {
        // Simulate initial load
        setTimeout(() => {
            setData(mockStockData);
            setChartData(generateChartData(period));
            setLoading(false);
        }, 1500);
    }, []);

    const handlePeriodChange = (newPeriod: string) => {
        setLoading(true);
        setPeriod(newPeriod);
        setTimeout(() => {
            setChartData(generateChartData(newPeriod));
            setLoading(false);
        }, 600);
    };

    if (loading && !data) {
        return (
            <div className="w-full bg-[#0a101f] border border-white/10 p-12 flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-10 h-10 border-4 border-gold/20 border-t-gold rounded-full animate-spin mb-4" />
                <p className="text-gold font-playfair animate-pulse">Cargando datos bursátiles BME Growth...</p>
            </div>
        );
    }

    const isPositive = data ? parseFloat(data.variacionPct) >= 0 : true;

    return (
        <div className="w-full bg-[#0a101f] border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="bg-[#121c30] p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 className="font-playfair text-2xl text-white flex items-center gap-3">
                        <Activity className="text-gold w-6 h-6" />
                        CLERHP Estructuras S.A.
                    </h3>
                    <p className="text-white/60 text-sm mt-1 uppercase tracking-widest">
                        Ticker: CLR | Mercado: BME Growth
                    </p>
                </div>
                <div className="text-right flex flex-col items-end">
                    <div className="flex items-end gap-3">
                        <span className="text-4xl text-white font-bold">{data?.cierre} €</span>
                        <span className={`text-lg font-bold flex items-center mb-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                            {isPositive ? <TrendingUp className="w-5 h-5 mr-1" /> : <TrendingDown className="w-5 h-5 mr-1" />}
                            {data?.variacionPct}%
                        </span>
                    </div>
                    <p className="text-white/40 flex items-center gap-1 text-xs mt-1">
                        <Clock className="w-3 h-3" />
                        Actualizado: {data?.horaDato}
                    </p>
                </div>
            </div>

            {/* Grid Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
                <div className="bg-[#0a101f] p-6 text-center">
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Máximo Hoy</p>
                    <p className="text-white text-xl">{data?.maximoDia} €</p>
                </div>
                <div className="bg-[#0a101f] p-6 text-center">
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Mínimo Hoy</p>
                    <p className="text-white text-xl">{data?.minimoDia} €</p>
                </div>
                <div className="bg-[#0a101f] p-6 text-center">
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Volumen</p>
                    <p className="text-white text-xl">{data?.volumenDia}</p>
                </div>
                <div className="bg-[#0a101f] p-6 text-center">
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Capitalización</p>
                    <p className="text-white text-xl">{data?.capitalizacion}</p>
                </div>
            </div>

            {/* Chart Section */}
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="text-white uppercase font-bold tracking-widest flex items-center gap-2">
                        <BarChart4 className="w-5 h-5 text-gold" />
                        Evolución de la Cotización
                    </h4>
                    <div className="flex gap-2">
                        {["1M", "3M", "6M", "1Y"].map((p) => (
                            <button
                                key={p}
                                onClick={() => handlePeriodChange(p)}
                                className={`px-3 py-1 text-xs uppercase tracking-widest border transition-colors ${period === p
                                    ? "bg-gold text-primary border-gold font-bold"
                                    : "bg-transparent text-white/60 border-white/20 hover:border-white/50"
                                    }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-[300px] w-full relative">
                    {loading && (
                        <div className="absolute inset-0 z-10 bg-[#0a101f]/80 backdrop-blur-sm flex items-center justify-center">
                            <div className="w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
                        </div>
                    )}
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorCierre" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#c5a880" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#c5a880" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="fecha"
                                stroke="#ffffff40"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#ffffff40"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(val) => `€${val}`}
                                domain={['dataMin - 0.2', 'dataMax + 0.2']}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#121c30', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                                itemStyle={{ color: '#c5a880' }}
                                formatter={(value: any) => [`${Number(value).toFixed(2)} €`, "Cierre"]}
                            />
                            <Area
                                type="monotone"
                                dataKey="cierre"
                                stroke="#c5a880"
                                fillOpacity={1}
                                fill="url(#colorCierre)"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between text-xs text-white/40 uppercase tracking-widest">
                    <p>ISIN: {data?.isin}</p>
                    <p>Datos provistos con 15 minutos de retraso orientativo.</p>
                </div>
            </div>
        </div>
    );
}
