"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Plane, Building2, FileText, CheckCircle2, Landmark, ArrowRight } from "lucide-react";
import { useRef } from "react";

export default function ComprarPropiedadPage() {
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
            src="/images/original/prime-tower-penthouse-terraza-2-scaled.webp"
            alt="Comprar Propiedad en Punta Cana desde el Extranjero"
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
                Guía de Inversor Extranjero
              </p>
            </div>

            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[1.1]">
              Invertir en <br />
              <span className="text-gold italic">Punta Cana</span><br />
              es Seguro y Fácil.
            </h1>

            <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl leading-relaxed mb-10">
              La República Dominicana ofrece uno de los marcos legales más amigables del mundo para el inversor internacional. Descubre los pasos exactos para adquirir tu propiedad en Larimar City desde tu país de origen.
            </p>

            <Link
              href="/contacto"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-[#0a101f] hover:bg-white transition-colors uppercase tracking-widest text-sm font-semibold"
            >
              Hablar con un Asesor Legal
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* The 4 Steps Grid */}
      <section className="py-24 bg-[#0a101f] relative z-20 mt-12">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-playfair text-4xl text-white mb-4">4 Pasos para tu Inversión</h2>
            <p className="text-white/60 font-light">Nuestro equipo jurídico te acompaña en cada etapa, permitiéndote cerrar la compra de forma remota y 100% legal.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Plane className="w-8 h-8" />,
                step: "01",
                title: "Reserva Remota",
                desc: "Selecciona tu unidad en el Inventario de Larimar City y bloquéala con un depósito inicial (generalmente $5,000 USD) transferido a nuestra cuenta fiduciaria."
              },
              {
                icon: <FileText className="w-8 h-8" />,
                step: "02",
                title: "Promesa de Compra",
                desc: "Firma digital del contrato vinculante, estructurando tu plan de pagos durante la construcción (Ej: 20% inicial, 40% durante construcción, 40% a la entrega)."
              },
              {
                icon: <Landmark className="w-8 h-8" />,
                step: "03",
                title: "Constitución de Empresa (Opcional)",
                desc: "Te ayudamos a registrar una LLC o empresa local dominicana si buscas estructurar tu patrimonio para mayores beneficios fiscales."
              },
              {
                icon: <CheckCircle2 className="w-8 h-8" />,
                step: "04",
                title: "Título Definitivo",
                desc: "Al finalizar la obra y saldar el pago, recibes el Título de Propiedad a tu nombre, garantizado por el Estado Dominicano."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#121c30] p-10 border border-white/5 hover:border-gold/30 transition-colors group relative overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 text-9xl font-playfair font-bold text-white/[0.03] pointer-events-none group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <div className="text-gold mb-6 relative z-10">{item.icon}</div>
                <h3 className="font-playfair text-2xl text-white mb-4 relative z-10">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONFOTUR Tax Benefits */}
      <section className="py-24 bg-[#121c30] border-y border-white/5 overflow-hidden mt-16">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-8"
            >
              <div className="inline-flex py-1 px-3 border border-gold/30 rounded-full w-max backdrop-blur-sm">
                <span className="text-gold text-xs uppercase tracking-widest font-bold">Ley 158-01 (CONFOTUR)</span>
              </div>
              <h2 className="font-playfair text-4xl md:text-5xl text-white">
                El Paraíso <br />
                <span className="text-gold italic">Libre de Impuestos.</span>
              </h2>

              <div className="space-y-6 text-white/70 font-light leading-relaxed">
                <p>
                  El Estado Dominicano incentiva fuertemente la inversión turística extranjera. Los proyectos aprobados por <strong className="text-white font-semibold">CONFOTUR</strong> (Consejo de Fomento Turístico), como Larimar City, disfrutan de beneficios fiscales que potencian tu ROI de manera radical.
                </p>

                <ul className="flex flex-col gap-4 mt-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                    <span className="text-white"><strong>0% Impuesto de Transferencia:</strong> Ahorras el 3% del valor de la propiedad al recibir tu título.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                    <span className="text-white"><strong>0% IPI por 15 Años:</strong> Exención total del Impuesto al Patrimonio Inmobiliario (1% anual).</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                    <span className="text-white"><strong>Residentes e Inversores Extranjeros:</strong> Los mismos derechos garantizados por ley que a los ciudadanos locales.</span>
                  </li>
                </ul>
              </div>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[600px] w-full"
            >
              <Image
                src="/images/original/villa-larimar-city-lujo.webp"
                alt="Beneficios Fiscales Larimar City"
                fill
                className="object-cover object-center rounded-sm"
              />
              <div className="absolute inset-0 border border-white/20 rounded-sm" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-32 relative text-center">
        <div className="container mx-auto px-4 relative z-10 max-w-3xl">
          <Building2 className="w-12 h-12 text-gold mx-auto mb-6" />
          <h2 className="font-playfair text-4xl text-white mb-6">Tu Asesor Inmobiliario Te Espera</h2>
          <p className="text-white/70 mb-10 font-light">¿Necesitas que un abogado del equipo te envíe el borrador exacto del contrato internacional? Ponte en contacto con nosotros.</p>
          <Link
            href="/agentes"
            className="px-10 py-5 bg-gold text-[#0a101f] hover:bg-white transition-colors uppercase tracking-widest text-sm font-semibold inline-block"
          >
            Conectar con Enlace Legal
          </Link>
        </div>
      </section>

    </div>
  );
}
