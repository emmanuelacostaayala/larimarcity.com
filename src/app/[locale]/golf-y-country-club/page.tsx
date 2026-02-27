"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { motion, useScroll, useTransform } from "framer-motion";
import { Coffee, Flag, Map, ArrowRight, Sun, Award } from "lucide-react";
import { useRef } from "react";
import { useLocale } from "next-intl";

const content = {
    es: {
        heroBadge: "18 Hoyos Par 72",
        heroTitle_1: "Tu Jardín es",
        heroTitle_2: "El Campo de Golf.",
        heroDesc: "Vivir en Larimar City significa despertar rodeado de fairways inmaculados. Nuestro campo de golf de 18 hoyos se integra perfectamente con el entorno natural del Farallón, creando una experiencia deportiva de clase mundial.",
        ctaHero: "Ver Villas Fase I",
        highlights: [
            {
                title: "18 Hoyos Exclusivos",
                desc: "Diseño desafiante que aprovecha las elevaciones naturales del farallón, proporcionando vistas al mar Caribe desde múltiples tees."
            },
            {
                title: "Torneos & Academia",
                desc: "Clínicas de golf profesionales, torneos para residentes e invitados, y áreas de práctica (Driving Range y Putting Green)."
            },
            {
                title: "Residencias Front-Line",
                desc: "Nuestras exclusivas Villas Golf Fase I ofrecen acceso directo al campo y vistas panorámicas a los greenes."
            }
        ],
        clubBadge: "Hoyo 19",
        clubBadgeSub: "Bar & Lounge",
        clubTitle_1: "El Centro de",
        clubTitle_2: "Vida Social.",
        clubDesc: "El Country Club es el epicentro de la comunidad Larimar. Más que un club de golf, es el espacio de networking, celebración y relajación para toda la familia.",
        clubFeatures: [
            { title: "Casa Club de Lujo", text: "Terrazas panorámicas, Pro-Shop completo y lockers privados para socios." },
            { title: "Restaurante Origen", text: "Gastronomía mediterránea e internacional con vistas al hoyo 18 y el mar." },
        ],
        ctaOutroTitle: "Residencias en el Campo de Golf",
        ctaOutroDesc: "Las propiedades colindantes a campos de golf en Punta Cana mantienen las tasas de plusvalía y ocupación más altas del mercado inmobiliario dominicano.",
        ctaOutroBtn: "Solicitar Memoria Visual Villas"
    },
    en: {
        heroBadge: "18 Holes Par 72",
        heroTitle_1: "Your Garden is",
        heroTitle_2: "The Golf Course.",
        heroDesc: "Living in Larimar City means waking up surrounded by immaculate fairways. Our 18-hole golf course integrates perfectly with the natural environment of the Farallón, creating a world-class sporting experience.",
        ctaHero: "View Phase I Villas",
        highlights: [
            {
                title: "18 Exclusive Holes",
                desc: "Challenging design that takes advantage of the natural elevations of the cliff, providing views of the Caribbean Sea from multiple tees."
            },
            {
                title: "Tournaments & Academy",
                desc: "Professional golf clinics, tournaments for residents and guests, and practice areas (Driving Range and Putting Green)."
            },
            {
                title: "Front-Line Residences",
                desc: "Our exclusive Phase I Golf Villas offer direct access to the course and panoramic views of the greens."
            }
        ],
        clubBadge: "19th Hole",
        clubBadgeSub: "Bar & Lounge",
        clubTitle_1: "The Center of",
        clubTitle_2: "Social Life.",
        clubDesc: "The Country Club is the epicenter of the Larimar community. More than a golf club, it is the space for networking, celebration, and relaxation for the whole family.",
        clubFeatures: [
            { title: "Luxury Clubhouse", text: "Panoramic terraces, full Pro-Shop, and private lockers for members." },
            { title: "Origen Restaurant", text: "Mediterranean and international gastronomy overlooking the 18th hole and the sea." },
        ],
        ctaOutroTitle: "Residences on the Golf Course",
        ctaOutroDesc: "Properties adjacent to golf courses in Punta Cana maintain the highest appreciation and occupancy rates in the Dominican real estate market.",
        ctaOutroBtn: "Request Visual Memory Villas"
    }
};

