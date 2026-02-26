import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight, Building, Waves, TreePine } from "lucide-react";

export const metadata: Metadata = {
  title: 'Fase I - Masterplan | Larimar City & Resort',
  description: 'Explora la Fase I de Larimar City & Resort. El comienzo de la Smart City más ambiciosa del Caribe.',
};

export default function FaseIMasterplanPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      {/* Immersive Phase I Hero */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center overflow-hidden bg-primary pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/original/Farallon_Fase-1_larimar-city-1536x864.webp"
            alt="Fase I Masterplan"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/40 to-transparent z-10" />
        </div>

        <div className="relative z-20 container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <h1 className="text-white font-playfair text-5xl md:text-7xl font-bold mb-6">Fase I: <span className="text-secondary italic">El Origen</span></h1>
            <p className="text-slate-200 text-lg md:text-xl font-light mb-8">
              La consolidación del núcleo urbano de Larimar City. 10 torres residenciales, villas de lujo y el malecón comercial comienzan aquí.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-secondary text-white font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-white hover:text-primary transition-colors">Descargar Planos Fase I</button>
            </div>
          </div>
        </div>
      </section>

      {/* Components of Phase I */}
      <section className="py-24 px-6 lg:px-12">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-playfair font-bold text-primary mb-4">Componentes de la Fase Inicial</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">La Fase I está diseñada para ser autosuficiente desde el primer día, proporcionando todas las amenidades necesarias para un estilo de vida de lujo.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Building className="w-6 h-6" />, title: "10 Torres", desc: "Prime, Horizon, Breeze y Paradise Towers conformando el skyline." },
              { icon: <Waves className="w-6 h-6" />, title: "Beach Club", desc: "Área social privada con piscinas infinity frente al farallón." },
              { icon: <TreePine className="w-6 h-6" />, title: "Parque Central", desc: "Más de 50,000 m² de zonas verdes y senderos ecológicos." },
              { icon: <Building className="w-6 h-6" />, title: "Boulevard", desc: "Primeros 800m de malecón comercial con boutiques y cafés." },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-10 border border-slate-100 shadow-sm hover:shadow-md transition-shadow rounded-sm group">
                <div className="w-12 h-12 bg-secondary/10 text-secondary flex items-center justify-center rounded-full mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-linking to projects */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-playfair font-bold mb-8">Disponibilidad Inmediata</h2>
              <p className="text-slate-300 mb-10 text-lg font-light">Estamos comercializando activamente las primeras unidades de Fase I. Aproveche los precios de lanzamiento y la máxima plusvalía.</p>
              <ul className="space-y-4 mb-12">
                {["Selección de terrenos para Villas Golf", "Apartamentos de 1, 2 y 3 habitaciones", "Penthouses exclusivos", "Locales comerciales estratégicos"].map((li, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-secondary" /> <span>{li}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              {[
                { name: "Prime Towers", href: "/prime-towers" },
                { name: "Horizon View", href: "/horizon-view" },
                { name: "Breeze Towers", href: "/breeze-towers" },
                { name: "Villas Golf", href: "/villas-golf" }
              ].map((link, idx) => (
                <Link key={idx} href={link.href} className="p-8 border border-white/10 hover:border-secondary hover:bg-white/5 transition-all rounded-sm flex flex-col items-center justify-center gap-4 group">
                  <span className="font-playfair text-xl group-hover:text-secondary">{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
