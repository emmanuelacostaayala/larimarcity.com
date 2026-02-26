"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Tag, ArrowRight } from "lucide-react";

const noticias = [
  {
    date: "20 Feb 2026",
    category: "Desarrollo",
    title: "Larimar City Supera el 60% de Comercialización en su Fase I",
    excerpt: "El proyecto de la Smart City dominicana continúa su sólido ritmo de ventas en mercados europeos y latinoamericanos.",
    image: "/images/original/Farallon_Fase-1_larimar-city-1536x864.webp"
  },
  {
    date: "14 Feb 2026",
    category: "Corporativo",
    title: "CLERHP Presenta sus Resultados 2025 en BME Growth con Crecimiento del 23%",
    excerpt: "La matriz de Larimar City reportó ingresos consolidados de 87 millones de euros, impulsados por sus operaciones en el Caribe.",
    image: "/images/original/prime-tower-penthouse-terraza-2-scaled.webp"
  },
  {
    date: "5 Feb 2026",
    category: "Obra",
    title: "Inicio de Cimentaciones de Prime Towers: Las Obras Avanzan Según Cronograma",
    excerpt: "El equipo de ingeniería de CLERHP inicia la fase de cimentación de las dos torres, marcando un hito en la construcción de Larimar City.",
    image: "/images/original/prime-towers-noche-larimar-city-1024x576.webp"
  },
  {
    date: "28 Ene 2026",
    category: "Turismo",
    title: "República Dominicana Bate su Récord de Turismo con 8.5 Millones de Visitantes",
    excerpt: "El Banco Central confirma el nuevo máximo histórico de llegadas turísticas al país, consolidando el impulso al mercado inmobiliario vacacional.",
    image: "/images/original/vista-atardecer-apartamentos-punta-cana.webp"
  }
];

export default function NoticiasPage() {
  return (
    <div className="bg-[#0a101f] min-h-screen text-white">

      {/* Header */}
      <section className="relative h-[40vh] min-h-[300px] flex items-end pb-16 overflow-hidden">
        <Image src="/images/original/Farallon_Fase-1_larimar-city-1536x864.webp" alt="Noticias Larimar City" fill className="object-cover opacity-30" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f] to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-12 h-[1px] bg-gold" />
            <p className="text-gold uppercase tracking-[0.3em] text-sm font-bold">Actualidad del Proyecto</p>
          </div>
          <h1 className="font-playfair text-5xl md:text-7xl text-white">Noticias</h1>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col gap-12">
            {noticias.map((noticia, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group grid grid-cols-1 md:grid-cols-3 gap-0 bg-[#121c30] border border-white/5 hover:border-gold/20 transition-colors overflow-hidden"
              >
                <div className="relative h-56 md:h-auto overflow-hidden">
                  <Image src={noticia.image} alt={noticia.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="md:col-span-2 p-10 flex flex-col justify-center gap-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-white/40 text-xs"><Calendar className="w-3 h-3" />{noticia.date}</span>
                    <span className="flex items-center gap-1 text-gold text-xs font-bold uppercase tracking-widest"><Tag className="w-3 h-3" />{noticia.category}</span>
                  </div>
                  <h2 className="font-playfair text-2xl text-white group-hover:text-gold transition-colors">{noticia.title}</h2>
                  <p className="text-white/60 leading-relaxed">{noticia.excerpt}</p>
                  <span className="text-gold text-xs uppercase tracking-widest font-bold flex items-center gap-2 group-hover:text-white transition-colors mt-2 cursor-pointer">
                    Leer Más <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
