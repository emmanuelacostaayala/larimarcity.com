"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bed, Bath, Square, ChevronRight } from "lucide-react";

const typologies = [
    {
        id: "suite",
        name: "Master Suite",
        level: "Nivel 2-8",
        beds: 1,
        baths: 1,
        sqm: 75,
        desc: "Unidad optimizada para el alquiler vacacional de alta rentabilidad. Vistas al jardín central.",
        price: "155,000"
    },
    {
        id: "family",
        name: "Family Residence",
        level: "Nivel 3-10",
        beds: 2,
        baths: 2,
        sqm: 125,
        desc: "Espacio amplio con balcón perimetral y cocina integrada. Ideal para familias o estancias largas.",
        price: "245,000"
    },
    {
        id: "penthouse",
        name: "Sky Penthouse",
        level: "Nivel 11-12",
        beds: 3,
        baths: 3.5,
        sqm: 210,
        desc: "El lujo máximo. Solárium privado, jacuzzi y vistas ininterrumpidas de 180 grados al Caribe.",
        price: "495,000"
    }
];

export default function TypologySelector() {
    const [selected, setSelected] = useState(typologies[0]);

    return (
        <div className="bg-white border border-slate-100 rounded-sm shadow-sm overflow-hidden">
            <div className="flex border-b border-slate-100">
                {typologies.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setSelected(t)}
                        className={`flex-1 py-6 text-xs uppercase tracking-widest font-bold transition-all ${selected.id === t.id ? 'bg-primary text-white' : 'bg-white text-slate-400 hover:text-primary'}`}
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
                        <div className="space-y-8">
                            <div>
                                <span className="text-secondary text-xs uppercase tracking-widest font-bold mb-2 block">{selected.level}</span>
                                <h3 className="font-playfair text-4xl text-primary">{selected.name}</h3>
                            </div>

                            <div className="grid grid-cols-3 gap-4 border-y border-slate-100 py-6">
                                <div className="flex flex-col items-center gap-2">
                                    <Bed className="w-5 h-5 text-slate-400" />
                                    <span className="text-xs font-bold text-primary">{selected.beds} Hab.</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 border-x border-slate-100">
                                    <Bath className="w-5 h-5 text-slate-400" />
                                    <span className="text-xs font-bold text-primary">{selected.baths} Baños</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <Square className="w-5 h-5 text-slate-400" />
                                    <span className="text-xs font-bold text-primary">{selected.sqm} m²</span>
                                </div>
                            </div>

                            <p className="text-slate-500 font-light leading-relaxed">
                                {selected.desc}
                            </p>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Inversión desde</p>
                                    <p className="text-2xl font-playfair text-primary font-bold">USD ${selected.price}</p>
                                </div>
                                <button className="px-8 py-4 bg-secondary text-white text-xs uppercase tracking-widest font-bold rounded-sm hover:scale-105 transition-transform flex items-center gap-2">
                                    Reservar Unidad <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="relative aspect-square bg-slate-50 border border-slate-100 flex items-center justify-center rounded-sm overflow-hidden">
                            {/* This would be an SVG plan or image of the floorplan */}
                            <div className="text-center p-8 opacity-40">
                                <div className="w-48 h-64 border-2 border-dashed border-primary/20 relative mx-auto mb-4">
                                    <div className="absolute top-4 left-4 w-20 h-20 bg-primary/5 border border-primary/10" />
                                    <div className="absolute bottom-4 right-4 w-12 h-12 bg-secondary/10 border border-secondary/20" />
                                </div>
                                <p className="text-[10px] uppercase tracking-[0.2em] font-bold">Floorplan Rendering</p>
                            </div>
                            <div className="absolute top-4 right-4 px-3 py-1 bg-white border border-slate-200 text-[10px] font-bold uppercase rounded-full">
                                Plano HQ Disponible
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
