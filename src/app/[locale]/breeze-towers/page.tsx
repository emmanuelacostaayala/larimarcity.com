import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { Download, Check, FileText, LayoutGrid, Calendar, ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";

export const metadata: Metadata = {
  title: 'Breeze Towers | Larimar City & Resort',
  description: 'Descubre Breeze Towers en Larimar City & Resort. Apartamentos inspirados en la frescura del Caribe con diseño bioclimático.',
};

const content = {
  es: {
    badge: "Fase I • Eficiencia & Diseño",
    title: "Breeze Towers",
    desc: "La brisa del Mar en tu salón. Torres diseñadas bajo parámetros bioclimáticos para una ventilación natural constante y una eficiencia energética sin precedentes.",
    cta: "Descargar Lista de Precios",
    sec1Title: "Frescura Inteligente",
    sec1Desc: "Breeze Towers personifica el compromiso de Larimar City con el medio ambiente. Su orientación ha sido calculada para captar los vientos dominantes del noreste, reduciendo la necesidad de aire acondicionado artificial y creando un microclima interior agradable durante todo el año.",
    specsTitle: "Sostenibilidad & Lujo",
    features: [
      "Fachadas con sistemas de ventilación cruzada",
      "Materiales térmicos de baja emisividad",
      "Piscina con sistema de filtrado ecológico",
      "Huertos urbanos para residentes",
      "Área de relajación al aire libre",
      "Recogida de aguas pluviales para riego",
      "Iluminación LED inteligente en áreas comunes",
      "Certificación de eficiencia energética"
    ],
    vipTitle: "Documentos B2B",
    doc1: "Especificaciones Técnicas",
    doc1Size: "PDF • 1.2 MB",
    doc2: "Planos Breeze Towers",
    doc2Size: "PDF • 4.5 MB",
    tableTitle: "Opciones de Inversión",
    tableDesc: "Diseño eficiente, rentabilidad inteligente.",
    headers: ["Tipología", "Dormitorios", "M² Interiores", "Precio", "Estado", ""],
    units: [
      { type: "Breeze Aero", beds: "1", sqft: "65 m²", price: "$129,000", status: "Disponible" },
      { type: "Breeze Flow", beds: "2", sqft: "98 m²", price: "$175,000", status: "Disponible" },
      { type: "Penthouse Breeze", beds: "3", sqft: "185 m²", price: "$340,000", status: "Disponible" },
    ]
  },
  en: {
    badge: "Phase I • Efficiency & Design",
    title: "Breeze Towers",
    desc: "The sea breeze in your living room. Towers designed under bioclimatic parameters for constant natural ventilation and unprecedented energy efficiency.",
    cta: "Download Price List",
    sec1Title: "Smart Freshness",
    sec1Desc: "Breeze Towers personifies Larimar City's commitment to the environment. Its orientation has been calculated to capture the prevailing northeast winds, reducing the need for artificial air conditioning and creating a pleasant indoor microclimate all year round.",
    specsTitle: "Sustainability & Luxury",
    features: [
      "Facades with cross ventilation systems",
      "Low-emissivity thermal materials",
      "Pool with ecological filtering system",
      "Urban gardens for residents",
      "Outdoor relaxation area",
      "Rainwater harvesting for irrigation",
      "Smart LED lighting in common areas",
      "Energy efficiency certification"
    ],
    vipTitle: "B2B Documents",
    doc1: "Technical Specifications",
    doc1Size: "PDF • 1.2 MB",
    doc2: "Breeze Towers Plans",
    doc2Size: "PDF • 4.5 MB",
    tableTitle: "Investment Options",
    tableDesc: "Efficient design, smart profitability.",
    headers: ["Typology", "Bedrooms", "Interior M²", "Price", "Status", ""],
    units: [
      { type: "Breeze Aero", beds: "1", sqft: "65 m²", price: "$129,000", status: "Available" },
      { type: "Breeze Flow", beds: "2", sqft: "98 m²", price: "$175,000", status: "Available" },
      { type: "Penthouse Breeze", beds: "3", sqft: "185 m²", price: "$340,000", status: "Available" },
    ]
  }
};

export default function BreezeTowersPage() {
  const locale = useLocale();
  const t = locale === 'en' ? content.en : content.es;

  return (
    <main className="min-h-screen bg-white">
      {/* Property Hero */}
      <section className="relative w-full h-[70vh] min-h-[600px] flex items-end pb-24 overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent z-10" />
          <Image
            src="/images/original/prime-tower-penthouse-terraza-2-scaled.webp" // Reusing high quality asset
            alt="Breeze Towers Concept"
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
              {t.cta} <Download className="ml-2 w-4 h-4" />
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
          <div className="mb-12 text-center text-white">
            <h2 className="text-3xl font-playfair font-bold mb-4">{t.tableTitle}</h2>
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
                      <td className="p-4">{unit.beds} {t.headers[1] === "Dormitorios" ? "Hab" : "Beds"}</td>
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
