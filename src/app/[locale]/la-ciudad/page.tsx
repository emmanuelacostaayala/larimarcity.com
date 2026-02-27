"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mountain, Users, Building, ArrowRight, Sun, Coffee } from "lucide-react";
import { useRef } from "react";
import { useLocale } from "next-intl";

export default function LaCiudadPage() {
  const locale = useLocale();
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
            src="/images/original/LARIMAR_MASTERPLAN_Foto.webp"
            alt="Visión de Larimar City & Resort"
            fill
            className="object-cover object-bottom"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a101f] via-[#0a101f]/70 to-transparent" />
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
              <span className="px-4 py-2 border border-gold/30 rounded-full bg-gold/10 text-gold uppercase tracking-[0.2em] text-xs font-bold backdrop-blur-sm shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                {locale === 'en' ? '100 Meters Above Sea Level' : '100 Metros Sobre el Nivel del Mar'}
              </span>
            </div>

            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[1.1]">
              {locale === 'en' ? (
                <>A New <br /><span className="text-gold italic">Perspective</span> <br />of Punta Cana.</>
              ) : (
                <>Una Nueva <br /><span className="text-gold italic">Perspectiva</span> <br />de Punta Cana.</>
              )}
            </h1>

            <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl leading-relaxed mb-10">
              {locale === 'en' ? (
                <>Strategically located on the imposing <strong className="text-white font-semibold">Verón Cliff</strong>, Larimar City & Resort is not just a residential complex; it's the Caribbean's first garden city designed from scratch to defy the limits of engineering and luxury.</>
              ) : (
                <>Ubicada estratégicamente en el imponente <strong className="text-white font-semibold">Farallón de Verón</strong>, Larimar City & Resort no es solo un complejo residencial; es la primera ciudad jardín del Caribe diseñada desde cero para desafiar los límites de la ingeniería y el lujo.</>
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Vision Concept */}
      <section className="py-24 bg-[#0a101f] relative z-20 mt-12">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-8"
            >
              <h2 className="font-playfair text-4xl md:text-5xl text-white">
                {locale === 'en' ? (
                  <>The Challenge of the <br /><span className="text-gold italic">Extraordinary.</span></>
                ) : (
                  <>El Desafío de lo <br /><span className="text-gold italic">Extraordinario.</span></>
                )}
              </h2>

              <div className="space-y-6 text-white/70 font-light leading-relaxed">
                <p>
                  {locale === 'en' ? 'When CLERHP Group envisioned Larimar City, the goal was not simply to build more rooms in Punta Cana. The purpose was to solve the lack of planned and sustainable urbanism in the most active tourist destination in the Caribbean.' : 'Cuando Grupo CLERHP imaginó Larimar City, el objetivo no era simplemente construir más habitaciones en Punta Cana. El propósito era resolver la falta de un urbanismo planificado y sostenible en el destino turístico más activo del Caribe.'}
                </p>
                <p>
                  {locale === 'en' ? (
                    <>We chose the Cliff for its unique elevation. At 100 meters above sea level, we offer a privileged microclimate with cooler temperatures, natural protection and, above all, an <strong className="text-white font-semibold">uninterrupted panoramic view of all Punta Cana and the Atlantic Ocean</strong> that no other downhill property can match.</>
                  ) : (
                    <>Elegimos el Farallón por su elevación única. A 100 metros sobre el nivel del mar, ofrecemos un microclima privilegiado con temperaturas más frescas, protección natural y, sobre todo, una <strong className="text-white font-semibold">vista panorámica ininterrumpida de todo Punta Cana y el Océano Atlántico</strong> que ninguna otra propiedad terreno abajo puede igualar.</>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-4">
                <div className="bg-[#121c30] p-6 border border-white/5">
                  <Mountain className="w-8 h-8 text-gold mb-4" />
                  <h4 className="text-xl font-playfair text-white mb-2">{locale === 'en' ? 'Microclimate' : 'Microclima'}</h4>
                  <p className="text-white/50 text-sm">{locale === 'en' ? 'Natural elevation that provides constant breezes and humidity mitigation.' : 'Elevación natural que proporciona brisas constantes y mitigación de humedad.'}</p>
                </div>
                <div className="bg-[#121c30] p-6 border border-white/5">
                  <Building className="w-8 h-8 text-gold mb-4" />
                  <h4 className="text-xl font-playfair text-white mb-2">Smart City</h4>
                  <p className="text-white/50 text-sm">{locale === 'en' ? '3 Million sq meters of infrastructure and European landscaping.' : '3 Millones de m² de infraestructura y paisajismo europeo.'}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] lg:h-[700px] w-full mt-10 lg:mt-0"
            >
              <Image
                src="/images/original/Farallon_Fase-1_larimar-city-1536x864.webp"
                alt="El Farallón de Larimar City"
                fill
                className="object-cover object-center lg:object-left rounded-sm"
                quality={100}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 border border-white/20 rounded-sm" />

              {/* Floating Stat */}
              <div className="absolute bottom-10 -left-10 bg-[#0a101f] border border-gold/30 p-8 max-w-xs shadow-2xl">
                <p className="font-playfair text-5xl text-gold mb-2">22K+</p>
                <p className="text-white font-bold text-sm tracking-widest uppercase mb-2">
                  {locale === 'en' ? 'Projected Homes' : 'Viviendas Proyectadas'}
                </p>
                <p className="text-white/50 text-xs">
                  {locale === 'en' ? 'A long-term development that will transform the demographics of the eastern zone.' : 'Un desarrollo a largo plazo que transformará la demografía de la zona este.'}
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* City Components (Boardwalk, Leisure) */}
      <section className="py-24 bg-[#121c30] overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="font-playfair text-4xl text-white mb-6">
              {locale === 'en' ? 'A City Within the City' : 'Una Ciudad Dentro de la Ciudad'}
            </h2>
            <p className="text-white/60 font-light">
              {locale === 'en' ? (
                <>Larimar City was planned under the European concept of the "15-minute City". Everything you need for a luxury lifestyle or a perfect vacation is just steps from your door.</>
              ) : (
                <>Larimar City fue planificada bajo el concepto europeo de la "Ciudad de 15 minutos". Todo lo que necesitas para una vida de lujo o unas vacaciones perfectas está a unos pasos de tu puerta.</>
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                img: "/images/original/amenities-malecon.webp",
                title: locale === 'en' ? "The Boardwalk" : "El Malecón",
                icon: <Sun />,
                desc: locale === 'en' ? "A promenade of more than 3km bordering the cliff. Perfect for sunsets and premium nightlife with restaurants and terraces." : "Un paseo marítimo de más de 3km bordeando el farallón. Perfecto para atardeceres y vida nocturna premium con restaurantes y terrazas."
              },
              {
                img: "/images/original/amenities-golf.webp",
                title: locale === 'en' ? "Sports & Wellness" : "Deporte y Bienestar",
                icon: <Users />,
                desc: locale === 'en' ? "Country club, 18-hole par 72 golf course, paddle tennis, tennis courts, and wellness center." : "Club de campo, campo de golf de 18 hoyos par 72, canchas de pádel, tenis y wellness center."
              },
              {
                img: "/images/original/amenities-casino.webp",
                title: locale === 'en' ? "Exclusive Leisure" : "Ocio Exclusivo",
                icon: <Coffee />,
                desc: locale === 'en' ? "Casino, spectacular Beach Club with crystal-clear infinity pools simulating beaches, and family recreation areas." : "Casino, Beach Club espectacular con piscinas infinitas cristalinas simulando playas, y áreas de recreación familiar."
              }
            ].map((item, idx) => (
              <Link href="/amenidades" key={idx}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative h-64 mb-6 overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-[#0a101f]/30 group-hover:bg-transparent transition-colors" />
                  </div>
                  <div className="flex gap-4">
                    <div className="text-gold shrink-0">{item.icon}</div>
                    <div>
                      <h3 className="font-playfair text-2xl text-white mb-2 group-hover:text-gold transition-colors">{item.title}</h3>
                      <p className="text-white/60 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/proyectos"
              className="inline-flex items-center gap-3 px-10 py-5 border border-white text-white hover:bg-white hover:text-[#0a101f] transition-colors uppercase tracking-widest text-sm font-semibold"
            >
              {locale === 'en' ? 'Discover Phase I' : 'Conocer la Fase I'}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
