"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Plus } from "lucide-react";

// Native image dimensions for precise mapping
const NATIVE_WIDTH = 1447;
const NATIVE_HEIGHT = 836;
// Aspect ratio padding = (836 / 1447) * 100 = 57.7747%
const PADDING_BOTTOM = "57.7747%";

const hotspots = [
    { id: 0, x: "36.79%", y: "32.05%", title: "HOTEL" },
    { id: 1, x: "59.69%", y: "16.30%", title: "RESIDENCIAL" },
    { id: 2, x: "51.00%", y: "45.94%", title: "CAMPO DE GOLF" },
    { id: 3, x: "57.60%", y: "53.81%", title: "HOTEL" },
    { id: 4, x: "39.37%", y: "57.09%", title: "SERVICIOS" },
    { id: 5, x: "45.88%", y: "42.00%", title: "RESIDENCIAL" },
    { id: 6, x: "54.57%", y: "23.65%", title: "RESIDENCIAL" },
    { id: 7, x: "90.90%", y: "68.81%", title: "COMERCIAL" },
    { id: 8, x: "50.47%", y: "30.30%", title: "RESIDENCIAL" },
    { id: 9, x: "79.21%", y: "41.90%", title: "HOTEL" },
    { id: 10, x: "68.88%", y: "23.61%", title: "HOTEL" },
    { id: 11, x: "65.30%", y: "15.66%", title: "HOTEL" },
    { id: 12, x: "59.50%", y: "35.59%", title: "RESIDENCIAL" },
    { id: 13, x: "66.98%", y: "37.53%", title: "BOULEVARD" },
    { id: 14, x: "77.44%", y: "32.76%", title: "MALECÓN" },
    { id: 15, x: "81.11%", y: "57.24%", title: "HOTEL" },
    { id: 16, x: "63.43%", y: "24.78%", title: "RESIDENCIAL" },
    { id: 17, x: "66.44%", y: "50.77%", title: "RESIDENCIAL" },
    { id: 18, x: "63.04%", y: "10.21%", title: "HOTEL" },
    { id: 19, x: "75.67%", y: "51.52%", title: "RESIDENCIAL" },
    { id: 20, x: "73.80%", y: "34.03%", title: "HOTEL" },
    { id: 21, x: "86.05%", y: "56.28%", title: "CAMPO DE GOLF" },
    { id: 22, x: "70.69%", y: "43.03%", title: "RESIDENCIAL" },
    { id: 23, x: "86.95%", y: "73.12%", title: "SERVICIOS" }
];

export default function MasterPlanMap() {
    const [activeId, setActiveId] = useState<number | null>(null);

    return (
        <div className="w-full bg-[#f8f9fa] rounded-sm border border-black/5 shadow-xl overflow-hidden relative group">

            {/* Aspect Ratio Container */}
            <div className="relative w-full" style={{ paddingBottom: PADDING_BOTTOM }}>

                {/* Image filling perfectly */}
                <Image
                    src="/images/original/LARIMAR_MASTERPLAN_Fases.webp"
                    alt="Larimar City Master Plan"
                    fill
                    className="object-cover absolute inset-0"
                    priority
                    sizes="100vw"
                />

                {/* Hotspots layer pinned to exact aspect ratio box */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    {hotspots.map((spot) => (
                        <div
                            key={spot.id}
                            id={`hotspot-${spot.id}`}
                            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto hover:z-50"
                            style={{ left: spot.x, top: spot.y }}
                        >
                            <div className="relative group/spot">
                                <button
                                    onClick={() => setActiveId(activeId === spot.id ? null : spot.id)}
                                    className={`flex items-center justify-center w-5 h-5 md:w-8 md:h-8 lg:w-9 lg:h-9 rounded-full bg-black text-white border-2 border-white shadow-[0_0_10px_rgba(0,0,0,0.5)] transform transition-transform duration-300 ${activeId === spot.id ? 'scale-125 z-30' : 'hover:scale-110'}`}
                                >
                                    <Plus className={`w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 transition-transform duration-300 ${activeId === spot.id ? 'rotate-45' : ''}`} />
                                </button>

                                {/* Tooltip on Hover or Active - Hide while dragging for better visibility */}
                                <AnimatePresence>
                                    {(activeId === spot.id) && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: -45 }}
                                            exit={{ opacity: 0, scale: 0.8, y: 10 }}
                                            className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0a2e52] text-white px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs lg:text-sm font-bold rounded shadow-xl pointer-events-none z-40 transform origin-bottom"
                                        >
                                            {spot.title}
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0a2e52] rotate-45" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Close overlay */}
                {activeId !== null && (
                    <div
                        className="absolute inset-0 z-0 bg-black/5 cursor-pointer"
                        onClick={() => setActiveId(null)}
                    />
                )}
            </div>

            {/* Map Hint */}
            <div className="absolute bottom-6 left-6 p-3 bg-white/90 backdrop-blur-sm border border-black/10 text-black rounded shadow-lg pointer-events-none z-20">
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-70 mb-1">Plan Maestro</p>
                <p className="text-xs font-semibold">Explora las fases y usos de Larimar City</p>
            </div>
        </div>
    );
}
