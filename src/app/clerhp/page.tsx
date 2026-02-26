"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Globe2, ShieldCheck, TrendingUp } from "lucide-react";
import StockWidget from "@/components/StockWidget";

export default function ClerhpCorporatePage() {
    return (
        <div className="bg-[#0a101f] min-h-screen">

            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/images/original/prime-tower-penthouse-terraza-2-scaled.webp" // Premium corporate background
                    alt="CLERHP Estructuras Edificaciones"
                    fill
                    className="object-cover object-center opacity-40"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a101f]/80 via-[#0a101f]/60 to-[#0a101f]" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-gold uppercase tracking-[0.3em] text-sm font-bold mb-6">
                            Respaldo Corporativo Internacional
                        </p>
                        <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white mb-6">
                            Grupo <span className="text-gold italic">CLERHP</span>
                        </h1>
                        <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
                            Multinacional española cotizada en bolsa, líder en ingeniería y construcción.
                            El motor financiero y técnico detrás del desarrollo de Larimar City & Resort.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content & Stock Widget */}
            <section className="py-24 container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-8"
                    >
                        <div>
                            <h2 className="font-playfair text-4xl text-white mb-6">
                                Ingeniería Española, <br />
                                <span className="text-gold italic">Proyección Global.</span>
                            </h2>
                            <p className="text-white/70 text-lg leading-relaxed mb-6 font-light">
                                CLERHP Estructuras S.A. es una corporación consolidada con sede en España y operaciones a lo largo de América Latina. Nuestra solvencia técnica y financiera nos ha posicionado como referentes en la ejecución de megaproyectos estructurales.
                            </p>
                            <p className="text-white/70 text-lg leading-relaxed font-light">
                                Al invertir en Larimar City, estás respaldado no solo por un concepto innovador, sino por una entidad regulada que cotiza públicamente en el **BME Growth** (Mercado Alternativo Bursátil Español), ofreciendo los más altos estándares de transparencia y cumplimiento europeo a nuestros inversores internacionales.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mt-4">
                            <div className="bg-white/5 border border-white/10 p-6">
                                <Globe2 className="w-8 h-8 text-gold mb-4" />
                                <h4 className="text-white font-bold mb-2">Presencia Global</h4>
                                <p className="text-white/50 text-sm">Oficinas operativas en España, República Dominicana, Paraguay y Bolivia.</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-6">
                                <ShieldCheck className="w-8 h-8 text-gold mb-4" />
                                <h4 className="text-white font-bold mb-2">Transparencia</h4>
                                <p className="text-white/50 text-sm">Empresa auditada y cotizada públicamente con el ticker CLR.</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* The Stock Widget Developed Based on User Specs */}
                        <div className="relative z-10 shadow-2xl shadow-gold/10">
                            <StockWidget />
                        </div>

                        {/* Decorative background glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gold/5 blur-[100px] rounded-full pointer-events-none z-0" />
                    </motion.div>

                </div>
            </section>

            {/* Offices / Footprint Section */}
            <section className="py-24 bg-[#121c30]">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="font-playfair text-4xl text-white mb-4">Nuestras Oficinas</h2>
                        <p className="text-white/60">Una red internacional al servicio de tu inversión.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { city: "Murcia, España", desc: "Sede Central Corporativa (HQ) y Relación con Inversores Europeos." },
                            { city: "Punta Cana, RD", desc: "Hub Operativo del Caribe y Dirección de Proyecto Larimar City." },
                            { city: "Santa Cruz, Bolivia", desc: "Centro de Ingeniería Estructural y Operaciones Latam Sur." }
                        ].map((office, idx) => (
                            <div key={idx} className="bg-[#0a101f] border border-white/5 p-8 group hover:border-gold/30 transition-colors">
                                <Building2 className="w-8 h-8 text-gold mb-6 group-hover:scale-110 transition-transform" />
                                <h3 className="text-xl text-white font-playfair mb-3">{office.city}</h3>
                                <p className="text-white/50 text-sm leading-relaxed">{office.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Link
                            href="/contacto"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-white text-white hover:bg-white hover:text-[#0a101f] transition-colors uppercase tracking-widest text-sm font-semibold"
                        >
                            Contactar con Corporación
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}
