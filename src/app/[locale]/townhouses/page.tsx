import { Metadata } from 'next';
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Download, Check, FileText, LayoutGrid, Calendar, ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";

export const metadata: Metadata = {
  title: 'Townhouses | Larimar City & Resort',
  description: 'Modernidad y confort familiar en Punta Cana. Descubre los Townhouses de Larimar City & Resort.',
};

const content = {
  es: {
    badge: "Fase I • Residencial Familiar",
    title: "Townhouses",
    desc: "La evolución del hogar moderno en el Caribe. Espacios optimizados para la familia con diseño arquitectónico contemporáneo y acceso a todas las amenidades de la Smart City.",
    cta: "Agendar Visita a Showroom",
    sec1Title: "El Corazón de la Vida Familiar",
    sec1Desc: "Nuestros Townhouses han sido proyectados como el punto de encuentro ideal para la vida moderna. Con una arquitectura que prioriza la funcionalidad sin sacrificar la estética, ofrecen jardines privados, amplias estancias sociales y una ubicación privilegiada cercana a los colegios y áreas deportivas de Larimar City.",
    specsTitle: "Confort en cada Nivel",
    features: [
      "Diseños de 2 y 3 niveles",
      "Jardín posterior privado y terraza",
      "2 y 3 Habitaciones con baño privado",
      "Cocina abierta estilo minimalista",
      "Parqueo para 2 vehículos",
      "Pre-instalación de paneles solares",
      "Grifería y loza sanitaria importada",
      "Seguridad perimetral y patrullaje"
    ],
    vipTitle: "Info para el Comprador",
    doc1: "Catálogo de Acabados",
    doc1Size: "PDF • 2.1 MB",
    doc2: "Modelos de Townhouse",
    doc2Size: "PDF • 3.8 MB",
    tableTitle: "Modelos & Disponibilidad",
    tableDesc: "Reserva con solo $2,000 USD y planes de pago flexibles.",
    headers: ["Modelo", "Habitaciones", "Construcción", "Precio desde", "Estado", ""],
    units: [
      { type: "Townhouse Type I", beds: "2 Hab", sqft: "125 m²", price: "$158,000", status: "Disponible" },
      { type: "Townhouse Type II", beds: "3 Hab", sqft: "165 m²", price: "$195,000", status: "Disponible" },
      { type: "Executive TH", beds: "3 Hab", sqft: "210 m²", price: "$235,000", status: "Pocas Unidades" },
    ]
  },
  en: {
    badge: "Phase I • Family Residential",
    title: "Townhouses",
    desc: "The evolution of the modern home in the Caribbean. Optimized spaces for the family with contemporary architectural design and access to all Smart City amenities.",
    cta: "Schedule Showroom Visit",
    sec1Title: "The Heart of Family Life",
    sec1Desc: "Our Townhouses have been designed as the ideal meeting point for modern life. With an architecture that prioritizes functionality without sacrificing aesthetics, they offer private gardens, spacious social rooms, and a privileged location close to Larimar City's schools and sports areas.",
    specsTitle: "Comfort on Every Level",
    features: [
      "2 and 3 level designs",
      "Private backyard and terrace",
      "2 and 3 Bedrooms with private bath",
      "Minimalist style open kitchen",
      "Parking for 2 vehicles",
      "Pre-installation of solar panels",
      "Imported faucets and sanitary ware",
      "Perimeter security and patrolling"
    ],
    vipTitle: "Buyer Information",
    doc1: "Finishes Catalog",
    doc1Size: "PDF • 2.1 MB",
    doc2: "Townhouse Models",
    doc2Size: "PDF • 3.8 MB",
    tableTitle: "Models & Availability",
    tableDesc: "Reserve with only $2,000 USD and flexible payment plans.",
    headers: ["Model", "Bedrooms", "Construction", "Price from", "Status", ""],
    units: [
      { type: "Townhouse Type I", beds: "2 Beds", sqft: "125 m²", price: "$158,000", status: "Available" },
      { type: "Townhouse Type II", beds: "3 Beds", sqft: "165 m²", price: "$195,000", status: "Available" },
      { type: "Executive TH", beds: "3 Beds", sqft: "210 m²", price: "$235,000", status: "Few Units" },
    ]
  }
};

export default function TownhousesPage() {
  const locale = useLocale();
  const t = locale === 'en' ? content.en : content.es;

  return (
    <main className="min-h-screen bg-white">
      {/* Property Hero */}
      <section className="relative w-full h-[70vh] min-h-[600px] flex items-end pb-24 overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent z-10" />
          <Image
            src="/images/original/townhouses-main.webp"
            alt="Townhouses Exterior"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-20 container mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 mb-4 border border-secondary text-secondary text-xs uppercase tracking-widest font-semibold backdrop-blur-sm rounded-sm">
              {t.badge}
            </span>
            <h1 className="text-white font-playfair text-5xl md:text-7xl font-bold mb-4">
              {t.title}
            </h1>
            <p className="text-slate-200 text-lg md:text-xl font-light">
              {t.desc}
            </p>
          </div>
          <div className="shrink-0 flex flex-col gap-3 w-full md:w-auto">
            <button className="w-full md:w-auto px-8 py-4 bg-secondary text-white hover:bg-white hover:text-primary transition-colors flex items-center justify-center font-medium rounded-sm">
              {t.cta} <Calendar className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Property Details Grid */}
      <section className="py-20 px-6 lg:px-12 bg-white text-slate-800">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-playfair font-bold text-primary mb-6">{t.sec1Title}</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {t.sec1Desc}
              </p>

              <h3 className="text-xl font-bold text-primary mt-10 mb-4">{t.specsTitle}</h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                {t.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-slate-700">
                    <Check className="w-5 h-5 text-secondary mr-3 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-stone-50 p-8 rounded-md border border-slate-100">
              <h3 className="text-xl font-bold text-primary mb-6 border-b border-slate-200 pb-4">{t.vipTitle}</h3>
              <div className="space-y-4">
                <Link href="#" className="flex items-center p-4 bg-white rounded-sm border border-slate-200 hover:border-secondary transition-all group">
                  <div className="w-10 h-10 bg-secondary/10 flex items-center justify-center rounded-full mr-4 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">{t.doc1}</p>
                    <p className="text-xs text-slate-500">{t.doc1Size}</p>
                  </div>
                </Link>
                <Link href="#" className="flex items-center p-4 bg-white rounded-sm border border-slate-200 hover:border-secondary transition-all group">
                  <div className="w-10 h-10 bg-secondary/10 flex items-center justify-center rounded-full mr-4 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                    <LayoutGrid className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">{t.doc2}</p>
                    <p className="text-xs text-slate-500">{t.doc2Size}</p>
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
            <h2 className="text-3xl font-playfair font-bold text-white mb-4">{t.tableTitle}</h2>
            <p className="text-slate-300 font-light">{t.tableDesc}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-md overflow-hidden border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/10 text-white uppercase text-xs tracking-wider">
                    {t.headers.map((h, i) => (
                      <th key={i} className="p-4 font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-slate-200 text-sm">
                  {t.units.map((unit, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-medium text-white">{unit.type}</td>
                      <td className="p-4">{unit.beds}</td>
                      <td className="p-4">{unit.sqft}</td>
                      <td className="p-4 text-secondary font-semibold">{unit.price}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs rounded-sm font-medium ${unit.status === 'Disponible' || unit.status === 'Available' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
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
