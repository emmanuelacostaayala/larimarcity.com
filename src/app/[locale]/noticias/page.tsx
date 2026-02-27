"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";

const noticias = {
  es: [
    {
      date: "20 Feb 2026",
      category: "Desarrollo",
      title: "Larimar City Supera el 60% de Comercialización en su Fase I",
      excerpt: "El proyecto de la Smart City dominicana continúa su sólido ritmo de ventas en mercados europeos y latinoamericanos.",
      image: "/images/original/Farallon_Fase-1_larimar-city.webp"
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
      image: "/images/original/prime-towers-exterior-12.webp"
    },
    {
      date: "28 Ene 2026",
      category: "Turismo",
      title: "República Dominicana Bate su Récord de Turismo con 8.5 Millones de Visitantes",
      excerpt: "El Banco Central confirma el nuevo máximo histórico de llegadas turísticas al país, consolidando el impulso al mercado inmobiliario vacacional.",
      image: "/images/original/vista-aerea-scaled.jpg"
    }
  ],
  en: [
    {
      date: "Feb 20, 2026",
      category: "Development",
      title: "Larimar City Exceeds 60% Sales in Phase I",
      excerpt: "The Dominican Smart City project continues its strong sales pace in European and Latin American markets.",
      image: "/images/original/Farallon_Fase-1_larimar-city.webp"
    },
    {
      date: "Feb 14, 2026",
      category: "Corporate",
      title: "CLERHP Presents 2025 Results on BME Growth with 23% Growth",
      excerpt: "Larimar City's parent company reported consolidated revenues of 87 million euros, driven by its Caribbean operations.",
      image: "/images/original/prime-tower-penthouse-terraza-2-scaled.webp"
    },
    {
      date: "Feb 5, 2026",
      category: "Construction",
      title: "Start of Prime Towers Foundations: Works Progress on Schedule",
      excerpt: "The CLERHP engineering team begins the foundation phase of the two towers, marking a milestone in the construction of Larimar City.",
      image: "/images/original/prime-towers-exterior-12.webp"
    },
    {
      date: "Jan 28, 2026",
      category: "Tourism",
      title: "Dominican Republic Breaks Tourism Record with 8.5 Million Visitors",
      excerpt: "The Central Bank confirms the new all-time high of tourist arrivals to the country, consolidating the boost to the vacation real estate market.",
      image: "/images/original/vista-aerea-scaled.jpg"
    }
  ]
};

export default function NoticiasPage() {
  const locale = useLocale();
  const currentNoticias = locale === 'en' ? noticias.en : noticias.es;

  return (
    <div className="bg-[#0a101f] min-h-screen text-white">

      {/* Header */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden flex flex-col justify-end">
        <Image src="/images/original/beach-club-bar-fase-1-larimarcity-resort.webp" alt="Noticias Larimar City" fill className="object-cover opacity-30" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f] to-transparent" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-12 h-[1px] bg-secondary" />
            <p className="text-secondary uppercase tracking-[0.3em] text-sm font-bold">
              {locale === 'en' ? 'Project Updates' : 'Actualidad del Proyecto'}
            </p>
          </div>
          <h1 className="font-playfair text-5xl md:text-7xl text-white pr-12">
            {locale === 'en' ? 'News' : 'Noticias'}
          </h1>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col gap-12">
            {currentNoticias.map((noticia, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group grid grid-cols-1 md:grid-cols-3 gap-0 bg-[#121c30] border border-white/5 hover:border-secondary/20 transition-colors overflow-hidden"
              >
                <div className="relative h-56 md:h-auto overflow-hidden">
                  <Image src={noticia.image} alt={noticia.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="md:col-span-2 p-10 flex flex-col justify-center gap-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-white/40 text-xs"><Calendar className="w-3 h-3" />{noticia.date}</span>
                    <span className="flex items-center gap-1 text-secondary text-xs font-bold uppercase tracking-widest"><Tag className="w-3 h-3" />{noticia.category}</span>
                  </div>
                  <h2 className="font-playfair text-2xl text-white group-hover:text-secondary transition-colors">{noticia.title}</h2>
                  <p className="text-white/60 leading-relaxed">{noticia.excerpt}</p>
                  <span className="text-secondary text-xs uppercase tracking-widest font-bold flex items-center gap-2 group-hover:text-white transition-colors mt-2 cursor-pointer">
                    {locale === 'en' ? 'Read More' : 'Leer Más'} <ArrowRight className="w-4 h-4" />
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
