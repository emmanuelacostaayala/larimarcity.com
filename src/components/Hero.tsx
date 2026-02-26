"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Calendar } from "lucide-react";

export default function Hero() {
    const blurReveal = {
        hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" }
    };

    return (
        <section className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-slate-950 -mt-20">
            {/* Cinematic Background Zoom */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/40 z-10 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent z-10" />
                <motion.img
                    animate={{ scale: [1.0, 1.1] }}
                    transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                    src="/images/original/Farallon_Fase-1_larimar-city-1536x864.webp"
                    alt="Larimar City Masterplan Ecosystem"
                    className="w-full h-full object-cover opacity-90"
                />
            </div>

            <div className="relative z-20 container mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-16">
                <motion.div
                    variants={blurReveal}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                    className="mb-6 inline-flex items-center px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md"
                >
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse mr-3" />
                    <span className="text-white tracking-[0.3em] text-xs md:text-sm font-medium uppercase">
                        La Primera Smart City del Caribe
                    </span>
                </motion.div>

                <motion.h1
                    variants={blurReveal}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                    className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 font-playfair text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8 max-w-5xl"
                >
                    Larimar City <span className="font-light italic">& Resort</span>
                </motion.h1>

                <motion.p
                    variants={blurReveal}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
                    className="text-slate-200 text-lg md:text-xl lg:text-2xl max-w-3xl mb-14 font-light leading-relaxed"
                >
                    Descubre un nuevo horizonte en Punta Cana. Un ecosistema de lujo con <strong className="font-medium text-white">22,000 propiedades</strong> para vivienda, inversión y experiencias exclusivas.
                </motion.p>

                <motion.div
                    variants={blurReveal}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
                >
                    {/* Primary Glass Button */}
                    <button className="relative overflow-hidden w-full sm:w-auto px-8 py-4 bg-white/10 border border-white/30 backdrop-blur-md text-white hover:bg-white hover:text-primary transition-all duration-500 rounded-sm font-medium flex items-center justify-center group shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)]">
                        <span className="relative z-10 flex items-center">
                            Agenda una Visita
                            <Calendar className="ml-3 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                        </span>
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
                    </button>

                    <button className="w-full sm:w-auto px-8 py-4 text-white/80 hover:text-white transition-colors duration-300 font-medium flex items-center justify-center group">
                        Descargar Brochure
                        <Download className="ml-2 w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300" />
                    </button>

                    <button className="w-full sm:w-auto px-6 py-4 text-white/80 hover:text-white transition-colors duration-300 font-medium flex items-center justify-center group">
                        Contactar Asesor
                        <ArrowRight className="ml-2 w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </button>
                </motion.div>
            </div>

            {/* Futuristic Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
            >
                <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-bold">Descubrir</span>
                <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
                    <motion.div
                        animate={{ y: ["-100%", "200%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-white to-transparent"
                    />
                </div>
            </motion.div>
        </section>
    );
}
