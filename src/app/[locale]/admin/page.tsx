"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        setLoading(false);
        if (res.ok) {
            router.push("/admin/dashboard");
        } else {
            const data = await res.json().catch(() => ({}));
            setError(data.error || "Credenciales inválidas");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111827] to-[#0c1420] flex items-center justify-center p-4">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5"
                style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #C9A84C 1px, transparent 0)", backgroundSize: "40px 40px" }}
            />

            <div className="relative w-full max-w-md">
                {/* Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                    {/* Logo Mark */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#8B6914] flex items-center justify-center mb-4 shadow-lg">
                            <span className="text-white font-bold text-xl">L</span>
                        </div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Panel Administrativo</h1>
                        <p className="text-white/50 text-sm mt-1">Larimar City · CRM Dashboard</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-1">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="admin@larimarcity.com"
                                className="w-full bg-white/8 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C]/50 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-1">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••••••••••"
                                className="w-full bg-white/8 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C]/50 transition-all"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-500/15 border border-red-500/30 rounded-lg px-4 py-3 text-red-300 text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-[#C9A84C] to-[#8B6914] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                        >
                            {loading ? "Iniciando sesión..." : "Iniciar Sesión →"}
                        </button>
                    </form>

                    <p className="text-center text-white/25 text-xs mt-6">
                        Acceso restringido · Larimar City & Resort
                    </p>
                </div>
            </div>
        </div>
    );
}
