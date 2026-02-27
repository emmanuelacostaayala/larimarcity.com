"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Star } from "lucide-react";
import { useLocale } from "next-intl";

const content = {
  es: {
    badge: "Experiencias Larimar",
    title_1: "Eventos &",
    title_2: "Showrooms",
    desc: "Descubre nuestros próximos eventos presenciales y virtuales diseñados para inversores globales.",
    featuredBtn: "Reservar Cupo",
    featuredBadge: "Evento Destacado",
    agendaBtn: "Solicitar Agenda",
    events: [
      {
        title: "Gran Inauguración Showroom Larimar",
        date: "15 de Marzo, 2026",
        location: "Edf. Aqua, Punta Cana",
        desc: "Sé el primero en experimentar nuestro nuevo centro de ventas interactivo con realidad aumentada del Masterplan.",
        image: "/images/original/prime-tower-penthouse-terraza-2-scaled.webp",
        featured: true
      },
      {
        title: "Webinar: Por qué el Caribe es el nuevo refugio de capital",
        date: "22 de Marzo, 2026",
        location: "Online / Zoom",
        desc: "Análisis exclusivo con el Director Financiero de CLERHP sobre las proyecciones económicas del 2026.",
        image: "/images/original/villa-larimar-city-lujo.webp",
        featured: false
      },
      {
        title: "Cóctel Inversores: Lanzamiento Breeze Towers",
        date: "5 de Abril, 2026",
        location: "Paseo de la Castellana, Madrid",
        desc: "Evento privado para inversores europeos presentando las primeras unidades de la torre Breeze.",
        image: "/images/original/breeze-towers-10-scaled.webp",
        featured: false
      }
    ]
  },
  en: {
    badge: "Larimar Experiences",
    title_1: "Events &",
    title_2: "Showrooms",
    desc: "Discover our upcoming in-person and virtual events designed for global investors.",
    featuredBtn: "Reserve Spot",
    featuredBadge: "Featured Event",
    agendaBtn: "Request Agenda",
    events: [
      {
        title: "Grand Opening Larimar Showroom",
        date: "March 15, 2026",
        location: "Aqua Bldg, Punta Cana",
        desc: "Be the first to experience our new interactive sales center with augmented reality of the Masterplan.",
        image: "/images/original/prime-tower-penthouse-terraza-2-scaled.webp",
        featured: true
      },
      {
        title: "Webinar: Why the Caribbean is the new capital haven",
        date: "March 22, 2026",
        location: "Online / Zoom",
        desc: "Exclusive analysis with CLERHP's CFO on economic projections for 2026.",
        image: "/images/original/villa-larimar-city-lujo.webp",
        featured: false
      },
      {
        title: "Investors Cocktail: Breeze Towers Launch",
        date: "April 5, 2026",
        location: "Paseo de la Castellana, Madrid",
        desc: "Private event for European investors presenting the first units of the Breeze tower.",
        image: "/images/original/breeze-towers-10-scaled.webp",
        featured: false
      }
    ]
  }
};

export default function EventosPage() {
  const locale = useLocale();
  const t = locale === 'en' ? content.en : content.es;

  return (
    <div className="bg-[#0a101f] min-h-screen text-white pt-20">
      {/* Header */}
      <section className="py-24 container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">{t.badge}</span>
            <h1 className="font-playfair text-6xl md:text-8xl">{t.title_1} <br /><span className="text-gold italic">{t.title_2}</span></h1>
          </div>
          <p className="text-white/40 text-sm max-w-xs mb-4">{t.desc}</p>
        </div>

        {/* Featured Event */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative h-[500px] border border-gold/20 mb-12 overflow-hidden group"
        >
          <Image src={t.events[0].image} alt={t.events[0].title} fill className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f] to-transparent" />
          <div className="absolute top-8 left-8">
            <span className="bg-gold text-[#0a101f] px-4 py-1 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Star className="w-3 h-3 fill-current" /> {t.featuredBadge}
            </span>
          </div>
          <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="font-playfair text-4xl mb-4">{t.events[0].title}</h2>
              <div className="flex flex-wrap gap-6 text-xs uppercase tracking-widest font-bold text-gold mb-4">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {t.events[0].date}</span>
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {t.events[0].location}</span>
              </div>
              <p className="text-white/60 font-light">{t.events[0].desc}</p>
            </div>
            <button className="px-10 py-4 bg-white text-[#0a101f] hover:bg-gold transition-colors text-xs font-bold uppercase tracking-widest shrink-0">{t.featuredBtn}</button>
          </div>
        </motion.div>

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {t.events.slice(1).map((ev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#121c30] border border-white/5 p-10 hover:border-gold/30 transition-colors"
            >
              <h3 className="font-playfair text-2xl mb-4 group-hover:text-gold transition-colors">{ev.title}</h3>
              <div className="flex flex-wrap gap-4 text-[10px] uppercase tracking-widest font-bold text-white/40 mb-6">
                <span className="flex items-center gap-2"><Calendar className="w-3 h-3 text-gold" /> {ev.date}</span>
                <span className="flex items-center gap-2"><MapPin className="w-3 h-3 text-gold" /> {ev.location}</span>
              </div>
              <p className="text-white/60 text-sm font-light leading-relaxed mb-8">{ev.desc}</p>
              <button className="text-gold text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">{t.agendaBtn} <ArrowRight className="w-4 h-4" /></button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
