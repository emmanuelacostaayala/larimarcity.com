"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HandHeart, PaintBucket, Layers, Key, CheckCircle, Headphones, Building2, ArrowRight } from "lucide-react";

export default function PostventaPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Editorial Hero with "Margen Blanco" */}
      <section className="relative pt-32 pb-20 px-6 lg:px-12 bg-white">
        <div className="container mx-auto">
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
                  Más que una <br />
                  <span className="text-secondary italic">Inversión.</span>
                </h1>
                <p className="text-slate-500 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                  En Larimar City & Resort, el acompañamiento personal es el centro de nuestra filosofía. Creamos hogares, no solo edificios, guiándote desde cualquier lugar del mundo hasta que recibes tus llaves.
                </p>
              </motion.div>
            </div>
            <div className="lg:col-span-4 pb-4">
              <div className="p-8 bg-stone-50 border border-slate-100 rounded-sm">
                <p className="text-xs uppercase tracking-widest font-bold text-primary mb-4">Línea de Atención</p>
                <p className="text-2xl font-playfair font-bold text-primary mb-2">+1 829 761 1316</p>
                <p className="text-slate-500 text-sm font-light">Asistencia personalizada 24/7 para inversores internacionales.</p>
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
              <h2 className="text-white font-playfair text-4xl mb-2">Diseño Consciente</h2>
              <p className="text-white/70 uppercase tracking-widest text-xs font-bold">Personalización de Interiores & Lifestyle</p>
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
            Un proceso de compra <span className="text-secondary italic">diseñado a tu medida.</span>
          </motion.h2>
          <div className="space-y-6 text-slate-600 text-lg font-light leading-relaxed">
            <p>
              Sabemos que elegir tu vivienda en el corazón del Caribe es una decisión importante. Por eso, nuestro servicio de Atención al Cliente y Postventa está diseñado para acompañarte desde cualquier lugar del mundo —Nueva York, Madrid, Medellín o Santo Domingo— y facilitarte cada elección.
            </p>
            <p>
              Entendemos el acompañamiento como un servicio continuo, cercano y humano. Un servicio que resuelve dudas, anticipa necesidades y simplifica procesos, para que puedas centrarte en lo verdaderamente importante: disfrutar de tu nuevo hogar.
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
                title: "Acompañamiento",
                text: "Un servicio personalizado, cercano y profesional que garantiza claridad y confianza en cada hito del proyecto."
              },
              {
                icon: PaintBucket,
                title: "Interiorismo",
                text: "Espacios pensados desde el bienestar. Entornos únicos donde la luz y los materiales crean viviendas atemporales."
              },
              {
                icon: Layers,
                title: "Materialidad",
                text: "Cada material ha sido elegido por su calidad y durabilidad. Acabados nobles que combinan diseño y sostenibilidad."
              },
              {
                icon: Key,
                title: "Gestión Full",
                text: "Todo el proceso necesario para activar la rentabilidad real de la propiedad, sin preocupaciones para el propietario."
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
            <p className="text-secondary uppercase tracking-[0.3em] font-bold text-xs mb-4">Alianzas de Calidad</p>
            <h2 className="font-playfair text-4xl text-primary">Firmas Internacionales Aliadas</h2>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all">
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl font-bold tracking-tighter text-primary">ROCA</span>
              <p className="text-[10px] font-bold text-slate-400">Sanitarios & Grifería</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl font-bold tracking-tighter text-primary">CONCREMAX</span>
              <p className="text-[10px] font-bold text-slate-400">Eficiencia Estructural</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl font-bold tracking-tighter text-primary">FERRALIA</span>
              <p className="text-[10px] font-bold text-slate-400">Acero & Tecnología</p>
            </div>
          </div>

          <p className="text-center text-slate-400 mt-16 max-w-2xl mx-auto text-sm font-light italic">
            "Nuestra apuesta por República Dominicana exige trabajar únicamente con marcas líderes que aporten seguridad a nuestros clientes en Europa y América."
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 lg:px-12 bg-primary text-white text-center">
        <div className="container mx-auto max-w-3xl">
          <Headphones className="w-12 h-12 text-secondary mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-8">¿Preparado para dar <br />el siguiente paso?</h2>
          <p className="text-xl text-slate-300 font-light mb-12">
            Nuestros asesores internacionales y el equipo de Postventa están a su total disposición. Porque invertir en el Caribe debería ser una experiencia llena de certezas.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              href="/contacto"
              className="px-10 py-5 bg-secondary text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-primary transition-all flex items-center justify-center gap-3"
            >
              Contactar con un Especialista <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="px-10 py-5 bg-white/5 border border-white/20 text-white font-bold uppercase tracking-widest text-xs rounded-sm">
              Soporte: +1 829 761 1316
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
