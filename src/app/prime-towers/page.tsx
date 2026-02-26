import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { Download, Check, FileText, LayoutGrid, Calendar, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: 'Prime Towers | Larimar City & Resort',
  description: 'Descubre Prime Towers en Larimar City & Resort. Diseño vanguardista para el inversor exigente en Punta Cana.',
};

export default function PrimeTowersPage() {
  return (
    <main className="min-h-screen bg-white pt-20">
      {/* Property Hero */}
      <section className="relative w-full h-[70vh] min-h-[600px] flex items-end pb-24 overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-black/20 z-10" />
          <Image
            src="/images/original/prime-tower-penthouse-terraza-2-scaled.webp"
            alt="Prime Towers Penthouse Terraza"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-20 container mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 mb-4 border border-secondary text-secondary text-xs uppercase tracking-widest font-semibold backdrop-blur-sm rounded-sm">
              Fase I • Residencial
            </span>
            <h1 className="text-white font-playfair text-5xl md:text-7xl font-bold mb-4">
              Prime Towers
            </h1>
            <p className="text-slate-200 text-lg md:text-xl font-light">
              Diseño vanguardista para el inversor exigente. Apartamentos y Penthouses con vistas inigualables al mar y al ecosistema de Punta Cana.
            </p>
          </div>
          <div className="shrink-0 flex flex-col gap-3 w-full md:w-auto">
            <button className="w-full md:w-auto px-8 py-4 bg-secondary text-white hover:bg-white hover:text-primary transition-colors flex items-center justify-center font-medium rounded-sm">
              Agendar una Visita <Calendar className="ml-2 w-4 h-4" />
            </button>
            <button className="w-full md:w-auto px-8 py-4 bg-transparent border border-white text-white hover:bg-white/10 transition-colors flex items-center justify-center font-medium rounded-sm">
              Descargar Brochure <Download className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Property Details Grid */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-playfair font-bold text-primary mb-6">Sobre el Proyecto</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Prime Towers representa la cúspide de la elegancia arquitectónica dentro de Larimar City & Resort. Diseñado con líneas modernas y una integración perfecta con el entorno natural, este complejo residencial ofrece una experiencia de vida superior. Sus terrazas panorámicas y sus interiores meticulosamente acabados están pensados para aquellos que buscan lo mejor de Punta Cana sin renunciar a la sofisticación.
              </p>

              <h3 className="text-xl font-bold text-primary mt-10 mb-4">Características Principales</h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                {[
                  "Lobby a doble altura",
                  "Piscina Infinity en Rooftop",
                  "Gimnasio equipado",
                  "Área de BBQ y Lounge",
                  "Parqueo techado",
                  "Seguridad 24/7",
                  "Vistas al campo de golf",
                  "Acabados premium (Roca, etc.)"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center text-slate-700">
                    <Check className="w-5 h-5 text-secondary mr-3 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-stone-50 p-8 rounded-md border border-slate-100 flex flex-col">
              <h3 className="text-xl font-bold text-primary mb-6 border-b border-slate-200 pb-4">Recursos del Inversor</h3>
              <div className="space-y-4 flex-grow">
                <Link href="#" className="flex items-center p-4 bg-white rounded-sm border border-slate-200 hover:border-secondary hover:shadow-md transition-all group">
                  <div className="w-10 h-10 bg-secondary/10 flex items-center justify-center rounded-full mr-4 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Memoria de Calidades</p>
                    <p className="text-xs text-slate-500">PDF • 2.4 MB</p>
                  </div>
                </Link>
                <Link href="#" className="flex items-center p-4 bg-white rounded-sm border border-slate-200 hover:border-secondary hover:shadow-md transition-all group">
                  <div className="w-10 h-10 bg-secondary/10 flex items-center justify-center rounded-full mr-4 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                    <LayoutGrid className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Planos Arquitectónicos</p>
                    <p className="text-xs text-slate-500">PDF • 5.1 MB</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inventory & Pricing List */}
      <section className="py-20 px-6 lg:px-12 bg-primary text-white">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-playfair font-bold text-white mb-4">Disponibilidad de Unidades</h2>
            <p className="text-slate-300 font-light">Inventario actualizado de Prime Towers. Reserve su unidad hoy mismo.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-md overflow-hidden border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/10 text-white uppercase text-xs tracking-wider">
                    <th className="p-4 font-semibold">Tipología</th>
                    <th className="p-4 font-semibold">Habitaciones</th>
                    <th className="p-4 font-semibold">M² Totales</th>
                    <th className="p-4 font-semibold">Precio desde</th>
                    <th className="p-4 font-semibold">Estado</th>
                    <th className="p-4 font-semibold"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-slate-200 text-sm">
                  {[
                    { type: "Apartamento Tipo A", beds: 1, sqft: "75 m²", price: "$145,000", status: "Disponible" },
                    { type: "Apartamento Tipo B", beds: 2, sqft: "115 m²", price: "$210,000", status: "Disponible" },
                    { type: "Apartamento Tipo C", beds: 3, sqft: "155 m²", price: "$285,000", status: "Pocas Unidades" },
                    { type: "Penthouse", beds: 4, sqft: "280 m²", price: "$490,000", status: "Vendido" },
                  ].map((unit, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-medium text-white">{unit.type}</td>
                      <td className="p-4">{unit.beds} Hab</td>
                      <td className="p-4">{unit.sqft}</td>
                      <td className="p-4 text-secondary font-semibold">{unit.price}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs rounded-sm font-medium ${unit.status === 'Disponible' ? 'bg-green-500/20 text-green-300' : unit.status === 'Vendido' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                          {unit.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-secondary hover:text-white transition-colors" disabled={unit.status === 'Vendido'}>
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
