"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";

const posts = [
  {
    slug: "por-que-punta-cana-es-el-mejor-destino-inversor-2026",
    title: "Por Qué Punta Cana es el Mejor Destino Inversor en 2026",
    category: "Inversión",
    date: "15 Febrero 2026",
    excerpt: "Analizamos los factores macroeconómicos que posicionan a la República Dominicana como la economía de mayor crecimiento del Caribe.",
    image: "/images/original/Farallon_Fase-1_larimar-city-1536x864.webp"
  },
  {
    slug: "smart-city-larimar-sostenibilidad-y-tecnologia",
    title: "Smart City Larimar: Sostenibilidad y Tecnología al Servicio del Lujo",
    category: "Ciudad",
    date: "8 Febrero 2026",
    excerpt: "Cómo Larimar City integra infraestructura tecnológica, energías renovables y diseño bioclimático en un único desarrollo de clase mundial.",
    image: "/images/original/prime-tower-penthouse-terraza-2-scaled.webp"
  },
  {
    slug: "guia-completa-confotur-inversores-extranjeros",
    title: "Guía Completa CONFOTUR 2026: Beneficios para Inversores Extranjeros",
    category: "Legal",
    date: "1 Febrero 2026",
    excerpt: "Explicamos en detalle las exenciones fiscales de la Ley 158-01 y cómo afectan directamente a tu inversión en Larimar City.",
    image: "/images/original/villa-larimar-city-lujo.webp"
  },
  {
    slug: "prime-towers-penthouses-vista-panoramica",
    title: "Prime Towers: Los Penthouses con la Vista más Espectacular del Caribe",
    category: "Proyectos",
    date: "25 Enero 2026",
    excerpt: "Un recorrido visual por los penthouses triples de Prime Towers y sus 180° de vistas al Océano Atlántico desde el Farallón.",
    image: "/images/original/prime-tower-penthouse-terraza-2-scaled.webp"
  },
  {
    slug: "rentabilidad-airbnb-punta-cana-2026",
    title: "Rentabilidad Airbnb en Punta Cana 2026: Datos Reales por Tipología",
    category: "Inversión",
    date: "18 Enero 2026",
    excerpt: "Nuestro equipo analiza los datos reales de plataformas vacacionales y proyecta los retornos por tipo de unidad en Larimar City.",
    image: "/images/original/render-3d-de-villas-de-lujo-min-scaled.webp"
  },
  {
    slug: "golf-country-club-larimar-18-hoyos",
    title: "El Nuevo Campo de Golf de 18 Hoyos Par 72: Diseño y Primeras Imágenes",
    category: "Lifestyle",
    date: "10 Enero 2026",
    excerpt: "Revelamos el diseño final del campo de golf que se integra en el Masterplan Fase I, con vistas directas al Océano desde múltiples tees.",
    image: "/images/original/amenities-golf.webp"
  }
];

export default function BlogPage() {
  return (
    <div className="bg-[#0a101f] min-h-screen text-white">

      {/* Header */}
      <section className="relative h-[40vh] min-h-[300px] flex items-end pb-16 overflow-hidden">
        <Image src="/images/original/vista-atardecer-apartamentos-punta-cana.webp" alt="Blog Larimar City" fill className="object-cover opacity-30" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f] to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-12 h-[1px] bg-gold" />
            <p className="text-gold uppercase tracking-[0.3em] text-sm font-bold">Conocimiento & Mercado</p>
          </div>
          <h1 className="font-playfair text-5xl md:text-7xl text-white">Blog</h1>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">

          {/* Featured Post */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-[#121c30] border border-white/5 overflow-hidden hover:border-gold/20 transition-colors">
              <div className="relative h-80 lg:h-full overflow-hidden">
                <Image src={posts[0].image} alt={posts[0].title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-12 flex flex-col justify-center gap-6">
                <span className="text-gold uppercase tracking-widest text-xs font-bold">{posts[0].category}</span>
                <h2 className="font-playfair text-3xl lg:text-4xl text-white group-hover:text-gold transition-colors">{posts[0].title}</h2>
                <p className="text-white/60 leading-relaxed">{posts[0].excerpt}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-white/40 text-xs flex items-center gap-2"><Calendar className="w-3 h-3" />{posts[0].date}</span>
                  <Link href={`/blog/${posts[0].slug}`} className="text-gold text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:text-white transition-colors">
                    Leer Artículo <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Rest of Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }} className="group bg-[#121c30] border border-white/5 hover:border-gold/20 transition-colors overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gold uppercase tracking-widest text-xs font-bold">{post.category}</span>
                    <span className="text-white/40 text-xs flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                  </div>
                  <h3 className="font-playfair text-xl text-white group-hover:text-gold transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-white/60 text-sm line-clamp-3">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="text-gold text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:text-white transition-colors mt-2">
                    Leer <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16 flex items-center justify-center gap-3 text-white/40">
            <BookOpen className="w-5 h-5" />
            <p className="text-sm">Más artículos próximamente...</p>
          </div>
        </div>
      </section>
    </div>
  );
}
