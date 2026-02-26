import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { Download, Check, FileText, LayoutGrid, Calendar, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: 'Sunset Residences | Larimar City & Resort',
  description: 'Exclusividad y confort frente al atardecer. Descubre Sunset Residences en Larimar City & Resort, Punta Cana.',
};

export default function SunsetResidencesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Property Hero */}
      <section className="relative w-full h-[70vh] min-h-[600px] flex items-end pb-24 overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent z-10" />
          <Image
            src="/images/original/apartamentos-en-punta-cana-larimar-city-vista-mar.webp"
            alt="Sunset Residences Exterior"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-20 container mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 mb-4 border border-secondary text-secondary text-xs uppercase tracking-widest font-semibold backdrop-blur-sm rounded-sm">
              Fase I • Luxury Living
            </span>
            <h1 className="text-white font-playfair text-5xl md:text-7xl font-bold mb-4">
              Sunset Residences
            </h1>
            <p className="text-slate-200 text-lg md:text-xl font-light">
              Donde cada atardecer es una obra de arte. Un refugio de lujo diseñado para ofrecer experiencias sensoriales únicas con vistas infinitas al horizonte de Punta Cana.
            </p>
          </div>
          <div className="shrink-0 flex flex-col gap-3 w-full md:w-auto">
            <button className="w-full md:w-auto px-8 py-4 bg-secondary text-white hover:bg-white hover:text-primary transition-colors flex items-center justify-center font-medium rounded-sm">
              Solicitar Disponibilidad <Calendar className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Property Details Grid */}
      <section className="py-20 px-6 lg:px-12 bg-white text-slate-800">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-playfair font-bold text-primary mb-6">Arquitectura de Inmersión</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Sunset Residences redefine el concepto de "hogar frente al mar". Aunque ubicados estratégicamente en el farallón de Larimar, su arquitectura orgánica y sus amplias terrazas crean una conexión visual directa con el Mar Caribe. Es un espacio pensado para la relajación profunda y la exclusividad.
              </p>

              <h3 className="text-xl font-bold text-primary mt-10 mb-4">Diferenciales Sunset</h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                {[
                  "Terrazas extra-profundas",
                  "Vistas ininterrumpidas al atardecer",
                  "Acabados en piedra natural y madera",
                  "Smart Home ready",
                  "Piscina de borde infinito dedicada",
                  "Lounge de propietarios VIP",
                  "Servicio de conserjería 24/7",
                  "Acceso directo a la zona de Wellness"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center text-slate-700">
                    <Check className="w-5 h-5 text-secondary mr-3 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-stone-50 p-8 rounded-md border border-slate-100">
              <h3 className="text-xl font-bold text-primary mb-6 border-b border-slate-200 pb-4">Carpeta del Proyecto</h3>
              <div className="space-y-4">
                <Link href="#" className="flex items-center p-4 bg-white rounded-sm border border-slate-200 hover:border-secondary transition-all group">
                  <div className="w-10 h-10 bg-secondary/10 flex items-center justify-center rounded-full mr-4 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Masterplan Sunset</p>
                    <p className="text-xs text-slate-500">Documento • 2.5 MB</p>
                  </div>
                </Link>
                <Link href="#" className="flex items-center p-4 bg-white rounded-sm border border-slate-200 hover:border-secondary transition-all group">
                  <div className="w-10 h-10 bg-secondary/10 flex items-center justify-center rounded-full mr-4 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                    <LayoutGrid className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Renders de Interior</p>
                    <p className="text-xs text-slate-500">Galería • 15 MB</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing/Availability */}
      <section className="py-20 px-6 lg:px-12 bg-primary text-white">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-playfair font-bold text-white mb-4">Tipologías Disponibles</h2>
            <p className="text-slate-300 font-light">Elija su espacio ideal en Sunset Residences.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { type: "Sunset Horizon", area: "78 m²", price: "$128,000", note: "1 Habitación" },
              { type: "Sunset Panoramic", area: "115 m²", price: "$185,000", note: "2 Habitaciones" },
              { type: "Sunset Royal", area: "195 m²", price: "$320,000", note: "3 Hab + Studio" },
            ].map((box, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-md hover:bg-white/10 transition-all group">
                <h4 className="text-xl font-bold mb-2">{box.type}</h4>
                <p className="text-slate-400 text-sm mb-4">{box.note} • {box.area}</p>
                <p className="text-2xl font-playfair font-bold text-secondary mb-6">{box.price}</p>
                <div className="flex items-center text-sm text-secondary font-medium group-hover:translate-x-1 transition-transform cursor-pointer">
                  Más información <ChevronRight className="ml-1 w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
