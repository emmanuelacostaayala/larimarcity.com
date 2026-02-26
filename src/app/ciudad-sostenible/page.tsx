"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, Sun, Droplets, Zap, ArrowRight } from "lucide-react";
import { useRef } from "react";

export default function CiudadSosteniblePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="bg-[#0a101f] min-h-screen text-white" ref={containerRef}>

      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
        <motion.div
          style={{ y: yHero }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/images/original/Farallon_Fase-1_larimar-city-1536x864.webp"
            alt="Ciudad Sostenible Punta Cana"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a101f] via-[#0a101f]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f] via-transparent to-[#0a101f]/30" />
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
                Innovación & Futuro
              </p>
            </div>

            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[1.1]">
              La Primera <br />
              <span className="text-gold italic">Smart City</span> en RD.
            </h1>

            <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl leading-relaxed mb-10">
              Más de 3,000,000 m² de desarrollo inteligente donde la tecnología de vanguardia y el respeto por el medio ambiente convergen para crear un ecosistema autosuficiente, verde y libre de estrés.
            </p>

            <Link
              href="/proyectos"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#4FB0C6] text-[#0a101f] hover:bg-white transition-colors uppercase tracking-widest text-sm font-semibold"
            >
              Explorar el Masterplan
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Core Sustainability Pillars */}
      <section className="py-24 bg-[#0a101f] relative z-20 -mt-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Energía Renovable",
                desc: "Integración de infraestructura solar en áreas comunes y optimización del consumo eléctrico."
              },
              {
                icon: <Droplets className="w-8 h-8" />,
                title: "Gestión Hídrica",
                desc: "Sistemas avanzados de depuración, recolección de agua de lluvia y reutilización para riego de campos de golf."
              },
              {
                icon: <Leaf className="w-8 h-8" />,
                title: "30% Áreas Verdes",
                desc: "Diseño ecosistémico que preserva la flora nativa y controla la temperatura urbana de forma natural."
              },
              {
                icon: <Sun className="w-8 h-8" />,
                title: "Arquitectura Bioclimática",
                desc: "Orientación estratégica de torres para maximizar la luz natural y la ventilación cruzada del Mar Caribe."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#121c30] p-10 border border-white/5 hover:border-[#4FB0C6]/30 transition-colors group"
              >
                <div className="text-[#4FB0C6] mb-6 group-hover:scale-110 transition-transform origin-left">{item.icon}</div>
                <h3 className="font-playfair text-2xl text-white mb-4">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The City Section */}
      <section className="py-24 bg-[#121c30] border-y border-white/5 overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-8 order-2 lg:order-1"
            >
              <h2 className="font-playfair text-4xl md:text-5xl text-white">
                Un Ecosistema <br />
                <span className="text-gold italic">Autosuficiente.</span>
              </h2>

              <div className="space-y-6 text-white/70 font-light leading-relaxed">
                <p>
                  Larimar City reduce la dependencia de infraestructuras externas obsoletas. Al construir una Smart City desde cero en el Farallón de Punta Cana, implementamos canalizaciones soterradas de fibra óptica, sistemas de iluminación pública LED inteligente y un diseño de *"Ciudad de los 15 minutos"*.
                </p>
                <p>
                  Reducimos la necesidad de vehículos mediante senderos peatonales, ciclovías y carritos de golf, conectando los complejos residenciales directamente con el Beach Club, comercios y hospitales.
                </p>
              </div>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[600px] w-full order-1 lg:order-2"
            >
              <Image
                src="/images/original/vista-atardecer-apartamentos-punta-cana.webp"
                alt="Vista Atardecer Larimar City"
                fill
                className="object-cover object-center rounded-sm"
              />
              {/* Highlight Overlay */}
              <div className="absolute inset-0 border border-white/20 rounded-sm" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-32 relative text-center">
        <div className="container mx-auto px-4 relative z-10 max-w-3xl">
          <h2 className="font-playfair text-4xl text-white mb-6">Invierte en el Futuro Verde del Caribe</h2>
          <p className="text-white/70 mb-10">Las propiedades en desarrollos ecológicos y Smart Cities tienen una apreciación de capital superior debido a la alta demanda de turismo consciente.</p>
          <Link
            href="/inversion-en-alquiler-vacacional-en-punta-cana"
            className="px-10 py-5 bg-transparent border border-white text-white hover:bg-white hover:text-[#0a101f] transition-colors uppercase tracking-widest text-sm font-semibold inline-block"
          >
            Ver Retorno de Inversión (ROI)
          </Link>
        </div>
      </section>

    </div>
  );
}
