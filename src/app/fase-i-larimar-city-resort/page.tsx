import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Map as MapIcon, Home, Trees, Building } from "lucide-react";

export const metadata: Metadata = {
  title: 'Fase I Propiedades | Larimar City & Resort',
  description: 'Descubre el Masterplan y los proyectos residenciales de la Fase I en Larimar City & Resort Punta Cana.',
};

const projects = [
  {
    name: "Live Towers",
    description: "Apartamentos de lujo enfocados en el bienestar y estilo de vida moderno.",
    type: "Residencial",
    image: "/images/original/vista-piscina-edificios-2-600x337.webp",
    link: "/live-towers"
  },
  {
    name: "Horizon View",
    description: "Vistas panorámicas espectaculares del Caribe desde 130 metros de altura.",
    type: "Residencial",
    image: "/images/original/fachada-principal-3-600x337.webp",
    link: "/horizon-view"
  },
  {
    name: "Prime Towers",
    description: "Diseño vanguardista para el inversor exigente en Punta Cana.",
    type: "Residencial",
    image: "/images/original/vista-edificios-esquina-2-600x337.webp",
    link: "/prime-towers"
  },
  {
    name: "Breeze Towers",
    description: "La brisa constante y el lujo caracterizan estos exclusivos apartamentos.",
    type: "Residencial",
    image: "/images/original/vistaza-edificios-esquina-2-600x337.webp",
    link: "/breeze-towers"
  },
  {
    name: "Villas & Townhouses",
    description: "Unidades independientes con acceso directo a campos de golf y amenidades.",
    type: "Villas",
    image: "/images/original/villa-larimar-city-diseno-600x338.webp",
    link: "/villas"
  }
];

export default function FaseIPage() {
  return (
    <main className="min-h-screen bg-stone-50 pt-20">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/60 z-10" />
          <Image
            src="/images/original/LARIMAR_MASTERPLAN_Fases.webp"
            alt="Larimar City Masterplan Fase I"
            fill
            className="object-cover opacity-80"
            priority
          />
        </div>

        <div className="relative z-20 flex flex-col items-center text-center px-6">
          <span className="text-secondary tracking-[0.3em] font-medium uppercase mb-4 text-sm">
            Masterplan & Amenidades
          </span>
          <h1 className="text-white font-playfair text-5xl md:text-7xl font-bold mb-6">
            Fase I <span className="font-light italic text-gold">Proyectos</span>
          </h1>
          <p className="text-slate-200 text-lg max-w-2xl mb-10 font-light">
            Explora la primera fase construida sobre el Farallón de Verón. Un paraíso de innovación que combina residenciales de lujo, espacios verdes y un diseño orgánico en Punta Cana.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <button className="px-8 py-4 bg-secondary text-white hover:bg-white hover:text-primary transition-colors duration-300 flex items-center font-medium rounded-sm">
              Descargar Masterplan <Download className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Property Type Filter / Nav */}
      <section className="bg-white border-b border-slate-200 sticky top-[88px] z-30 shadow-sm hidden md:block">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-12 py-5">
            {[
              { label: "Todo el Desarrollo", icon: MapIcon },
              { label: "Residencial", icon: Building },
              { label: "Villas Privadas", icon: Home },
              { label: "Golf & Amenidades", icon: Trees },
            ].map((filter, i) => (
              <button key={i} className="flex items-center space-x-2 text-slate-500 hover:text-primary transition-colors font-medium border-b-[3px] border-transparent hover:border-secondary pb-4 -mb-5">
                <filter.icon className="w-5 h-5 text-secondary" />
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 px-6 lg:px-12 bg-stone-50">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-4">Catálogo de Propiedades</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Conoce en detalle cada uno de los proyectos residenciales de la Fase I. Encuentra tu próxima inversión inmobiliaria en la República Dominicana.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, idx) => (
              <Link key={idx} href={project.link} className="group">
                <article className="bg-white rounded-md shadow-lg overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-secondary/30 hover:-translate-y-1">
                  <div className="relative h-64 overflow-hidden bg-slate-200">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-primary/95 backdrop-blur-sm text-white px-3 py-1.5 text-xs uppercase tracking-widest font-bold rounded-sm border border-white/10 shadow-sm">
                      {project.type}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-playfair font-bold text-primary mb-3 group-hover:text-secondary transition-colors">{project.name}</h3>
                    <p className="text-slate-600 mb-8 flex-grow leading-relaxed">{project.description}</p>
                    <div className="pt-5 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <span className="text-sm font-semibold tracking-wide text-primary uppercase">MÁS INFORMACIÓN</span>
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
