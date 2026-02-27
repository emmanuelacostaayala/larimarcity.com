"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Globe2, ShieldCheck, TrendingUp } from "lucide-react";
import StockWidget from "@/components/StockWidget";
import { useLocale } from "next-intl";

export default function ClerhpCorporatePage() {
    const locale = useLocale();
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
                        <p className="text-secondary uppercase tracking-[0.3em] text-sm font-bold mb-6">
                            {locale === 'en' ? 'International Corporate Backing' : 'Respaldo Corporativo Internacional'}
                        </p>
                        <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white mb-6">
                            {locale === 'en' ? 'CLERHP' : 'Grupo'} <span className="text-secondary italic">{locale === 'en' ? 'Group' : 'CLERHP'}</span>
                        </h1>
                        <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
                            {locale === 'en' ? 'Spanish publicly traded multinational, leader in engineering and construction. The financial and technical engine behind the development of Larimar City & Resort.' : 'Multinacional española cotizada en bolsa, líder en ingeniería y construcción. El motor financiero y técnico detrás del desarrollo de Larimar City & Resort.'}
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
                                {locale === 'en' ? (
                                    <>Spanish Engineering, <br /><span className="text-secondary italic">Global Projection.</span></>
                                ) : (
                                    <>Ingeniería Española, <br /><span className="text-secondary italic">Proyección Global.</span></>
                                )}
                            </h2>
                            <p className="text-white/70 text-lg leading-relaxed mb-6 font-light">
                                {locale === 'en' ? 'CLERHP Estructuras S.A. is a consolidated corporation headquartered in Spain with operations across Latin America. Our technical and financial solvency has positioned us as leaders in the execution of structural megaprojects.' : 'CLERHP Estructuras S.A. es una corporación consolidada con sede en España y operaciones a lo largo de América Latina. Nuestra solvencia técnica y financiera nos ha posicionado como referentes en la ejecución de megaproyectos estructurales.'}
                            </p>
                            <p className="text-white/70 text-lg leading-relaxed font-light">
                                {locale === 'en' ? (
                                    <>When investing in Larimar City, you are backed not only by an innovative concept but by an entity publicly traded on the <strong className="font-semibold text-white">BME Growth</strong> (Spanish Alternative Stock Market), offering the highest standards of transparency and European compliance to our international investors.</>
                                ) : (
                                    <>Al invertir en Larimar City, estás respaldado no solo por un concepto innovador, sino por una entidad regulada que cotiza públicamente en el <strong className="font-semibold text-white">BME Growth</strong> (Mercado Alternativo Bursátil Español), ofreciendo los más altos estándares de transparencia y cumplimiento europeo a nuestros inversores internacionales.</>
                                )}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mt-4">
                            <div className="bg-white/5 border border-white/10 p-6">
                                <Globe2 className="w-8 h-8 text-secondary mb-4" />
                                <h4 className="text-white font-bold mb-2">{locale === 'en' ? 'Global Presence' : 'Presencia Global'}</h4>
                                <p className="text-white/50 text-sm">{locale === 'en' ? 'Operational offices in Spain, Dominican Republic, Paraguay, and Bolivia.' : 'Oficinas operativas en España, República Dominicana, Paraguay y Bolivia.'}</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-6">
                                <ShieldCheck className="w-8 h-8 text-secondary mb-4" />
                                <h4 className="text-white font-bold mb-2">{locale === 'en' ? 'Transparency' : 'Transparencia'}</h4>
                                <p className="text-white/50 text-sm">{locale === 'en' ? 'Audited and publicly traded company with ticker CLR.' : 'Empresa auditada y cotizada públicamente con el ticker CLR.'}</p>
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
                        <div className="relative z-10 shadow-2xl shadow-secondary/10">
                            <StockWidget />
                        </div>

                        {/* Decorative background glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-secondary/5 blur-[100px] rounded-full pointer-events-none z-0" />
                    </motion.div>

                </div>
            </section>

            {/* Offices / Footprint Section */}
            <section className="py-24 bg-[#121c30]">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="font-playfair text-4xl text-white mb-4">
                            {locale === 'en' ? 'Our Offices' : 'Nuestras Oficinas'}
                        </h2>
                        <p className="text-white/60">
                            {locale === 'en' ? 'An international network at the service of your investment.' : 'Una red internacional al servicio de tu inversión.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { city: "Murcia, España", desc: locale === 'en' ? "Corporate Headquarters (HQ) and European Investor Relations." : "Sede Central Corporativa (HQ) y Relación con Inversores Europeos." },
                            { city: "Punta Cana, RD", desc: locale === 'en' ? "Caribbean Operational Hub and Larimar City Project Management." : "Hub Operativo del Caribe y Dirección de Proyecto Larimar City." },
                            { city: "Santa Cruz, Bolivia", desc: locale === 'en' ? "Structural Engineering Center and South Latam Operations." : "Centro de Ingeniería Estructural y Operaciones Latam Sur." }
                        ].map((office, idx) => (
                            <div key={idx} className="bg-[#0a101f] border border-white/5 p-8 group hover:border-secondary/30 transition-colors">
                                <Building2 className="w-8 h-8 text-secondary mb-6 group-hover:scale-110 transition-transform" />
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
                            {locale === 'en' ? 'Contact Corporation' : 'Contactar con Corporación'}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}
