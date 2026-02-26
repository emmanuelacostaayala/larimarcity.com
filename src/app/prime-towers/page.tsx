"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Download, Check, FileText, LayoutGrid, Calendar, ChevronRight, ArrowRight } from "lucide-react";
import PropertyGallery from "@/components/PropertyGallery";
import TypologySelector from "@/components/TypologySelector";

export default function PrimeTowersPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Property Hero with Editorial Design */}
      <section className="relative w-full pt-32 pb-20 px-6 lg:px-12 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-12 h-[1px] bg-secondary" />
                  <p className="text-secondary uppercase tracking-[0.3em] font-bold text-xs">
                    Fase I • Residencial Premium
                  </p>
                </div>
                <h1 className="font-playfair text-6xl md:text-8xl text-primary leading-tight mb-8">
                  Prime <br />
                  <span className="text-secondary italic">Towers.</span>
                </h1>
                <p className="text-slate-500 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                  Diseño vanguardista para el inversor exigente. Apartamentos y Penthouses con vistas inigualables al mar y al ecosistema de Punta Cana, integrando tecnología Smart Home y acabados de lujo.
                </p>
              </motion.div>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-4">
              <button className="px-10 py-5 bg-primary text-white font-bold uppercase tracking-widest text-[10px] rounded-sm hover:bg-secondary transition-all flex items-center justify-center gap-3 shadow-xl">
                Agendar Inversión <Calendar className="w-4 h-4" />
              </button>
              <button className="px-10 py-5 bg-transparent border border-primary/20 text-primary font-bold uppercase tracking-widest text-[10px] rounded-sm hover:bg-stone-50 transition-all flex items-center justify-center gap-3">
                Brochure Completo <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Full Emphasis */}
      <section className="px-6 lg:px-12 pb-24">
        <div className="container mx-auto max-w-7xl">
          <PropertyGallery />
        </div>
      </section>

      {/* Typologies & Inventory */}
      <section className="py-24 px-6 lg:px-12 bg-stone-50 border-y border-slate-100">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="font-playfair text-4xl md:text-5xl text-primary mb-6">Unidades <span className="text-secondary italic">Disponibles.</span></h2>
            <p className="text-slate-500 font-light">Explora las diferentes tipologías diseñadas para maximizar el confort y la rentabilidad vacacional.</p>
          </div>

          <TypologySelector />
        </div>
      </section>

      {/* Characteristics Grid */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="font-playfair text-4xl text-primary mb-8 underline decoration-secondary/30 underline-offset-8">Excelencia en cada Detalle</h2>
              <p className="text-slate-600 mb-10 leading-relaxed font-light text-lg">
                Desde el lobby de doble altura hasta las piscinas infinity en el rooftop, Prime Towers ha sido concebido como un hito arquitectónico en el skyline de Larimar City.
              </p>
              <div className="grid sm:grid-cols-2 gap-y-6 gap-x-12">
                {[
                  "Lobby a doble altura",
                  "Piscina Infinity en Rooftop",
                  "Gimnasio equipado",
                  "Área de BBQ y Lounge",
                  "Parqueo techado",
                  "Seguridad 24/7",
                  "Acabados premium (Roca, etc.)",
                  "Sistema Smart Home Integrado"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center text-slate-700 group">
                    <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center mr-4 group-hover:bg-secondary group-hover:text-white transition-colors">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square">
              <Image
                src="/images/original/prime-towers-noche-larimar-city-1024x576.webp"
                alt="Prime Towers Luxury"
                fill
                className="object-cover rounded-sm border border-slate-100 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resource Footer */}
      <section className="py-24 bg-primary text-white px-6 lg:px-12">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h3 className="font-playfair text-3xl mb-8">Documentación Técnica</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: "Memoria de Calidades", type: "PDF", size: "2.4 MB", icon: <FileText /> },
                  { title: "Planos Arquitectónicos", type: "PDF", size: "5.1 MB", icon: <LayoutGrid /> }
                ].map((doc, i) => (
                  <Link href="#" key={i} className="p-6 bg-white/5 border border-white/10 hover:border-secondary transition-all group flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-secondary opacity-50 group-hover:opacity-100 transition-opacity">{doc.icon}</div>
                      <div>
                        <p className="font-bold text-sm tracking-wide">{doc.title}</p>
                        <p className="text-[10px] text-white/40 uppercase">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
            <div className="p-8 bg-white/5 border border-white/10 rounded-sm">
              <h4 className="font-playfair text-2xl mb-4 text-secondary">¿Buscas algo más?</h4>
              <p className="text-white/50 text-sm mb-8 font-light italic">"Nuestro equipo de legal y ventas está disponible para enviarte el inventario en tiempo real y resolver dudas sobre la Ley CONFOTUR."</p>
              <Link href="/contacto" className="text-white hover:text-secondary transition-colors text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                Contactar con C.D.O <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
