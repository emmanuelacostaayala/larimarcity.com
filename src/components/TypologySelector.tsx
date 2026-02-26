"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bed, Bath, Square, ChevronRight } from "lucide-react";
import Image from "next/image";

const typologies = [
    {
        id: "tipologia-1",
        name: "Tipología 1",
        level: "Nivel 2-8",
        beds: 1,
        baths: 1,
        sqm: 75,
        desc: "Unidad optimizada para el alquiler vacacional de alta rentabilidad. Vistas al jardín central y espacios integrados.",
        price: "155,000",
        image: "/images/original/breezer_towers_interior_bajo_1.webp"
    },
    {
        id: "tipologia-2",
        name: "Tipología 2",
        level: "Nivel 3-10",
        beds: 2,
        baths: 2,
        sqm: 125,
        desc: "Espacio amplio con balcón perimetral y cocina integrada. Ideal para familias o estancias largas con máxima privacidad.",
        price: "245,000",
        image: "/images/original/breezer_towers_interior_bajo_23.webp"
    },
    {
        id: "tipologia-3",
        name: "Tipología 3",
        level: "Nivel 11-12",
        beds: 3,
        baths: 3.5,
        sqm: 210,
        desc: "El lujo máximo. Solárium privado, ambientes amplios y vistas ininterrumpidas de 180 grados al panorama del Caribe.",
        price: "495,000",
        image: "/images/original/prime-tower-penthouse-terraza-1-scaled.webp"
    }
];

export default function TypologySelector() {
    const [selected, setSelected] = useState(typologies[0]);

    return (
        <div className="bg-white border border-slate-100 rounded-sm shadow-sm overflow-hidden">
            <div className="flex border-b border-slate-100 overflow-x-auto hide-scrollbar">
                {typologies.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setSelected(t)}
                        className={`flex-1 min-w-[120px] py-6 text-xs uppercase tracking-widest font-bold transition-all ${selected.id === t.id ? 'bg-primary text-white' : 'bg-white text-slate-400 hover:text-primary'}`}
                    >
                        {t.name}
                    </button>
                ))}
            </div>

            <div className="p-8 md:p-12">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selected.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="grid md:grid-cols-2 gap-12 items-center"
                    >
                        {/* 1. Interior / Floorplan Image (First) */}
                        <div className="relative aspect-[4/3] md:aspect-square bg-slate-50 border border-slate-100 flex items-center justify-center rounded-sm overflow-hidden group shadow-lg">
                            <Image
                                src={selected.image}
                                alt={`Interior de ${selected.name}`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm border border-slate-200 text-[10px] font-bold uppercase rounded-full shadow-sm text-primary">
                                Diseño Interior
                            </div>
                        </div>

                        {/* 2. Details & Specs (Second) */}
                        <div className="space-y-8">
                            <div>
                                <span className="text-secondary text-xs uppercase tracking-widest font-bold mb-2 block">{selected.level}</span>
                                <h3 className="font-playfair text-4xl text-primary">{selected.name}</h3>
                            </div>

                            <div className="grid grid-cols-3 gap-4 border-y border-slate-100 py-6">
                                <div className="flex flex-col items-center gap-2">
                                    <Bed className="w-5 h-5 text-slate-400" />
                                    <span className="text-xs font-bold text-primary text-center">{selected.beds} Hab.</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 border-x border-slate-100">
                                    <Bath className="w-5 h-5 text-slate-400" />
                                    <span className="text-xs font-bold text-primary text-center">{selected.baths} Baños</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <Square className="w-5 h-5 text-slate-400" />
                                    <span className="text-xs font-bold text-primary text-center">{selected.sqm} m²</span>
                                </div>
                            </div>

                            <p className="text-slate-500 font-light leading-relaxed">
                                {selected.desc}
                            </p>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Rango de precio</p>
                                    <p className="text-2xl font-playfair text-primary font-bold">Desde ${selected.price}</p>
                                </div>
                                <button className="px-6 py-4 md:px-8 bg-secondary text-white text-[10px] md:text-xs uppercase tracking-widest font-bold rounded-sm hover:scale-105 transition-transform flex items-center gap-2 shadow-lg">
                                    Cotizar Unidad <ChevronRight className="w-4 h-4 hidden sm:block" />
                                </button>
                            </div>
                        </div>

                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
