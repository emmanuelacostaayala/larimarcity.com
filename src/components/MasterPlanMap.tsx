"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MapPin, X, ArrowRight, Building2, Trees, Waves } from "lucide-react";
import Link from "next/link";

const hotspots = [
    {
        id: "prime",
        x: "71%",
        y: "47%",
        title: "Prime Towers",
        desc: "El corazón cosmopolita de Fase I. Comodidad y vistas al farallón.",
        href: "/prime-towers",
        icon: <Building2 className="w-5 h-5" />,
        color: "bg-gold"
    },
    {
        id: "horizon",
        x: "53%",
        y: "22%",
        title: "Horizon View",
        desc: "Vistas infinitas al océano desde la cota más alta.",
        href: "/horizon-view",
        icon: <Building2 className="w-5 h-5" />,
        color: "bg-gold"
    },
    {
        id: "villas",
        x: "35%",
        y: "45%",
        title: "Villas Golf",
        desc: "Privacidad absoluta frente al campo de golf de 18 hoyos.",
        href: "/villas",
        icon: <Trees className="w-5 h-5" />,
        color: "bg-[#4FB0C6]"
    },
    {
        id: "beach",
        x: "78%",
        y: "32%",
        title: "Beach Club",
        desc: "Piscinas infinity y arenas blancas sobre el farallón.",
        href: "/amenidades",
        icon: <Waves className="w-5 h-5" />,
        color: "bg-secondary"
    }
];

export default function MasterPlanMap() {
    const [activeId, setActiveId] = useState<string | null>(null);

    return (
        <div className="relative w-full aspect-[16/9] bg-[#0a101f] overflow-hidden rounded-sm border border-white/10 group shadow-2xl">
            {/* Base Map Image */}
            <Image
                src="/images/original/LARIMAR_MASTERPLAN_Usos.webp"
                alt="Larimar City Master Plan"
                fill
                className="object-contain transition-transform duration-1000 group-hover:scale-105"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f]/80 via-transparent to-transparent pointer-events-none" />

            {/* Hotspots Container */}
            <div className="absolute inset-0 z-10">
                {hotspots.map((spot) => (
                    <div
                        key={spot.id}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left: spot.x, top: spot.y }}
                    >
                        <button
                            onClick={() => setActiveId(spot.id)}
                            className={`relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full ${spot.color} text-white shadow-lg shadow-black/50 hover:scale-110 transition-transform group/btn`}
                        >
                            <div className={`absolute inset-0 rounded-full animate-ping ${spot.color} opacity-40`} />
                            <MapPin className="w-5 h-5 relative z-10" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Info Card / Sidebar */}
            <AnimatePresence>
                {activeId && (
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="absolute right-4 top-4 bottom-4 w-72 md:w-80 bg-[#0a101f]/95 backdrop-blur-md border border-white/10 p-8 z-20 flex flex-col justify-between shadow-2xl rounded-sm"
                    >
                        <div>
                            <button
                                onClick={() => setActiveId(null)}
                                className="absolute right-4 top-4 text-white/50 hover:text-white transition-colors"
                                aria-label="Cerrar"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {(() => {
                                const spot = hotspots.find(s => s.id === activeId);
                                if (!spot) return null;
                                return (
                                    <>
                                        <div className={`w-12 h-12 rounded-full ${spot.color} flex items-center justify-center text-white mb-6 border border-white/20`}>
                                            {spot.icon}
                                        </div>
                                        <h3 className="font-playfair text-3xl text-white mb-4">{spot.title}</h3>
                                        <p className="text-white/60 text-sm leading-relaxed mb-8">
                                            {spot.desc}
                                        </p>
                                    </>
                                );
                            })()}
                        </div>

                        <Link
                            href={hotspots.find(s => s.id === activeId)?.href || "#"}
                            className="group flex items-center justify-between py-4 border-t border-white/10 text-white hover:text-gold transition-colors text-sm font-bold tracking-widest uppercase"
                        >
                            Ver Detalles del Proyecto
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Map Hint */}
            {!activeId && (
                <div className="absolute bottom-8 left-8 p-4 bg-black/40 backdrop-blur-sm border border-white/10 text-white rounded-sm pointer-events-none animate-pulse">
                    <p className="text-[10px] uppercase tracking-widest font-bold opacity-70 mb-1">Mapa Interactivo</p>
                    <p className="text-sm">Selecciona los puntos para explorar la Fase I</p>
                </div>
            )}
        </div>
    );
}
