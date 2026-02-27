"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";

const content = {
  es: {
    heroBadge: "Resolvemos Tus Dudas",
    heroTitle: "Preguntas Frecuentes",
    ctaTitle: "¿Tienes Más Preguntas?",
    ctaDesc: "Nuestros asesores están disponibles para resolver cualquier duda de forma personalizada.",
    ctaBtn: "Hablar con un Asesor",
    faqs: [
      {
        q: "¿Puedo comprar una propiedad en Larimar City siendo extranjero?",
        a: "Sí. La República Dominicana garantiza a los extranjeros los mismos derechos de propiedad que a los ciudadanos. Puedes comprar a título personal o mediante una LLC dominicana. Nuestro equipo jurídico te acompaña en cada paso."
      },
      {
        q: "¿Cuáles son los beneficios fiscales de CONFOTUR?",
        a: "Los proyectos aprobados por CONFOTUR (categoría en la que se inscribe Larimar City) disfrutan de: 0% Impuesto de Transferencia (ahorro del 3% del valor), y exención total del Impuesto al Patrimonio Inmobiliario (IPI) por 15 años."
      },
      {
        q: "¿Cuál es el plan de pagos típico?",
        a: "Generalmente: 10-20% para reservar la unidad, 30-40% durante la construcción en cuotas, y el saldo restante (40-50%) a la entrega de llaves. También disponemos de financiación bancaria local para compradores cualificados."
      },
      {
        q: "¿Puedo cerrar la compra sin viajar a la República Dominicana?",
        a: "Sí. Mediante poder notarial apostillado y firma digital, es posible completar todo el proceso de compra de forma remota. Muchos de nuestros clientes europeos han cerrado sus inversiones sin salir de casa."
      },
      {
        q: "¿Qué rentabilidad puedo esperar con el alquiler vacacional?",
        a: "Dependiendo del tipo de unidad y la gestión, los inversores en Punta Cana obtienen entre un 8% y 12% de ROI neto anual. Las Villas Golf y los Penthouses de Prime Towers tienden a los valores más altos por su exclusividad."
      },
      {
        q: "¿Cuándo estarán listas las primeras unidades de la Fase I?",
        a: "La fecha de entrega estimada para las primeras unidades de Prime Towers y Horizon View es finales de 2027. Las obras comenzaron formalmente en Q4 2025 y avanzan según el cronograma de CLERHP."
      },
      {
        q: "¿Qué empresa respalda el desarrollo de Larimar City?",
        a: "Larimar City es el proyecto insignia de Grupo CLERHP Estructuras S.A., empresa española de ingeniería y construcción cotizada en el BME Growth (ticker: CLR) con más de 20 años de experiencia en proyectos estructurales internacionales."
      },
      {
        q: "¿Existe servicio de administración de la propiedad?",
        a: "Sí. Ofrecemos un servicio integral de Property Management que incluye comercialización en plataformas vacacionales (Airbnb, Booking), mantenimiento preventivo, limpieza hotelera y reporte mensual de ingresos al propietario."
      }
    ]
  },
  en: {
    heroBadge: "We Resolve Your Doubts",
    heroTitle: "Frequently Asked Questions",
    ctaTitle: "Do You Have More Questions?",
    ctaDesc: "Our advisors are available to resolve any doubts personally.",
    ctaBtn: "Speak with an Advisor",
    faqs: [
      {
        q: "Can I buy a property in Larimar City as a foreigner?",
        a: "Yes. The Dominican Republic guarantees foreigners the same property rights as citizens. You can purchase personally or through a Dominican LLC. Our legal team accompanies you at every step."
      },
      {
        q: "What are the tax benefits of CONFOTUR?",
        a: "Projects approved by CONFOTUR (the category Larimar City belongs to) enjoy: 0% Transfer Tax (saving 3% of the value), and total exemption from the Real Estate Property Tax (IPI) for 15 years."
      },
      {
        q: "What is the typical payment plan?",
        a: "Generally: 10-20% to reserve the unit, 30-40% during construction in installments, and the remaining balance (40-50%) upon delivery of keys. We also have local bank financing for qualified buyers."
      },
      {
        q: "Can I close the purchase without traveling to the Dominican Republic?",
        a: "Yes. Through an apostilled power of attorney and digital signature, it is possible to complete the entire purchasing process remotely. Many of our European clients have closed their investments without leaving home."
      },
      {
        q: "What profitability can I expect from vacation rentals?",
        a: "Depending on the unit type and management, investors in Punta Cana achieve between 8% and 12% annual net ROI. Golf Villas and Prime Towers Penthouses tend to have the highest values due to their exclusivity."
      },
      {
        q: "When will the first units of Phase I be ready?",
        a: "The estimated delivery date for the first units of Prime Towers and Horizon View is late 2027. Works formally began in Q4 2025 and are progressing according to CLERHP's schedule."
      },
      {
        q: "Which company supports the development of Larimar City?",
        a: "Larimar City is the flagship project of Grupo CLERHP Estructuras S.A., a Spanish engineering and construction company listed on the BME Growth (ticker: CLR) with over 20 years of experience in international structural projects."
      },
      {
        q: "Is there a property management service?",
        a: "Yes. We offer a comprehensive Property Management service that includes marketing on vacation platforms (Airbnb, Booking), preventive maintenance, hotel cleaning, and monthly income reporting to the owner."
      }
    ]
  }
};

export default function PreguntasFrecuentesPage() {
  const locale = useLocale();
  const t = locale === 'en' ? content.en : content.es;

  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="bg-[#0a101f] min-h-screen text-white">

      {/* Header */}
      <section className="relative h-[40vh] min-h-[300px] flex items-end pb-16 overflow-hidden">
        <Image src="/images/original/villa-larimar-city-lujo.webp" alt="FAQ Larimar City" fill className="object-cover opacity-30" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f] to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-12 h-[1px] bg-gold" />
            <p className="text-gold uppercase tracking-[0.3em] text-sm font-bold">{t.heroBadge}</p>
          </div>
          <h1 className="font-playfair text-5xl md:text-7xl text-white">{t.heroTitle}</h1>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col gap-4">
            {t.faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
                className={`border transition-colors ${open === idx ? "border-gold/40 bg-[#121c30]" : "border-white/5 bg-[#121c30]"}`}
              >
                <button
                  onClick={() => setOpen(open === idx ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 p-8 text-left"
                >
                  <div className="flex items-start gap-4">
                    <HelpCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <h3 className="text-white font-medium">{faq.q}</h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-white/50 shrink-0 transition-transform ${open === idx ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${open === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="px-8 pb-8 pl-17">
                    <p className="text-white/60 leading-relaxed pl-9">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 bg-[#121c30] border border-gold/20 p-12 text-center">
            <h3 className="font-playfair text-3xl text-white mb-4">{t.ctaTitle}</h3>
            <p className="text-white/60 mb-8">{t.ctaDesc}</p>
            <Link href={`/${locale}/contacto`} className="inline-flex items-center gap-3 px-10 py-4 bg-gold text-[#0a101f] hover:bg-white transition-colors uppercase tracking-widest text-xs font-bold">
              {t.ctaBtn} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
