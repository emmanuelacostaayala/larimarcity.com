"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, ShieldCheck, DollarSign, ArrowRight, PieChart, Landmark } from "lucide-react";

const investmentReasons = [
    {
        title: "Seguridad Jurídica",
        desc: "Bajo la ley de Fideicomiso y el respaldo de la fiduciaria La Nacional, tu inversión está garantizada por un marco legal sólido.",
        icon: <ShieldCheck className="w-8 h-8 text-gold" />,
        link: "/por-que-invertir"
    },
    {
        title: "Beneficios CONFOTUR",
        desc: "Exención del 3% del impuesto de transferencia y 1% del IPI durante 15 años. Rentabilidad bruta optimizada desde el primer día.",
        icon: <Landmark className="w-8 h-8 text-gold" />,
        link: "/comprar-propiedad-en-punta-cana"
    },
    {
        title: "Plusvalía Garantizada",
        desc: "Ubicación estratégica en el Farallón de Verón, una zona en pleno desarrollo con proyecciones de apreciación superiores al 15% anual.",
        icon: <TrendingUp className="w-8 h-8 text-gold" />,
        link: "/por-que-invertir"
    },
    {
        title: "Renta Vacacional",
        desc: "Gestión integral de propiedades para maximizar tu retorno a través de alquileres de corta estancia en el destino #1 del Caribe.",
        icon: <PieChart className="w-8 h-8 text-gold" />,
        link: "/inversion-en-alquiler-vacacional-en-punta-cana"
    }
];

export default function InversionHubPage() {
    return (
        <div className="bg-[#0a101f] min-h-screen text-white">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/images/original/prime-towers-noche-larimar-city-1024x576.webp"
                    alt="Inversión Larimar City"
                    fill
                    className="object-cover opacity-40"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a101f]/80 to-[#0a101f]" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="font-playfair text-5xl md:text-7xl text-white mb-6">Inversión <span className="text-gold italic">Inteligente</span></h1>
                        <p className="text-white/60 max-w-2xl mx-auto uppercase tracking-widest text-sm">El futuro inmobiliario del Caribe construido sobre pilares de rentabilidad y seguridad</p>
                    </motion.div>
                </div>
            </section>

            {/* Main Grid */}
            <section className="py-24 container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {investmentReasons.map((reason, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-[#121c30] border border-white/5 p-12 hover:border-gold/30 transition-all group"
                        >
                            <div className="mb-8 p-4 bg-gold/5 inline-block group-hover:bg-gold/10 transition-colors">
                                {reason.icon}
                            </div>
                            <h3 className="font-playfair text-3xl mb-4 text-white group-hover:text-gold transition-colors">{reason.title}</h3>
                            <p className="text-white/60 leading-relaxed mb-8 font-light">{reason.desc}</p>
                            <Link
                                href={reason.link}
                                className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-bold group-hover:text-white transition-colors"
                            >
                                Más detalles <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Conversion Banner */}
            <section className="py-24 bg-gold/5 border-y border-gold/10 overflow-hidden relative">
                <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
                    <h2 className="font-playfair text-4xl mb-8">¿Listo para diversificar tu <span className="text-gold italic">portafolio</span>?</h2>
                    <p className="text-white/70 text-lg mb-12 font-light">
                        Nuestros especialistas financieros te ayudarán a seleccionar la unidad que mejor se adapte a tus objetivos de ROI.
                    </p>
                    <Link
                        href="/contacto"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-gold text-[#0a101f] hover:bg-white transition-colors uppercase tracking-widest text-xs font-bold"
                    >
                        Hablar con un consultor <DollarSign className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
