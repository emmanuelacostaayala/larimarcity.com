"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { HandHeart, PaintBucket, Layers, Key, CheckCircle, Headphones, Building2, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";

export default function PostventaPage() {
  const locale = useLocale();
  return (
    <main className="min-h-screen bg-white">
      {/* Editorial Hero with "Margen Blanco" */}
      <section className="relative pt-32 pb-20 px-6 lg:px-12 bg-white">
        <div className="container mx-auto max-w-7xl">
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
                    Customer Experience
                  </p>
                </div>
                <h1 className="font-playfair text-6xl md:text-8xl text-primary leading-tight mb-8">
                  {locale === 'en' ? (
                    <>More than an <br /><span className="text-secondary italic">Investment.</span></>
                  ) : (
                    <>Más que una <br /><span className="text-secondary italic">Inversión.</span></>
                  )}
                </h1>
                <p className="text-slate-500 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                  {locale === 'en' ? 'At Larimar City & Resort, the experience does not end with the purchase. It is here that a new stage begins: turning a real estate investment into a real home. We accompany you until Larimar becomes your home in Punta Cana.' : 'En Larimar City & Resort, la experiencia no termina con la compra de una vivienda. Al contrario. Es ahí donde comienza una nueva etapa: la de convertir una inversión inmobiliaria en un hogar real. Nuestro compromiso es estar a tu lado hasta que Larimar deje de ser un proyecto y se convierta en tu hogar.'}
                </p>
                <p className="mt-4 text-slate-500 text-md font-light">
                  {locale === 'en' ? 'Special programs: Larimar Experience & Fly and Fall in Love.' : 'Programas exclusivos: Larimar Experience & Fly and Fall in Love.'}
                </p>
              </motion.div>
            </div>
            <div className="lg:col-span-4 pb-4">
              <div className="p-8 bg-stone-50 border border-slate-100 rounded-sm">
                <p className="text-xs uppercase tracking-widest font-bold text-primary mb-4">
                  {locale === 'en' ? 'Help Line' : 'Línea de Atención'}
                </p>
                <a href="tel:+18297611316" className="block text-2xl font-playfair font-bold text-primary mb-2 hover:text-secondary transition-colors">+1 829 761 1316</a>
                <p className="text-slate-500 text-sm font-light">
                  {locale === 'en' ? 'Personalized 24/7 assistance for international investors.' : 'Asistencia personalizada 24/7 para inversores internacionales.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Feature Image */}
      <section className="px-6 lg:px-12 pb-24">
        <div className="container mx-auto max-w-7xl">
          <div className="relative h-[60vh] w-full overflow-hidden rounded-sm group shadow-2xl">
            <Image
              src="/images/original/breezer_towers_interior_bajo_24.webp"
              alt="Larimar Interiorismo"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/80 to-transparent" />
            <div className="absolute bottom-12 left-12">
              <h2 className="text-white font-playfair text-4xl mb-2">
                {locale === 'en' ? 'Conscious Design' : 'Diseño Consciente'}
              </h2>
              <p className="text-white/70 uppercase tracking-widest text-xs font-bold">
                {locale === 'en' ? 'Interior Customization & Lifestyle' : 'Personalización de Interiores & Lifestyle'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Copy Section */}
      <section className="py-24 px-6 lg:px-12 bg-stone-50 border-y border-slate-100">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-8"
          >
            {locale === 'en' ? (
              <>A purchasing process <span className="text-secondary italic">tailored to you.</span></>
            ) : (
              <>Un proceso de compra <span className="text-secondary italic">diseñado a tu medida.</span></>
            )}
          </motion.h2>
          <div className="space-y-6 text-slate-600 text-lg font-light leading-relaxed">
            <p>
              {locale === 'en' ? 'We know that choosing your home in the heart of the Caribbean is an important decision. That is why our Customer Service and Post-Sales service is designed to accompany you from anywhere in the world—New York, Madrid, Medellin, or Santo Domingo—and facilitate every choice.' : 'Sabemos que elegir tu vivienda en el corazón del Caribe es una decisión importante. Por eso, nuestro servicio de Atención al Cliente y Postventa está diseñado para acompañarte desde cualquier lugar del mundo —Nueva York, Madrid, Medellín o Santo Domingo— y facilitarte cada elección.'}
            </p>
            <p>
              {locale === 'en' ? 'We understand accompaniment as a continuous, close, and human service. A service that answers questions, anticipates needs, and simplifies processes, so you can focus on what is truly important: enjoying your new home.' : 'Entendemos el acompañamiento como un servicio continuo, cercano y humano. Un servicio que resuelve dudas, anticipa necesidades y simplifica procesos, para que puedas centrarte en lo verdaderamente importante: disfrutar de tu nuevo hogar.'}
            </p>
          </div>
        </div>
      </section>

      {/* Key Pillars - Bento Style */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: HandHeart,
                title: locale === 'en' ? "Accompaniment" : "Acompañamiento",
                text: locale === 'en' ? "A personalized, close, and professional service that guarantees clarity and confidence at every milestone of the project." : "Un servicio personalizado, cercano y profesional que garantiza claridad y confianza en cada hito del proyecto."
              },
              {
                icon: PaintBucket,
                title: locale === 'en' ? "Interior Design" : "Interiorismo",
                text: locale === 'en' ? "Spaces designed for well-being. Unique environments where light and materials create timeless homes." : "Espacios pensados desde el bienestar. Entornos únicos donde la luz y los materiales crean viviendas atemporales."
              },
              {
                icon: Layers,
                title: locale === 'en' ? "Materiality" : "Materialidad",
                text: locale === 'en' ? "Each material has been chosen for its quality and durability. Noble finishes that combine design and sustainability." : "Cada material ha sido elegido por su calidad y durabilidad. Acabados nobles que combinan diseño y sostenibilidad."
              },
              {
                icon: Key,
                title: locale === 'en' ? "Full Management" : "Gestión Full",
                text: locale === 'en' ? "The entire process necessary to activate the real profitability of the property, worry-free for the owner." : "Todo el proceso necesario para activar la rentabilidad real de la propiedad, sin preocupaciones para el propietario."
              }
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-stone-50/50 p-10 border border-slate-100 hover:border-secondary transition-all group"
              >
                <div className="w-12 h-12 bg-primary/5 text-primary flex items-center justify-center mb-8 group-hover:bg-secondary group-hover:text-white transition-all">
                  <pillar.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{pillar.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm font-light">
                  {pillar.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Markers & Brands */}
      <section className="py-24 px-6 lg:px-12 bg-stone-50 border-y border-slate-100 mt-16">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-secondary uppercase tracking-[0.3em] font-bold text-xs mb-4">
              {locale === 'en' ? 'Quality Alliances' : 'Alianzas de Calidad'}
            </p>
            <h2 className="font-playfair text-4xl text-primary">
              {locale === 'en' ? 'Allied International Brands' : 'Firmas Internacionales Aliadas'}
            </h2>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all">
            <div className="flex flex-col items-center gap-2">
              <svg viewBox="0 0 120 40" className="h-10 fill-primary" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 0C4.7 0 0 4.7 0 10.5v19C0 35.3 4.7 40 10.5 40h99c5.8 0 10.5-4.7 10.5-10.5v-19C120 4.7 115.3 0 109.5 0h-99zm21.8 12.3c3.2 0 5.8 1.4 6.9 4h-4c-.7-1-2-1.6-3.4-1.6-2.5 0-4.5 1.7-4.5 4s2 4 4.5 4c1.4 0 2.7-.6 3.4-1.6h4c-1.1 2.6-3.7 4-6.9 4-4.8 0-8.5-3.5-8.5-8.2s3.7-8.2 8.5-8.2zm18 0c4.8 0 8.5 3.5 8.5 8.2s-3.7 8.2-8.5 8.2-8.5-3.5-8.5-8.2 3.7-8.2 8.5-8.2zm0 3.2c-2.6 0-4.6 1.8-4.6 5s2 5 4.6 5 4.6-1.8 4.6-5-2-5-4.6-5zm18.3-3.2c3.2 0 5.8 1.4 6.9 4h-4c-.7-1-2-1.6-3.4-1.6-2.5 0-4.5 1.7-4.5 4s2 4 4.5 4c1.4 0 2.7-.6 3.4-1.6h4c-1.1 2.6-3.7 4-6.9 4-4.8 0-8.5-3.5-8.5-8.2s3.7-8.2 8.5-8.2zm18.3 0h3.8l8.2 16h-4.2l-1.5-3.2H87.3L85.8 28.3h-4l8.5-16zm4 9.8l-2.4 5h4.8l-2.4-5z" /></svg>
              <p className="text-[10px] font-bold text-slate-400">{locale === 'en' ? 'Sanitary & Faucets' : 'Sanitarios & Grifería'}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl font-black tracking-tighter text-primary/80 uppercase">Concremax</span>
              <p className="text-[10px] font-bold text-slate-400">{locale === 'en' ? 'Structural Efficiency' : 'Eficiencia Estructural'}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl font-black tracking-normal text-primary/70 uppercase">Ferralia</span>
              <p className="text-[10px] font-bold text-slate-400">{locale === 'en' ? 'Steel & Technology' : 'Acero & Tecnología'}</p>
            </div>
          </div>

          <p className="text-center text-slate-400 mt-16 max-w-2xl mx-auto text-sm font-light italic">
            {locale === 'en' ? '"Our commitment to the Dominican Republic requires working only with leading brands that provide security to our global community of investors."' : '"Nuestra apuesta por República Dominicana exige trabajar únicamente con marcas líderes que aporten seguridad a nuestra comunidad global de inversores."'}
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 lg:px-12 bg-primary text-white text-center">
        <div className="container mx-auto max-w-3xl">
          <Headphones className="w-12 h-12 text-secondary mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-8">
            {locale === 'en' ? (
              <>Ready to take <br />the next step?</>
            ) : (
              <>¿Preparado para dar <br />el siguiente paso?</>
            )}
          </h2>
          <p className="text-xl text-slate-300 font-light mb-12">
            {locale === 'en' ? 'Our international advisors and the Post-Sales team are at your full disposal. Because investing in the Caribbean should be an experience full of certainties.' : 'Nuestros asesores internacionales y el equipo de Postventa están a su total disposición. Porque invertir en el Caribe debería ser una experiencia llena de certezas.'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              href="/contacto"
              className="px-10 py-5 bg-secondary text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-primary transition-all flex items-center justify-center gap-3"
            >
              {locale === 'en' ? 'Contact a Specialist' : 'Contactar con un Especialista'} <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+18297611316" className="px-10 py-5 bg-white/5 border border-white/20 text-white font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-white hover:text-primary transition-all text-center">
              {locale === 'en' ? 'Support:' : 'Soporte:'} +1 829 761 1316
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
