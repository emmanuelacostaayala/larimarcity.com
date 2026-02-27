"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ArrowRight, Building2, MapPin } from "lucide-react";
import { useLocale } from "next-intl";

const options = {
    es: [
        {
            title: "Villas Golf",
            desc: "Residencias de ultra-lujo en primera línea de campo de golf. Privacidad absoluta y espacios abiertos integrados con la naturaleza.",
            image: "/images/original/render-3d-de-villas-de-lujo-min-scaled.webp",
            link: "/villas-golf"
        },
        {
            title: "Townhouses",
            desc: "El equilibrio perfecto entre modernidad y confort. Diseños contemporáneos pensados para la familia en el corazón de la ciudad.",
            image: "/images/original/villas-larimar-city-lujo.webp",
            link: "/townhouses"
        }
    ],
    en: [
        {
            title: "Golf Villas",
            desc: "Ultra-luxury residences on the front line of the golf course. Absolute privacy and open spaces integrated with nature.",
            image: "/images/original/render-3d-de-villas-de-lujo-min-scaled.webp",
            link: "/villas-golf"
        },
        {
            title: "Townhouses",
            desc: "The perfect balance between modernity and comfort. Contemporary designs for the family in the heart of the city.",
            image: "/images/original/villas-larimar-city-lujo.webp",
            link: "/townhouses"
        }
    ]
};

export default function VillasHubPage() {
    const locale = useLocale();
    const currentOptions = locale === 'en' ? options.en : options.es;
    return (
        <div className="bg-[#0a101f] min-h-screen text-white pt-20">
            {/* Hero */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <Image src="/images/original/amenities-golf.webp" alt="Villas & Townhouses" fill className="object-cover opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a101f]/80 to-[#0a101f]" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-playfair text-6xl md:text-8xl mb-4 text-white">
                        Villas & <span className="text-secondary italic">Townhouses</span>
                    </motion.h1>
                    <p className="text-white/40 uppercase tracking-[0.4em] text-sm">
                        {locale === 'en' ? 'Architecture that defines your lifestyle' : 'Arquitectura que define tu estilo de vida'}
                    </p>
                </div>
            </section>

            {/* Grid */}
            <section className="py-24 container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {currentOptions.map((opt, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="group relative h-[600px] overflow-hidden border border-white/5"
                        >
                            <Image src={opt.image} alt={opt.title} fill className="object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f] via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 p-12 w-full">
                                <h3 className="font-playfair text-4xl mb-4 text-white group-hover:text-secondary transition-colors">{opt.title}</h3>
                                <p className="text-white/60 mb-8 max-w-md font-light">
                                    {opt.desc}
                                </p>
                                <Link
                                    href={opt.link}
                                    className="inline-flex items-center gap-2 text-secondary text-xs uppercase tracking-widest font-bold border-b border-secondary/30 pb-2 hover:border-secondary transition-all"
                                >
                                    {locale === 'en' ? 'View Project Details' : 'Ver Detalles Proyecto'} <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
