import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { Download, Check, FileText, LayoutGrid, Calendar, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: 'Horizon View | Larimar City & Resort',
  description: 'Descubre Horizon View en Larimar City & Resort. Apartamentos de lujo con vistas infinitas al horizonte en Punta Cana.',
};

export default function HorizonViewPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Property Hero */}
      <section className="relative w-full h-[70vh] min-h-[600px] flex items-end pb-24 overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent z-10" />
          <Image
            src="/images/original/prime-towers-noche-larimar-city-1024x576.webp"
            alt="Horizon View Exterior"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-20 container mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 mb-4 border border-secondary text-secondary text-xs uppercase tracking-widest font-semibold backdrop-blur-sm rounded-sm">
              Fase I • Vistas Panorámicas
            </span>
            <h1 className="text-white font-playfair text-5xl md:text-7xl font-bold mb-4">
              Horizon View
            </h1>
            <p className="text-slate-200 text-lg md:text-xl font-light">
              Redefiniendo el concepto de amplitud. Apartamentos diseñados para maximizar la luz natural y expandir tu horizonte personal sobre el Farallón.
            </p>
          </div>
          <div className="shrink-0 flex flex-col gap-3 w-full md:w-auto">
            <button className="w-full md:w-auto px-8 py-4 bg-secondary text-white hover:bg-white hover:text-primary transition-colors flex items-center justify-center font-medium rounded-sm">
              Solicitar Más Información <Calendar className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Property Details Grid */}
      <section className="py-20 px-6 lg:px-12 bg-white text-slate-800">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-playfair font-bold text-primary mb-6">Un Mirador al Caribe</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Horizon View se alza sobre uno de los puntos más elevados de Larimar City, ofreciendo vistas ininterrumpidas de 180 grados. Su arquitectura se caracteriza por el uso extensivo de cristal y balcones profundos que desdibujan la línea entre el interior y el majestuoso paisaje exterior.
              </p>

              <h3 className="text-xl font-bold text-primary mt-10 mb-4">Detalles que Elevan</h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                {[
                  "Balcones aterrazados extra amplios",
                  "Ventanales de piso a techo",
                  "Piscina panorámica infinita",
                  "Área de Spa y Wellness",
                  "Jardines zen en niveles intermedios",
                  "Vigilancia privada de alta tecnología",
                  "Sistemas de climatización inteligente",
                  "Parqueos para visitantes"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center text-slate-700">
                    <Check className="w-5 h-5 text-secondary mr-3 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-stone-50 p-8 rounded-md border border-slate-100">
              <h3 className="text-xl font-bold text-primary mb-6 border-b border-slate-200 pb-4">Recursos PDF</h3>
              <div className="space-y-4">
                <Link href="#" className="flex items-center p-4 bg-white rounded-sm border border-slate-200 hover:border-secondary transition-all group">
                  <div className="w-10 h-10 bg-secondary/10 flex items-center justify-center rounded-full mr-4 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Dossier Informativo</p>
                    <p className="text-xs text-slate-500">PDF • 4.1 MB</p>
                  </div>
                </Link>
                <Link href="#" className="flex items-center p-4 bg-white rounded-sm border border-slate-200 hover:border-secondary transition-all group">
                  <div className="w-10 h-10 bg-secondary/10 flex items-center justify-center rounded-full mr-4 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                    <LayoutGrid className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Planos Detallados</p>
                    <p className="text-xs text-slate-500">PDF • 6.0 MB</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing List */}
      <section className="py-20 px-6 lg:px-12 bg-primary text-white">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-playfair font-bold text-white mb-4">Apartamentos Disponibles</h2>
            <p className="text-slate-300 font-light">Exclusividad y vistas aseguradas por contrato.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-md overflow-hidden border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/10 text-white uppercase text-xs tracking-wider">
                    <th className="p-4 font-semibold">Configuración</th>
                    <th className="p-4 font-semibold">Dormitorios</th>
                    <th className="p-4 font-semibold">Vista</th>
                    <th className="p-4 font-semibold">Precio</th>
                    <th className="p-4 font-semibold">Estado</th>
                    <th className="p-4 font-semibold"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-slate-200 text-sm">
                  {[
                    { type: "Horizon Standard", beds: 2, view: "Golf & Mar", price: "$182,000", status: "Disponible" },
                    { type: "Horizon Plus", beds: 3, view: "Mar (Frontal)", price: "$245,000", status: "Disponible" },
                    { type: "Grand Horizon PH", beds: 4, view: "360° Panorámica", price: "$510,000", status: "Reservado" },
                  ].map((unit, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-medium text-white">{unit.type}</td>
                      <td className="p-4">{unit.beds} Hab</td>
                      <td className="p-4">{unit.view}</td>
                      <td className="p-4 text-secondary font-semibold">{unit.price}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs rounded-sm font-medium ${unit.status === 'Disponible' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                          {unit.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <ChevronRight className="w-5 h-5 text-secondary" />
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
