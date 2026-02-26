"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { TrendingUp, Key, ShieldCheck, MapPin, Calculator, CalendarCheck, Home, ArrowRight } from "lucide-react";
import { useRef } from "react";

export default function InversionVacacionalPage() {
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
            src="/images/original/prime-tower-penthouse-terraza-2-scaled.webp"
            alt="Inversión en Alquiler Vacacional en Punta Cana - Larimar City"
            fill
            className="object-cover object-bottom"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a101f] via-[#0a101f]/80 to-transparent" />
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
                Guía de Inversión 2026
              </p>
            </div>

            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[1.1]">
              El Centro del <br />
              <span className="text-gold italic">Alquiler Vacacional</span><br />
              en el Caribe
            </h1>

            <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl leading-relaxed mb-10">
              Punta Cana no es solo el destino número uno del Caribe; es una máquina de <strong className="text-white font-semibold">Retorno de Inversión (ROI)</strong> impulsada por el turismo constante. Descubre cómo Larimar City maximiza tu rentabilidad mediante gestión inteligente y ocupación premium.
            </p>

            <Link
              href="#calculadora"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-[#0a101f] hover:bg-white transition-colors uppercase tracking-widest text-sm font-semibold"
            >
              Calcular Rentabilidad
              <Calculator className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Punta Cana Stats Grid */}
      <section className="py-24 bg-[#0a101f] relative z-20 mt-12">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: <TrendingUp className="w-8 h-8" />,
                stat: "8-12%",
                label: "ROI Promedio Anual",
                desc: "Rentabilidades netas ampliamente superiores a mercados saturados en Europa o Norteamérica."
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                stat: "8.5M+",
                label: "Turistas en 2025",
                desc: "Récord histórico de llegada de pasajeros aéreos a la República Dominicana, concentrados en Punta Cana."
              },
              {
                icon: <ShieldCheck className="w-8 h-8" />,
                stat: "Ley 158-01",
                label: "CONFOTUR",
                desc: "Exención de impuestos a la propiedad (IPI) por 15 años y del impuesto de transferencia (3%)."
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
                <h3 className="font-playfair text-5xl text-white mb-2">{item.stat}</h3>
                <p className="text-gold uppercase tracking-widest text-xs font-bold mb-4">{item.label}</p>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Management Solution Module */}
      <section className="py-24 bg-[#121c30] border-y border-white/5 mt-16">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[600px] w-full"
            >
              <Image
                src="/images/original/villa-larimar-city-vista.webp"
                alt="Gestión Inmobiliaria"
                fill
                className="object-cover object-center border border-white/10"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#121c30] to-transparent" />

              {/* Floating Badge */}
              <div className="absolute bottom-10 left-10 bg-[#0a101f]/90 backdrop-blur-md border border-gold/30 p-6 flex items-center gap-4">
                <Key className="w-8 h-8 text-gold" />
                <div>
                  <p className="text-white font-playfair text-xl">Property Management</p>
                  <p className="text-white/60 text-xs uppercase tracking-widest">Llave en Mano</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-8"
            >
              <h2 className="font-playfair text-4xl md:text-5xl text-white">
                Invierte desde lejos. <br />
                <span className="text-gold italic">Nosotros lo gestionamos.</span>
              </h2>

              <div className="space-y-6 text-white/70 font-light leading-relaxed">
                <p>
                  El gran reto de la inversión internacional es la gestión diaria. En Larimar City, ofrecemos un modelo integral de <strong className="text-white font-semibold">Property Management</strong> diseñado para que tu propiedad genere ingresos en dólares sin que tengas que preocuparte por la logística.
                </p>

                <ul className="flex flex-col gap-6 mt-8">
                  {[
                    { icon: <CalendarCheck />, title: "Comercialización Premium", text: "Posicionamiento en Airbnb Plus, Booking y plataformas de lujo asociadas." },
                    { icon: <Home />, title: "Mantenimiento Integral", text: "Limpieza hotelera, reparaciones preventivas y cuidado del mobiliario." },
                    { icon: <ShieldCheck />, title: "Reportes Financieros", text: "Dashboard de propietarios transparente con tus ingresos mensuales en USD." }
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="mt-1 w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center shrink-0 text-gold">
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

              <Link
                href="/servicio-postventa"
                className="inline-flex items-center gap-2 mt-4 text-gold hover:text-white transition-colors uppercase tracking-widest text-xs font-bold"
              >
                Descubre el Servicio Postventa
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ROI Simulation CTA */}
      <section id="calculadora" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/original/Farallon_Fase-1_larimar-city-1536x864.webp"
            alt="Larimar City Masterplan"
            fill
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-[#0a101f]/80" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <h2 className="font-playfair text-5xl md:text-6xl text-white mb-6">
            ¿Listo para ver los números reales?
          </h2>
          <p className="text-white/70 text-lg mb-12 font-light">
            Nuestros asesores de inversión tienen simulaciones financieras precisas basadas en el histórico de Punta Cana y las proyecciones de valoración de Larimar City. Agendemos una llamada para diseñar tu estrategia de inversión.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/contacto"
              className="px-10 py-5 bg-gold text-[#0a101f] hover:bg-white transition-colors uppercase tracking-widest text-sm font-semibold flex items-center gap-3"
            >
              Agendar Sesión Financiera
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/proyectos"
              className="px-10 py-5 bg-transparent border border-white text-white hover:bg-white hover:text-[#0a101f] transition-colors uppercase tracking-widest text-sm font-semibold"
            >
              Ver Propiedades
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
