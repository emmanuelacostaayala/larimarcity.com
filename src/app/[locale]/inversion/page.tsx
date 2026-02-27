"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { TrendingUp, ShieldCheck, DollarSign, ArrowRight, PieChart, Landmark } from "lucide-react";
import { useLocale } from "next-intl";

const content = {
    es: {
        heroTitle_1: "Inversión",
        heroTitle_2: "Inteligente",
        heroDesc: "El futuro inmobiliario del Caribe construido sobre pilares de rentabilidad y seguridad",
        reasons: [
            {
                title: "Seguridad Jurídica",
                desc: "Bajo la ley de Fideicomiso y el respaldo de la fiduciaria La Nacional, tu inversión está garantizada por un marco legal sólido.",
                link: "/por-que-invertir"
            },
            {
                title: "Beneficios CONFOTUR",
                desc: "Exención del 3% del impuesto de transferencia y 1% del IPI durante 15 años. Rentabilidad bruta optimizada desde el primer día.",
                link: "/comprar-propiedad-en-punta-cana"
            },
            {
                title: "Plusvalía Garantizada",
                desc: "Ubicación estratégica en el Farallón de Verón, una zona en pleno desarrollo con proyecciones de apreciación superiores al 15% anual.",
                link: "/por-que-invertir"
            },
            {
                title: "Renta Vacacional",
                desc: "Gestión integral de propiedades para maximizar tu retorno a través de alquileres de corta estancia en el destino #1 del Caribe.",
                link: "/inversion-en-alquiler-vacacional-en-punta-cana"
            }
        ],
        detailsBtn: "Más detalles",
        ctaTitle_1: "¿Listo para diversificar tu",
        ctaTitle_2: "portafolio",
        ctaDesc: "Nuestros especialistas financieros te ayudarán a seleccionar la unidad que mejor se adapte a tus objetivos de ROI.",
        ctaBtn: "Hablar con un consultor"
    },
    en: {
        heroTitle_1: "Smart",
        heroTitle_2: "Investment",
        heroDesc: "The future of Caribbean real estate built on pillars of profitability and security",
        reasons: [
            {
                title: "Legal Security",
                desc: "Under the Trust law and backed by La Nacional fiduciary, your investment is guaranteed by a solid legal framework.",
                link: "/por-que-invertir"
            },
            {
                title: "CONFOTUR Benefits",
                desc: "Exemption from the 3% transfer tax and 1% of the IPI for 15 years. Optimized gross profitability from day one.",
                link: "/comprar-propiedad-en-punta-cana"
            },
            {
                title: "Guaranteed Appreciation",
                desc: "Strategic location in the Farallón of Verón, a rapidly developing area with appreciation projections exceeding 15% annually.",
                link: "/por-que-invertir"
            },
            {
                title: "Vacation Rental",
                desc: "Comprehensive property management to maximize your return through short-term rentals in the Caribbean's #1 destination.",
                link: "/inversion-en-alquiler-vacacional-en-punta-cana"
            }
        ],
        detailsBtn: "More details",
        ctaTitle_1: "Ready to diversify your",
        ctaTitle_2: "portfolio",
        ctaDesc: "Our financial specialists will help you select the unit that best suits your ROI goals.",
        ctaBtn: "Speak with a consultant"
    }
};

export default function InversionHubPage() {
    const locale = useLocale();
    const t = locale === 'en' ? content.en : content.es;

    return (
        <div className="bg-[#0a101f] min-h-screen text-white">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/images/original/prime-towers-noche-larimar-city.webp"
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
                        <h1 className="font-playfair text-5xl md:text-7xl text-white mb-6">{t.heroTitle_1} <span className="text-gold italic">{t.heroTitle_2}</span></h1>
                        <p className="text-white/60 max-w-2xl mx-auto uppercase tracking-widest text-sm">{t.heroDesc}</p>
                    </motion.div>
                </div>
            </section>

            {/* Main Grid */}
            <section className="py-24 container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        { icon: <ShieldCheck className="w-8 h-8 text-gold" />, ...t.reasons[0] },
                        { icon: <Landmark className="w-8 h-8 text-gold" />, ...t.reasons[1] },
                        { icon: <TrendingUp className="w-8 h-8 text-gold" />, ...t.reasons[2] },
                        { icon: <PieChart className="w-8 h-8 text-gold" />, ...t.reasons[3] },
                    ].map((reason, idx) => (
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
                                href={`/${locale}${reason.link}`}
                                className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-bold group-hover:text-white transition-colors"
                            >
                                {t.detailsBtn} <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Conversion Banner */}
            <section className="py-24 bg-gold/5 border-y border-gold/10 overflow-hidden relative">
                <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
                    <h2 className="font-playfair text-4xl mb-8">{t.ctaTitle_1} <span className="text-gold italic">{t.ctaTitle_2}</span>?</h2>
                    <p className="text-white/70 text-lg mb-12 font-light">
                        {t.ctaDesc}
                    </p>
                    <Link
                        href={`/${locale}/contacto`}
                        className="inline-flex items-center gap-3 px-10 py-5 bg-gold text-[#0a101f] hover:bg-white transition-colors uppercase tracking-widest text-xs font-bold"
                    >
                        {t.ctaBtn} <DollarSign className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