export default function GolfCountryClubPage() {
    const locale = useLocale();
    const t = locale === 'en' ? content.en : content.es;

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <div className="bg-[#0a101f] min-h-screen text-white" ref={containerRef}>

            {/* Editorial Hero */}
            <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
                <motion.div
                    style={{ y: yHero }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src="/images/original/Apartamentos-Golf_12.webp"
                        alt="Larimar City Golf & Country Club"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a101f] via-[#0a101f]/70 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f] via-transparent to-transparent" />
                </motion.div>

                <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-32 lg:pt-40">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="max-w-3xl"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-12 h-[1px] bg-[#4FB0C6]" />
                            <p className="text-[#4FB0C6] uppercase tracking-[0.3em] text-sm font-bold">
                                {t.heroBadge}
                            </p>
                        </div>

                        <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[1.1]">
                            {t.heroTitle_1} <br />
                            <span className="text-gold italic">{t.heroTitle_2}</span>
                        </h1>

                        <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl leading-relaxed mb-10">
                            {t.heroDesc}
                        </p>

                        <Link
                            href="/villas"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-[#0a101f] hover:bg-white transition-colors uppercase tracking-widest text-sm font-semibold"
                        >
                            {t.ctaHero}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Course Highlights */}
            <section className="py-24 bg-[#0a101f] relative z-20 mt-12">
                <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        {[
                            {
                                icon: <Flag className="w-8 h-8" />,
                                ...t.highlights[0]
                            },
                            {
                                icon: <Award className="w-8 h-8" />,
                                ...t.highlights[1]
                            },
                            {
                                icon: <Map className="w-8 h-8" />,
                                ...t.highlights[2]
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-[#121c30] p-10 border border-white/5 hover:border-gold/30 transition-colors group"
                            >
                                <div className="text-gold mb-6 group-hover:scale-110 transition-transform origin-left">{item.icon}</div>
                                <h3 className="font-playfair text-2xl text-white mb-4">{item.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Country Club Experience */}
            <section className="py-24 bg-[#121c30] border-y border-white/5 mt-16">
                <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative h-[600px] w-full"
                        >
                            <Image
                                src="/images/original/villa-larimar-city-lujo.webp"
                                alt="Country Club Larimar City"
                                fill
                                className="object-cover object-center border border-white/10"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#121c30] to-transparent" />

                            <div className="absolute bottom-10 left-10 bg-[#0a101f]/90 backdrop-blur-md border border-gold/30 p-6 flex flex-col items-center">
                                <Coffee className="w-10 h-10 text-gold mb-2" />
                                <p className="text-white font-playfair text-xl">{t.clubBadge}</p>
                                <p className="text-white/60 text-xs uppercase tracking-widest">{t.clubBadgeSub}</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col gap-8"
                        >
                            <h2 className="font-playfair text-4xl md:text-5xl text-white">
                                {t.clubTitle_1} <br />
                                <span className="text-gold italic">{t.clubTitle_2}</span>
                            </h2>

                            <div className="space-y-6 text-white/70 font-light leading-relaxed">
                                <p>
                                    {t.clubDesc}
                                </p>

                                <ul className="flex flex-col gap-6 mt-8">
                                    {[
                                        { icon: <Coffee />, ...t.clubFeatures[0] },
                                        { icon: <Sun />, ...t.clubFeatures[1] },
                                    ].map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-4">
                                            <div className="mt-1 w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center shrink-0 text-gold">
                                                {feature.icon}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                                                <p className="text-sm">{feature.text}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Call to Action Callout */}
            <section className="py-32 relative text-center">
                <div className="container mx-auto px-4 relative z-10 max-w-3xl">
                    <h2 className="font-playfair text-4xl text-white mb-6">{t.ctaOutroTitle}</h2>
                    <p className="text-white/70 mb-10 font-light">{t.ctaOutroDesc}</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="/contacto"
                            className="px-10 py-5 bg-gold text-[#0a101f] hover:bg-white transition-colors uppercase tracking-widest text-sm font-semibold inline-block"
                        >
                            {t.ctaOutroBtn}
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}
