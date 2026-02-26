"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { TrendingUp, ShieldCheck, Map, ArrowRight, DollarSign, Umbrella, Plane } from "lucide-react";
import { useRef } from "react";

export default function PorQueInvertirPage() {
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
            src="/images/original/prime-towers-noche-larimar-city-1024x576.webp" // Noche / Premium feel
            alt="Por Qué Invertir en Punta Cana"
            fill
            className="object-cover object-bottom"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a101f] via-[#0a101f]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f] via-transparent to-transparent" />
        </motion.div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-32 lg:pt-40">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[1px] bg-gold" />
              <p className="text-gold uppercase tracking-[0.3em] text-sm font-bold">
                Crecimiento Sostenido
              </p>
            </div>

            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[1.1]">
              Inversión Segura <br />
              <span className="text-gold italic">y Rentable.</span>
            </h1>

            <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl leading-relaxed mb-10">
              La República Dominicana lidera el crecimiento económico de América Latina. Refugia tu capital en dólares en el destino turístico más demandado del Caribe, respaldado por estabilidad política y un marco legal sólido.
            </p>

            <Link
              href="/proyectos"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-[#0a101f] hover:bg-white transition-colors uppercase tracking-widest text-sm font-semibold"
            >
              Ver Oportunidades
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Macronomics Grid */}
      <section className="py-24 bg-[#0a101f] relative z-20 mt-12">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <DollarSign className="w-8 h-8" />,
                title: "Dolarización del Patrimonio",
                desc: "Protege tu inversión contra la inflación local. Las transacciones inmobiliarias y rentas vacacionales se estructuran 100% en dólares estadounidenses (USD)."
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Plusvalía del 12-15%",
                desc: "Invirtiendo en plano en la Fase I de Larimar City aseguras la plusvalía natural del desarrollo de una Smart City antes de su entrega."
              },
              {
                icon: <ShieldCheck className="w-8 h-8" />,
                title: "Estabilidad Política",
                desc: "Considerado el 'Milagro Económico del Caribe', República Dominicana cuenta con décadas de un gobierno pro-inversión y crecimiento del PIB sostenido."
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

      {/* Tourism Engine */}
      <section className="py-24 bg-[#121c30] border-y border-white/5 overflow-hidden mt-16">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-8 order-2 lg:order-1"
            >
              <div className="inline-flex py-1 px-3 border border-[#4FB0C6]/30 rounded-full w-max backdrop-blur-sm">
                <span className="text-[#4FB0C6] text-xs uppercase tracking-widest font-bold">El Motor Cero Vacancia</span>
              </div>
              <h2 className="font-playfair text-4xl md:text-5xl text-white">
                El Destino #1 <br />
                <span className="text-[#4FB0C6] italic">del Mundo.</span>
              </h2>

              <div className="space-y-6 text-white/70 font-light leading-relaxed">
                <p>
                  Punta Cana concentra el 60% del turismo del país. Su aeropuerto internacional recibe vuelos directos de más de 64 ciudades en todo el mundo. Este flujo constante de turistas de alto poder adquisitivo garantiza la ocupación de plataformas como Airbnb durante todo el año.
                </p>

                <ul className="flex flex-col gap-4 mt-4">
                  <li className="flex items-center gap-3">
                    <Plane className="w-5 h-5 text-[#4FB0C6] shrink-0" />
                    <span className="text-white"><strong>+8.5 Millones de Turistas</strong> proyectados anualmente.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Umbrella className="w-5 h-5 text-[#4FB0C6] shrink-0" />
                    <span className="text-white"><strong>Clima Tropical 365:</strong> Elimina la estacionalidad de otras regiones. Rentas altas en verano e invierno.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Map className="w-5 h-5 text-[#4FB0C6] shrink-0" />
                    <span className="text-white"><strong>Infraestructura:</strong> Autopistas de primer mundo, clínicas, y seguridad privada.</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/inversion-en-alquiler-vacacional-en-punta-cana"
                className="inline-flex items-center gap-2 mt-4 text-[#4FB0C6] hover:text-white transition-colors uppercase tracking-widest text-xs font-bold"
              >
                Guía de Rentabilidad Airbnb
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[600px] w-full order-1 lg:order-2"
            >
              <Image
                src="/images/original/render-3d-de-villas-de-lujo-min-scaled.webp"
                alt="Turismo de Lujo Punta Cana"
                fill
                className="object-cover object-center rounded-sm"
              />
              <div className="absolute inset-0 border border-white/20 rounded-sm" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Call to Action Callout */}
      <section className="py-32 relative text-center">
        <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-3xl">
          <h2 className="font-playfair text-4xl text-white mb-6">Elige Inteligentemente. Elige Larimar.</h2>
          <p className="text-white/70 mb-10 font-light">¿Quieres conocer por qué Grupo Clerhp, empresa cotizada en Bolsa, apostó por este mercado? Te explicamos la estructura financiera en una reunión privada.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/contacto"
              className="px-10 py-5 bg-white text-[#0a101f] hover:bg-gold hover:text-[#0a101f] transition-colors uppercase tracking-widest text-sm font-semibold inline-block rounded-sm shadow-xl"
            >
              Reunión Inversor Privado
            </Link>
            <Link
              href="/clerhp"
              className="px-10 py-5 bg-transparent border border-white text-white hover:bg-white hover:text-[#0a101f] transition-colors uppercase tracking-widest text-sm font-semibold inline-block rounded-sm"
            >
              Ver Respaldo CLERHP
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
