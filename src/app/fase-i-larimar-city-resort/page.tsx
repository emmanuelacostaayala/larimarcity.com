"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight, Building, Waves, TreePine, Map, Download } from "lucide-react";
import MasterPlanMap from "@/components/MasterPlanMap";

export default function FaseIMasterplanPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Editorial Hero with "Margen Blanco" (pt-32 to clear navbar + extra space) */}
      <section className="relative pt-32 pb-20 px-6 lg:px-12 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-12 h-[1px] bg-secondary" />
                  <p className="text-secondary uppercase tracking-[0.3em] font-bold text-xs">
                    El Comienzo del Futuro
                  </p>
                </div>
                <h1 className="font-playfair text-6xl md:text-8xl text-primary leading-tight mb-8">
                  Fase I: <br />
                  <span className="text-secondary italic">El Origen.</span>
                </h1>
              </motion.div>
            </div>
            <div className="lg:col-span-5 pb-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-slate-500 text-lg md:text-xl font-light leading-relaxed mb-8"
              >
                La consolidación del núcleo urbano de Larimar City. Un despliegue arquitectónico sin precedentes que integra 10 torres residenciales, villas de gran lujo y el primer tramo del malecón comercial.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <button className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest text-[10px] rounded-sm hover:bg-secondary transition-colors inline-flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Descargar Masterplan PDF
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image Section - Full Width Emphasis */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <Image
          src="/images/original/Farallon_Fase-1_larimar-city-1536x864.webp"
          alt="Vista Aérea Fase I"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f] via-transparent to-transparent opacity-60" />
      </section>

      {/* Interactive Map Section */}
      <section className="py-24 bg-[#0a101f] px-6 lg:px-12">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl text-white mb-4">Explora el <span className="text-gold italic">Desarrollo.</span></h2>
            <p className="text-white/50 max-w-2xl">Interactúa con el masterplan de la Fase I para descubrir la ubicación estratégica de cada proyecto y área de ocio.</p>
          </div>
          <MasterPlanMap />
        </div>
      </section>

      {/* Bento Grid Components */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Building className="w-6 h-6" />, title: "Skyline Iconográfico", desc: "10 Torres residenciales (Prime, Horizon, Breeze) diseñadas para maximizar las corrientes de aire natural." },
              { icon: <Waves className="w-6 h-6" />, title: "Beach Club", desc: "Un oasis de arenas blancas y piscinas tratadas con vistas infinitas al Mar Caribe desde el farallón." },
              { icon: <TreePine className="w-6 h-6" />, title: "Pulmón Verde", desc: "Más de 50,000 m² de áreas de esparcimiento, senderos para jogging y paisajismo tropical nativo." },
              { icon: <Map className="w-6 h-6" />, title: "Conexión 15 Min", desc: "Diseño urbano circular que permite acceder a servicios, salud y ocio en menos de 15 minutos a pie." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 border border-slate-100 bg-stone-50/50 hover:bg-stone-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-primary/5 text-primary flex items-center justify-center rounded-sm mb-8 group-hover:bg-secondary group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Integration */}
      <section className="py-24 bg-primary text-white px-6 lg:px-12 overflow-hidden relative">
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none">
          <Image src="/images/original/prime-towers-noche-larimar-city-1024x576.webp" alt="Background deco" fill className="object-cover" />
        </div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="font-playfair text-5xl font-bold mb-8">Disponibilidad <br /><span className="text-secondary">Exclusiva</span></h2>
              <p className="text-slate-300 mb-10 text-lg font-light leading-relaxed">Estamos comercializando las últimas unidades de lanzamiento de la Fase I. Una oportunidad única de adquirir activos en el corazón de la Smart City.</p>
              <div className="space-y-4 mb-12">
                {["Selección Premium de Parcelas Villas Golf", "Apartamentos 'Smart Ready' de 1 a 3 dorm.", "Penthouses con Rooftop Privado", "Locales en el Malecón Comercial"].map((li, i) => (
                  <div key={i} className="flex items-center gap-4 text-slate-200">
                    <div className="w-5 h-5 rounded-full border border-secondary flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-secondary" />
                    </div>
                    <span>{li}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Prime Towers", href: "/prime-towers" },
                { name: "Horizon View", href: "/horizon-view" },
                { name: "Breeze Towers", href: "/breeze-towers" },
                { name: "Villas Golf", href: "/villas" }
              ].map((link, idx) => (
                <Link key={idx} href={link.href} className="p-8 border border-white/10 hover:border-secondary hover:bg-white/5 transition-all text-center group">
                  <span className="font-playfair text-xl block mb-2 group-hover:text-secondary group-hover:scale-105 transition-transform">{link.name}</span>
                  <ArrowRight className="w-5 h-5 mx-auto text-white/20 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
