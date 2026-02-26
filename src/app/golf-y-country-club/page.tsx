"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Coffee, Flag, Map, ArrowRight, Sun, Award } from "lucide-react";
import { useRef } from "react";

export default function GolfCountryClubPage() {
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
                        src="/images/original/amenities-golf.webp"
                        alt="Larimar City Golf & Country Club"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a101f] via-[#0a101f]/70 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f] via-transparent to-transparent" />
                </motion.div>

                <div className="container mx-auto px-4 relative z-10 pt-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="max-w-3xl"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-12 h-[1px] bg-[#4FB0C6]" />
                            <p className="text-[#4FB0C6] uppercase tracking-[0.3em] text-sm font-bold">
                                18 Hoyos Par 72
                            </p>
                        </div>

                        <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[1.1]">
                            Tu Jardín es <br />
                            <span className="text-gold italic">El Campo de Golf.</span>
                        </h1>

                        <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl leading-relaxed mb-10">
                            Vivir en Larimar City significa despertar rodeado de fairways inmaculados. Nuestro campo de golf de 18 hoyos se integra perfectamente con el entorno natural del Farallón, creando una experiencia deportiva de clase mundial.
                        </p>

                        <Link
                            href="/villas"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-[#0a101f] hover:bg-white transition-colors uppercase tracking-widest text-sm font-semibold"
                        >
                            Ver Villas Fase I
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Course Highlights */}
            <section className="py-24 bg-[#0a101f] relative z-20 -mt-10">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        {[
                            {
                                icon: <Flag className="w-8 h-8" />,
                                title: "18 Hoyos Exclusivos",
                                desc: "Diseño desafiante que aprovecha las elevaciones naturales del farallón, proporcionando vistas al mar Caribe desde múltiples tees."
                            },
                            {
                                icon: <Award className="w-8 h-8" />,
                                title: "Torneos & Academia",
                                desc: "Clínicas de golf profesionales, torneos para residentes e invitados, y áreas de práctica (Driving Range y Putting Green)."
                            },
                            {
                                icon: <Map className="w-8 h-8" />,
                                title: "Residencias Front-Line",
                                desc: "Nuestras exclusivas Villas Golf Fase I ofrecen acceso directo al campo y vistas panorámicas a los greenes."
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
            <section className="py-24 bg-[#121c30] border-y border-white/5">
                <div className="container mx-auto px-4 max-w-7xl">
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

                            {/* Floating Badge */}
                            <div className="absolute bottom-10 left-10 bg-[#0a101f]/90 backdrop-blur-md border border-gold/30 p-6 flex flex-col items-center">
                                <Coffee className="w-10 h-10 text-gold mb-2" />
                                <p className="text-white font-playfair text-xl">Hoyo 19</p>
                                <p className="text-white/60 text-xs uppercase tracking-widest">Bar & Lounge</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col gap-8"
                        >
                            <h2 className="font-playfair text-4xl md:text-5xl text-white">
                                El Centro de <br />
                                <span className="text-gold italic">Vida Social.</span>
                            </h2>

                            <div className="space-y-6 text-white/70 font-light leading-relaxed">
                                <p>
                                    El Country Club es el epicentro de la comunidad Larimar. Más que un club de golf, es el espacio de networking, celebración y relajación para toda la familia.
                                </p>

                                <ul className="flex flex-col gap-6 mt-8">
                                    {[
                                        { icon: <Coffee />, title: "Casa Club de Lujo", text: "Terrazas panorámicas, Pro-Shop completo y lockers privados para socios." },
                                        { icon: <Sun />, title: "Restaurante Origen", text: "Gastronomía mediterránea e internacional con vistas al hoyo 18 y el mar." },
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
                    <h2 className="font-playfair text-4xl text-white mb-6">Residencias en el Campo de Golf</h2>
                    <p className="text-white/70 mb-10 font-light">Las propiedades colindantes a campos de golf en Punta Cana mantienen las tasas de plusvalía y ocupación más altas del mercado inmobiliario dominicano.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="/contacto"
                            className="px-10 py-5 bg-gold text-[#0a101f] hover:bg-white transition-colors uppercase tracking-widest text-sm font-semibold inline-block"
                        >
                            Solicitar Memoria Visual Villas
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}
