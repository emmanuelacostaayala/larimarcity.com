"use client";

import Hero from "@/components/Hero";
import { ArrowRight, MapPin, Building2, Droplets, Users, Calendar } from "lucide-react";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

const content = {
  es: {
    appointmentTitle: "Concertar una cita",
    appointmentDesc: "Reserva un tramo horario con nuestros Investment Advisors",
    btnSchedule: "Agendar",
    introBadge: "Fase I | Larimar City & Resort",
    introTitle_1: "La primera",
    introTitle_2: "Smart City",
    introTitle_3: "del Caribe",
    introDesc: "Una ciudad de lujo diseñada para inversionistas visionarios, donde la sofisticación caribeña y las oportunidades inmobiliarias exclusivas se fusionan para ofrecer un retorno excepcional.",
    introQuote: '"Fusión de edificios innovadores, tecnológicos y respetuosos con el medio ambiente, con amplios espacios en perfecta conexión natural."',
    btnProjects: "Descubrir Proyectos",
    servicesTitle: "Servicios &",
    servicesTitleHighlight: "Amenities",
    servicesDesc: "Diseñado para ofrecer una experiencia integral de bienestar y sofisticación. Explora las comodidades gigantescas que redefinen el concepto de resort living.",
    amenities: [
      { category: "01 / Principal", title: "Beach Club Exclusivo", desc: "Piscina privada con solárium, piscina infinity con barra, y experiencias únicas sobre el farallón." },
      { category: "02 / Deportes", title: "Campos de Golf", desc: "Uno de 9 hoyos (par 3) en el Promenade y otro de 18 hoyos inmerso en la naturaleza." },
      { category: "03 / Gastronomía", title: "Restaurante Origen", desc: "Terrazas y una encantadora palapa con el mejor ambiente tropical." },
      { category: "04 / Gastronomía", title: "Restaurante Amanalú", desc: "Sabores únicos y un espacio chillout altamente selecto." },
      { category: "05 / Wellness", title: "Beauty District & Spa", desc: "Distrito diseñado para tratamientos exclusivos, relajación profunda y salones de belleza premium." }
    ],
    masterplanBadge: "Masterplan de la ciudad",
    masterplanTitle_1: "Garantía de servicios desde la",
    masterplanTitle_2: "primera etapa",
    masterplanDesc: "Con el respaldo de estrictos estándares de seguridad y una demanda en constante crecimiento, este proyecto no es solo una arquitectura visionaria, sino un vehículo financiero de alta rentabilidad asegurada.",
    btnPhase: "Ver Fases Completas",
    projectsTitle: "Joyas Arquitectónicas",
    projectsDesc: "Diseños paramétricos de vanguardia y exclusividad que desafían el horizonte sobre el farallón de Verón.",
    projects: [
      { id: "01", title: "Townhouses Adosados", desc: "Villas adosadas de lujo dispuestas en abanico con acceso inmediato y vistas sin restricciones a nuestros campos de golf de autor.", stats: [{ value: "3", label: "Dormitorios" }, { value: "Private", label: "Piscina & Terraza" }], link: "/villas", btn: "Ver Disponibilidad" },
      { id: "02", title: "Horizon View", desc: "Un complejo de alta densidad elevado a 100 metros sobre el mar, marcando el pináculo de las residencias tipo resort en Punta Cana.", stats: [{ value: "422", label: "Apartamentos" }, { value: "2-3", label: "Dormitorios" }], link: "/horizon-view", btn: "Explorar Elevación" },
      { id: "03", title: "Prime Towers", desc: "Evolución estructural en torres curvas. Penthouses exquisitos donde la rentabilidad se fusiona con el diseño orgánico.", stats: [{ value: "138", label: "Unidades VIP" }, { value: "6", label: "Penthouses" }], link: "/prime-towers", btn: "Ver Unidades" }
    ],
    connectivityTitle_1: "Conectividad",
    connectivityTitle_2: "Inigualable",
    connectivityDesc: "Un entorno estratégico rodeado de las comodidades y accesos más importantes de la región Este.",
    transportCat: "Transporte & Accesos",
    healthCat: "Hospital & Health",
    mapLabel: "[ Conector API Maps ]",
    blogTitle_1: "Actualidad",
    blogTitle_2: "&",
    blogTitle_3: "Prensa",
    blogDesc: "Descubre los avances del proyecto, consejos de inversión y tendencias inmobiliarias de élite.",
    btnAllNews: "Ver todas",
    blogs: [
      { cat: "Inversión", time: "Hace 1 Sem", title: "Por qué el modelo de Smart City atrae a inversores globales" },
      { cat: "Lifestyle", time: "Hace 2 Sem", title: "El estilo de vida resort: Redefiniendo el lujo absoluto en Punta Cana" },
      { cat: "Desarrollo", time: "Hace 1 Mes", title: "Avances del Masterplan Fase 1: Infraestructuras al 40%" }
    ],
    ctaTitle: "Convierte tu visión en realidad",
    ctaDesc: "Únete a una comunidad exclusiva de inversores y residentes. Nuestro equipo de asesores internacionales te guiará en cada paso.",
    btnBuy: "Comprar en Punta Cana",
    btnB2B: "Acceso Brokers (B2B)",
    airport: "Aeropuerto Int. Punta Cana",
    downtown: "Downtown Punta Cana",
    hospital: "Centro Médico IMG"
  },
  en: {
    appointmentTitle: "Schedule an appointment",
    appointmentDesc: "Book a time slot with our Investment Advisors",
    btnSchedule: "Schedule",
    introBadge: "Phase I | Larimar City & Resort",
    introTitle_1: "The Caribbean's first",
    introTitle_2: "Smart City",
    introTitle_3: "",
    introDesc: "A luxury city designed for visionary investors, where Caribbean sophistication and exclusive real estate opportunities merge to offer exceptional returns.",
    introQuote: '"Fusion of innovative, technological and environmentally friendly buildings, with ample spaces in perfect natural connection."',
    btnProjects: "Discover Projects",
    servicesTitle: "Services &",
    servicesTitleHighlight: "Amenities",
    servicesDesc: "Designed to offer a comprehensive experience of well-being and sophistication. Explore the massive amenities that redefine the concept of resort living.",
    amenities: [
      { category: "01 / Main", title: "Exclusive Beach Club", desc: "Private pool with solarium, infinity pool with bar, and unique experiences on the cliff." },
      { category: "02 / Sports", title: "Golf Courses", desc: "A 9-hole (par 3) on the Promenade and an 18-hole course immersed in nature." },
      { category: "03 / Gastronomy", title: "Origen Restaurant", desc: "Terraces and a charming palapa with the best tropical atmosphere." },
      { category: "04 / Gastronomy", title: "Amanalú Restaurant", desc: "Unique flavors and a highly select chillout space." },
      { category: "05 / Wellness", title: "Beauty District & Spa", desc: "District designed for exclusive treatments, deep relaxation and premium beauty salons." }
    ],
    masterplanBadge: "City Masterplan",
    masterplanTitle_1: "Service guarantee from the",
    masterplanTitle_2: "first phase",
    masterplanDesc: "Backed by strict security standards and constantly growing demand, this project is not only visionary architecture but a highly profitable financial vehicle.",
    btnPhase: "View Full Phases",
    projectsTitle: "Architectural Jewels",
    projectsDesc: "Avant-garde and exclusive parametric designs challenging the horizon over the Verón cliff.",
    projects: [
      { id: "01", title: "Townhouses", desc: "Luxury attached villas arranged in a fan shape with direct access and unrestricted views to our signature golf courses.", stats: [{ value: "3", label: "Bedrooms" }, { value: "Private", label: "Pool & Terrace" }], link: "/villas", btn: "Check Availability" },
      { id: "02", title: "Horizon View", desc: "A high-density complex elevated 100 meters above the sea, marking the pinnacle of resort-style residences in Punta Cana.", stats: [{ value: "422", label: "Apartments" }, { value: "2-3", label: "Bedrooms" }], link: "/horizon-view", btn: "Explore Elevation" },
      { id: "03", title: "Prime Towers", desc: "Structural evolution in curved towers. Exquisite penthouses where profitability merges with organic design.", stats: [{ value: "138", label: "VIP Units" }, { value: "6", label: "Penthouses" }], link: "/prime-towers", btn: "View Units" }
    ],
    connectivityTitle_1: "Unrivaled",
    connectivityTitle_2: "Connectivity",
    connectivityDesc: "A strategic environment surrounded by the most important amenities and accesses in the Eastern region.",
    transportCat: "Transport & Access",
    healthCat: "Hospital & Health",
    mapLabel: "[ API Map Connector ]",
    blogTitle_1: "News",
    blogTitle_2: "&",
    blogTitle_3: "Press",
    blogDesc: "Discover project updates, investment tips, and elite real estate trends.",
    btnAllNews: "View All",
    blogs: [
      { cat: "Investment", time: "1 Wk Ago", title: "Why the Smart City model attracts global investors" },
      { cat: "Lifestyle", time: "2 Wks Ago", title: "Resort lifestyle: Redefining absolute luxury in Punta Cana" },
      { cat: "Development", time: "1 Mo Ago", title: "Phase 1 Masterplan Progress: Infrastructure at 40%" }
    ],
    ctaTitle: "Turn your vision into reality",
    ctaDesc: "Join an exclusive community of investors and residents. Our international advisory team will guide you every step of the way.",
    btnBuy: "Buy in Punta Cana",
    btnB2B: "Broker Access (B2B)",
    airport: "Punta Cana Int. Airport",
    downtown: "Downtown Punta Cana",
    hospital: "IMG Medical Center"
  }
};

