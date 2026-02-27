"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { motion, useScroll, useTransform } from "framer-motion";
import { Coffee, Music, ShoppingBag, Waves, Utensils, HeartPulse, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useLocale } from "next-intl";

export default function AmenidadesPage() {
    const locale = useLocale();
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
                        src="/images/original/render-3d-de-villas-de-lujo-min-scaled.webp" // Beach Club Vibe
                        alt="Amenidades Exclusivas Larimar City"
                        fill
                        className="object-cover object-bottom"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a101f] via-[#0a101f]/70 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f] via-transparent to-transparent" />
                </motion.div>

                <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="max-w-3xl"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-12 h-[1px] bg-gold" />
                            <p className="text-gold uppercase tracking-[0.3em] text-sm font-bold">
                                {locale === 'en' ? 'Lifestyle & Leisure' : 'Lifestyle & Ocio'}
                            </p>
                        </div>

                        <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[1.1]">
                            {locale === 'en' ? (
                                <>Beyond <br /><span className="text-gold italic">Your Residence.</span></>
                            ) : (
                                <>Más Allá de <br /><span className="text-gold italic">Tu Residencia.</span></>
                            )}
                        </h1>

                        <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl leading-relaxed mb-10">
                            {locale === 'en' ? (
                                <>Enjoy authentic Caribbean luxury without leaving the city. Infinity pools, signature restaurants, a casino, and a spectacular boardwalk that borders the Punta Cana cliff.</>
                            ) : (
                                <>Disfruta del auténtico lujo caribeño sin salir de la ciudad. Piscinas infinitas, restaurantes de autor, casino y un espectacular malecón que bordea el farallón de Punta Cana.</>
                            )}
                        </p>

                        <Link
                            href="/proyectos"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-[#0a101f] hover:bg-white transition-colors uppercase tracking-widest text-sm font-semibold"
                        >
                            {locale === 'en' ? 'Discover Developments' : 'Descubrir Desarrollos'}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* The 3km Boardwalk Section */}
            <section className="py-24 bg-[#121c30] border-y border-white/5 overflow-hidden mt-12">
                <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative h-[600px] w-full"
                        >
                            <Image
                                src="/images/original/Farallon_Fase-1_larimar-city-1536x864.webp"
                                alt="El Malecón de Larimar"
                                fill
                                className="object-cover object-left rounded-sm"
                            />
                            <div className="absolute inset-0 border border-gold/10 rounded-sm" />

                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -right-6 bg-[#0a101f] p-6 border border-white/10 shadow-2xl">
                                <p className="font-playfair text-4xl text-white mb-1">3 Km</p>
                                <p className="text-gold uppercase tracking-widest text-xs font-bold">
                                    {locale === 'en' ? 'Of Panoramic Boardwalk' : 'De Paseo Panorámico'}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col gap-8"
                        >
                            <h2 className="font-playfair text-4xl md:text-5xl text-white">
                                {locale === 'en' ? (
                                    <>The Panoramic <br /><span className="text-gold italic">Boardwalk.</span></>
                                ) : (
                                    <>El Malecón <br /><span className="text-gold italic">Panorámico.</span></>
                                )}
                            </h2>

                            <div className="space-y-6 text-white/70 font-light leading-relaxed">
                                <p>
                                    {locale === 'en' ? 'The social heart of Larimar City. An imposing pedestrian promenade bordering the cliff, offering uninterrupted views of all Punta Cana and the sea.' : 'El corazón social de Larimar City. Un imponente paseo peatonal bordeando el borde del farallón, ofreciendo vistas ininterrumpidas de todo Punta Cana y el mar.'}
                                </p>

                                <ul className="flex flex-col gap-6 mt-8">
                                    {[
                                        { icon: <Utensils />, title: locale === 'en' ? "Gastronomy" : "Gastronomía", text: locale === 'en' ? "Terraces, cafes, and signature restaurants Amanalú and Origen along the route." : "Terrazas, cafés y restaurantes Amanalú y Origen a lo largo del recorrido." },
                                        { icon: <Music />, title: locale === 'en' ? "Nightlife" : "Vida Nocturna", text: locale === 'en' ? "Bars, live music, and the city's Casino." : "Bares, música en vivo y el Casino de la ciudad." },
                                        { icon: <ShoppingBag />, title: "Boutiques", text: locale === 'en' ? "Exclusive stores and international design brands." : "Tiendas exclusivas y marcas de diseño internacional." }
                                    ].map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center shrink-0 text-gold">
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

            {/* Beach Club & Wellness Bento Box */}
            <section className="py-24 bg-[#0a101f] mt-16">
                <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <h2 className="font-playfair text-4xl text-white mb-4">
                            {locale === 'en' ? 'Beach Club & Wellness Experience' : 'Experiencia Beach Club & Wellness'}
                        </h2>
                        <p className="text-white/60 font-light">
                            {locale === 'en' ? 'Artificial white sand beaches, infinity pools, and fitness centers designed for absolute well-being.' : 'Playas artificiales de arenas blancas, piscinas infinitas y centros de acondicionamiento físico diseñados para el bienestar absoluto.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[800px] md:h-[600px]">

                        {/* Left Column - Large Beach Club */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative h-full group overflow-hidden border border-white/5"
                        >
                            <Image
                                src="/images/original/vista-atardecer-apartamentos-punta-cana.webp" // Beach pool vibe
                                alt="Beach Club Larimar City"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f] via-[#0a101f]/20 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 p-10">
                                <Waves className="w-10 h-10 text-gold mb-4" />
                                <h3 className="font-playfair text-4xl text-white mb-2">Beach Club</h3>
                                <p className="text-white/80 font-light max-w-sm">
                                    {locale === 'en' ? 'Treated pool complex recreating pristine sand beaches and crystal-clear waters, with premium cabana service.' : 'Complejo de piscinas tratadas recreando playas de arena virgen y aguas cristalinas, con servicio premium de cabañas.'}
                                </p>
                            </div>
                        </motion.div>

                        {/* Right Column - Split Rows */}
                        <div className="grid grid-rows-2 gap-4 h-full">
                            {/* Top Right - Wellness */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="relative h-full group overflow-hidden border border-white/5"
                            >
                                <Image
                                    src="/images/original/amenities-golf.webp" // Replace with actual wellness/sports if available
                                    alt="Wellness & Fitness"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-[#0a101f]/60 group-hover:bg-[#0a101f]/30 transition-colors" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                                    <HeartPulse className="w-10 h-10 text-gold mb-4" />
                                    <h3 className="font-playfair text-3xl text-white mb-2">Wellness & Health</h3>
                                    <p className="text-white/70 font-light text-sm">
                                        {locale === 'en' ? 'State-of-the-art gyms, aesthetic clinics, and spa.' : 'Gimnasios de última generación, clínicas de estética y spa.'}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Bottom Right - Social/Gastronomy */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="relative h-full group overflow-hidden border border-white/5"
                            >
                                <Image
                                    src="/images/original/amenities-malecon.webp"
                                    alt="Club Privado"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700 blur-[2px] group-hover:blur-none"
                                />
                                <div className="absolute inset-0 bg-[#0a101f]/70" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                                    <Coffee className="w-10 h-10 text-gold mb-4" />
                                    <h3 className="font-playfair text-3xl text-white mb-2">Country Club</h3>
                                    <p className="text-white/70 font-light text-sm">
                                        {locale === 'en' ? 'The center of social life for residents. Lounge bar, terraces, and private rooms.' : 'El centro de vida social para residentes. Bar lounge, terrazas y salones privados.'}
                                    </p>

                                    <Link href="/golf-y-country-club" className="mt-6 text-gold text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:text-white transition-colors">
                                        {locale === 'en' ? 'View Golf Club' : 'Ver Club de Golf'}
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