export default function Home() {
  const locale = useLocale();
  const t = locale === 'en' ? content.en : content.es;

  return (
    <main className="min-h-screen bg-stone-50">
      <Hero />

      {/* Floating Schedule Visit Bar (Web45 Reference) */}
      <section className="bg-primary text-white py-8 px-6 lg:px-12 border-b border-white/10 relative z-10 shadow-xl">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h3 className="text-xl font-playfair font-bold text-white">{t.appointmentTitle}</h3>
              <p className="text-sm text-slate-300">{t.appointmentDesc}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center md:justify-end flex-1">
            {['09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00'].map((time) => (
              <button key={time} className="px-4 py-2 text-sm border border-white/20 rounded-sm hover:bg-secondary hover:border-secondary transition-colors text-slate-200">
                {time}
              </button>
            ))}
            <Link href={`/${locale}/agenda`} className="px-6 py-2 bg-secondary text-white text-sm font-semibold rounded-sm hover:bg-white hover:text-primary transition-colors flex items-center ml-2">
              {t.btnSchedule} <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-32 px-6 lg:px-12 bg-white overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-5 relative z-10"
            >
              <span className="text-secondary tracking-[0.3em] text-sm uppercase font-bold mb-6 block">
                {t.introBadge}
              </span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-primary mb-8 leading-[1.1] tracking-tight">
                {t.introTitle_1} <br /><span className="italic font-light">{t.introTitle_2}</span><br /> {t.introTitle_3}
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed font-light">
                {t.introDesc}
              </p>

              <div className="bg-stone-50 p-8 rounded-tr-3xl rounded-bl-3xl border-l-4 border-secondary/50 mb-10 shadow-sm relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent">
                <p className="text-primary italic font-playfair text-xl md:text-2xl leading-relaxed relative z-10 font-medium">
                  {t.introQuote}
                </p>
              </div>

              <Link
                href={`/${locale}/proyectos`}
                className="group relative inline-flex items-center font-bold text-primary pb-2 uppercase tracking-widest text-sm overflow-hidden"
              >
                <span>{t.btnProjects}</span>
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-secondary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="lg:col-span-7 relative h-[600px] lg:h-[850px] rounded-sm overflow-hidden group shadow-2xl"
            >
              <img
                src="/images/original/villa-larimar-city-diseno-1536x864.webp"
                alt="Larimar City Masterplan Fase 1"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
              />
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/0 transition-colors duration-1000"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ultra-Modern Services and Amenities Grid (2026 Bento Box) */}
      <section className="py-32 px-6 lg:px-12 bg-slate-950 text-white border-t border-slate-900">
        <div className="container mx-auto max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
          >
            <div className="max-w-3xl">
              <h2 className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6 leading-tight">{t.servicesTitle} <span className="font-light italic text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">{t.servicesTitleHighlight}</span></h2>
              <p className="text-xl text-slate-400 font-light">
                {t.servicesDesc}
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 auto-rows-auto">
            {/* AMENITY 1 (MASSIVE) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 }}
              className="group relative h-[400px] lg:h-[600px] rounded-sm overflow-hidden cursor-pointer lg:col-span-2"
            >
              <img src="/images/original/larimarcity-fondo1-1.webp" alt="Beach Club" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-1000"></div>
              <div className="absolute bottom-10 left-10 max-w-lg">
                <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-3 block">{t.amenities[0].category}</span>
                <h3 className="text-4xl lg:text-5xl font-playfair font-bold text-white mb-4">{t.amenities[0].title}</h3>
                <p className="text-lg text-slate-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">{t.amenities[0].desc}</p>
              </div>
            </motion.div>

            {/* AMENITY 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="group relative h-[400px] lg:h-[600px] rounded-sm overflow-hidden cursor-pointer"
            >
              <img src="/images/original/larimarcity-fondo-golf-2.webp" alt="Dos campos de golf" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out object-right" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-1000"></div>
              <div className="absolute bottom-10 left-8 right-8">
                <span className="text-secondary uppercase tracking-[0.3em] text-xs font-bold mb-3 block">{t.amenities[1].category}</span>
                <h3 className="text-3xl font-playfair font-bold text-white mb-4">{t.amenities[1].title}</h3>
                <p className="text-base text-slate-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">{t.amenities[1].desc}</p>
              </div>
            </motion.div>

            {/* AMENITY 3 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="group relative h-[400px] rounded-sm overflow-hidden cursor-pointer"
            >
              <img src="/images/original/larimarcity-fondo-restaurante.webp" alt="Restaurante Origen" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-1000"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-2 block">{t.amenities[2].category}</span>
                <h3 className="text-2xl font-playfair font-bold text-white mb-2">{t.amenities[2].title}</h3>
                <p className="text-sm text-slate-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">{t.amenities[2].desc}</p>
              </div>
            </motion.div>

            {/* AMENITY 4 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="group relative h-[400px] rounded-sm overflow-hidden cursor-pointer"
            >
              <img src="/images/original/larimarcity-fondo-restaurante-2.webp" alt="Restaurante Amanalú" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-1000"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-2 block">{t.amenities[3].category}</span>
                <h3 className="text-2xl font-playfair font-bold text-white mb-2">{t.amenities[3].title}</h3>
                <p className="text-sm text-slate-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">{t.amenities[3].desc}</p>
              </div>
            </motion.div>

            {/* AMENITY 5 (MASSIVE) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="group relative h-[400px] rounded-sm overflow-hidden cursor-pointer lg:col-span-2"
            >
              <img src="/images/original/breezer_towers_interior_bajo_1-1536x864.webp" alt="Beauty District" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-1000"></div>
              <div className="absolute bottom-8 left-10">
                <span className="text-secondary uppercase tracking-[0.3em] text-xs font-bold mb-3 block">{t.amenities[4].category}</span>
                <h3 className="text-3xl lg:text-4xl font-playfair font-bold text-white mb-3">{t.amenities[4].title}</h3>
                <p className="text-base text-slate-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">{t.amenities[4].desc}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Masterplan & Services Assurance */}
      <section className="py-32 px-6 lg:px-12 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-xl"
            >
              <span className="text-secondary tracking-[0.3em] text-sm uppercase font-bold mb-6 block">
                {t.masterplanBadge}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-8 leading-tight">
                {t.masterplanTitle_1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white">{t.masterplanTitle_2}</span>
              </h2>
              <p className="text-lg text-slate-300 font-light mb-10 leading-relaxed">
                {t.masterplanDesc}
              </p>
              <Link href={`/${locale}/fase-i-larimar-city-resort`} className="group flex items-center gap-4 hover:cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white transition-colors duration-500">
                  <ArrowRight className="w-5 h-5 text-white group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm font-bold tracking-widest uppercase border-b border-transparent group-hover:border-white transition-all duration-300">{t.btnPhase}</span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="relative h-[500px] lg:h-[700px] w-full rounded-sm overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] group"
            >
              <img src="/images/original/LARIMAR_MASTERPLAN_Foto.webp" alt="Mapa Detallado Larimar City" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms] ease-out" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Magazine Editorial Property Catalog (Overlapping Layouts) */}
      <section className="py-32 px-6 lg:px-12 bg-stone-50 overflow-hidden">
        <div className="container mx-auto max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-24"
          >
            <h2 className="text-5xl md:text-7xl font-playfair font-bold text-primary mb-6">{t.projectsTitle}</h2>
            <p className="text-xl text-slate-600 max-w-3xl font-light mx-auto">
              {t.projectsDesc}
            </p>
          </motion.div>

          <div className="space-y-32">

            {/* Project 1: Townhouses (Overlapping Right) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="flex flex-col lg:flex-row items-center relative"
            >
              <div className="w-full lg:w-[65%] relative h-[500px] lg:h-[700px] rounded-sm overflow-hidden group shadow-2xl z-0">
                <img src="/images/original/TownHauses_4-1-ri4w1xsw9ixqyzeca6571uwwit1dr22tt235hm6afg.webp" alt="Townhouses Adosados" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms] ease-out" />
              </div>
              <div className="w-full lg:w-[45%] lg:-ml-32 mt-[-50px] lg:mt-0 relative z-10 bg-white p-10 lg:p-16 shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-slate-100 rounded-sm">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-4xl md:text-5xl font-playfair font-bold text-primary">{t.projects[0].title}</h3>
                  <span className="text-secondary opacity-50 font-playfair text-5xl select-none leading-none mt-1">{t.projects[0].id}</span>
                </div>
                <p className="text-lg text-slate-600 font-light mb-10 leading-relaxed">{t.projects[0].desc}</p>

                <div className="grid grid-cols-2 gap-8 mb-10 border-t border-b border-slate-100 py-6">
                  <div>
                    <p className="text-3xl font-light text-primary">{t.projects[0].stats[0].value}</p>
                    <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mt-1">{t.projects[0].stats[0].label}</p>
                  </div>
                  <div>
                    <p className="text-3xl font-light text-primary">{t.projects[0].stats[1].value}</p>
                    <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mt-1">{t.projects[0].stats[1].label}</p>
                  </div>
                </div>
                <Link href={`/${locale}${t.projects[0].link}`} className="group flex items-center font-bold text-primary text-sm uppercase tracking-widest">
                  {t.projects[0].btn} <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Project 2: Horizon View (Overlapping Left) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="flex flex-col lg:flex-row-reverse items-center relative"
            >
              <div className="w-full lg:w-[65%] relative h-[500px] lg:h-[700px] rounded-sm overflow-hidden group shadow-2xl z-0">
                <img src="/images/original/Horizon-View_8-ri5kqdv6155iqevpdpfjb5uhsw007w5cagi2byv77w.webp" alt="Horizon View" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms] ease-out" />
              </div>
              <div className="w-full lg:w-[45%] lg:-mr-32 mt-[-50px] lg:mt-0 relative z-10 bg-white p-10 lg:p-16 shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-slate-100 rounded-sm">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-4xl md:text-5xl font-playfair font-bold text-primary">{t.projects[1].title}</h3>
                  <span className="text-secondary opacity-50 font-playfair text-5xl select-none leading-none mt-1">{t.projects[1].id}</span>
                </div>
                <p className="text-lg text-slate-600 font-light mb-10 leading-relaxed">{t.projects[1].desc}</p>

                <div className="grid grid-cols-2 gap-8 mb-10 border-t border-b border-slate-100 py-6">
                  <div>
                    <p className="text-3xl font-light text-primary">{t.projects[1].stats[0].value}</p>
                    <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mt-1">{t.projects[1].stats[0].label}</p>
                  </div>
                  <div>
                    <p className="text-3xl font-light text-primary">{t.projects[1].stats[1].value}</p>
                    <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mt-1">{t.projects[1].stats[1].label}</p>
                  </div>
                </div>
                <Link href={`/${locale}${t.projects[1].link}`} className="group flex items-center font-bold text-primary text-sm uppercase tracking-widest">
                  {t.projects[1].btn} <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Project 3: Prime Towers (Overlapping Right) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="flex flex-col lg:flex-row items-center relative"
            >
              <div className="w-full lg:w-[65%] relative h-[500px] lg:h-[700px] rounded-sm overflow-hidden group shadow-2xl z-0">
                <img src="/images/original/prime-tower-penthouse-terraza-1-scaled.webp" alt="Prime Towers" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms] ease-out object-top" />
              </div>
              <div className="w-full lg:w-[45%] lg:-ml-32 mt-[-50px] lg:mt-0 relative z-10 bg-white p-10 lg:p-16 shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-slate-100 rounded-sm">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-4xl md:text-5xl font-playfair font-bold text-primary">{t.projects[2].title}</h3>
                  <span className="text-secondary opacity-50 font-playfair text-5xl select-none leading-none mt-1">{t.projects[2].id}</span>
                </div>
                <p className="text-lg text-slate-600 font-light mb-10 leading-relaxed">{t.projects[2].desc}</p>

                <div className="grid grid-cols-2 gap-8 mb-10 border-t border-b border-slate-100 py-6">
                  <div>
                    <p className="text-3xl font-light text-primary">{t.projects[2].stats[0].value}</p>
                    <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mt-1">{t.projects[2].stats[0].label}</p>
                  </div>
                  <div>
                    <p className="text-3xl font-light text-primary">{t.projects[2].stats[1].value}</p>
                    <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mt-1">{t.projects[2].stats[1].label}</p>
                  </div>
                </div>
                <Link href={`/${locale}${t.projects[2].link}`} className="group flex items-center font-bold text-primary text-sm uppercase tracking-widest">
                  {t.projects[2].btn} <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Geographic Context / Nearby Places (Web45 Reference) */}
      <section className="py-32 px-6 lg:px-12 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-6 leading-tight">{t.connectivityTitle_1} <br /><span className="italic font-light text-secondary">{t.connectivityTitle_2}</span></h2>
              <p className="text-xl text-slate-500 font-light mb-12">{t.connectivityDesc}</p>

              <div className="space-y-6">
                {/* Category: Acceso */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="border border-slate-100 rounded-sm overflow-hidden bg-stone-50 hover:shadow-lg transition-shadow"
                >
                  <div className="px-8 py-5 border-b border-slate-100 flex items-center bg-white">
                    <MapPin className="w-6 h-6 text-secondary mr-4" />
                    <h4 className="font-bold text-primary text-xl font-playfair">{t.transportCat}</h4>
                  </div>
                  <ul className="p-8 space-y-4">
                    <li className="flex justify-between items-center text-base"><span className="text-slate-600 font-light">{t.airport}</span> <span className="text-secondary font-bold tracking-widest text-sm">15 MIN</span></li>
                    <li className="flex justify-between items-center text-base"><span className="text-slate-600 font-light">{t.downtown}</span> <span className="text-secondary font-bold tracking-widest text-sm">10 MIN</span></li>
                  </ul>
                </motion.div>

                {/* Category: Salud */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="border border-slate-100 rounded-sm overflow-hidden bg-stone-50 hover:shadow-lg transition-shadow"
                >
                  <div className="px-8 py-5 border-b border-slate-100 flex items-center bg-white">
                    <Building2 className="w-6 h-6 text-secondary mr-4" />
                    <h4 className="font-bold text-primary text-xl font-playfair">{t.healthCat}</h4>
                  </div>
                  <ul className="p-8 space-y-4">
                    <li className="flex justify-between items-center text-base"><span className="text-slate-600 font-light">{t.hospital}</span> <span className="text-secondary font-bold tracking-widest text-sm">18 MIN</span></li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="relative h-[600px] w-full bg-slate-100 rounded-sm overflow-hidden flex items-center justify-center border border-slate-200 shadow-2xl group"
            >
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+")', backgroundSize: '16px' }} />
              <MapPin className="w-20 h-20 text-slate-300 absolute group-hover:scale-110 transition-transform duration-700 opacity-50 drop-shadow-md" />
              <p className="text-xs text-slate-400 z-10 font-bold uppercase tracking-[0.3em]">{t.mapLabel}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* News & Blog Hook (Web45 Reference) */}
      <section className="py-32 px-6 lg:px-12 bg-stone-50 border-t border-slate-200">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col md:flex-row justify-between items-end mb-16"
          >
            <div>
              <h2 className="text-5xl font-playfair font-bold text-primary mb-4">{t.blogTitle_1} <span className="text-secondary italic font-light">{t.blogTitle_2}</span> {t.blogTitle_3}</h2>
              <p className="text-xl text-slate-500 font-light max-w-2xl">{t.blogDesc}</p>
            </div>
            <Link href={`/${locale}/blog`} className="mt-6 md:mt-0 group flex items-center font-bold text-primary text-sm uppercase tracking-widest">
              {t.btnAllNews} <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Blog Post 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-80 overflow-hidden rounded-sm mb-6 shadow-lg">
                <img src="/images/original/sostenibilidad-larimarcity.webp" alt="Sostenibilidad" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out" />
              </div>
              <div className="flex space-x-4 text-xs font-bold text-secondary uppercase tracking-widest mb-4">
                <span>{t.blogs[0].cat}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-400">{t.blogs[0].time}</span>
              </div>
              <h3 className="text-3xl font-playfair font-bold text-primary group-hover:text-secondary transition-colors line-clamp-3 leading-snug">{t.blogs[0].title}</h3>
            </motion.div>

            {/* Blog Post 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative h-80 overflow-hidden rounded-sm mb-6 shadow-lg">
                <img src="/images/original/chica-larimarcity-sombrero.webp" alt="LifeStyle" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out" />
              </div>
              <div className="flex space-x-4 text-xs font-bold text-secondary uppercase tracking-widest mb-4">
                <span>{t.blogs[1].cat}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-400">{t.blogs[1].time}</span>
              </div>
              <h3 className="text-3xl font-playfair font-bold text-primary group-hover:text-secondary transition-colors line-clamp-3 leading-snug">{t.blogs[1].title}</h3>
            </motion.div>

            {/* Blog Post 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="group cursor-pointer"
            >
              <div className="relative h-80 overflow-hidden rounded-sm mb-6 shadow-lg">
                <img src="/images/original/ciudad-larimar-City-seguridad.webp" alt="Seguridad y Desarrollo" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out" />
              </div>
              <div className="flex space-x-4 text-xs font-bold text-secondary uppercase tracking-widest mb-4">
                <span>{t.blogs[2].cat}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-400">{t.blogs[2].time}</span>
              </div>
              <h3 className="text-3xl font-playfair font-bold text-primary group-hover:text-secondary transition-colors line-clamp-3 leading-snug">{t.blogs[2].title}</h3>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Conversion CTA */}
      <section className="bg-primary text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-primary blur-3xl rounded-full"></div>
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">{t.ctaTitle}</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light">
            {t.ctaDesc}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={`/${locale}/comprar-propiedad-en-punta-cana`}
              className="px-8 py-4 bg-secondary text-white font-semibold hover:bg-white hover:text-primary transition-colors rounded-sm tracking-wide"
            >
              {t.btnBuy}
            </Link>
            <Link
              href={`/${locale}/dashboard-brokers`}
              className="px-8 py-4 bg-transparent border border-white/50 text-white font-semibold hover:bg-white/10 hover:border-white transition-colors rounded-sm tracking-wide"
            >
              {t.btnB2B}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
