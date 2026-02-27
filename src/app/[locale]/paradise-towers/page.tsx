import { Metadata } from 'next';
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Download, Check, FileText, LayoutGrid, Calendar, ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";

export const metadata: Metadata = {
  title: 'Paradise Towers | Larimar City & Resort',
  description: 'Vive en el paraíso con vistas al Farallón. Descubre Paradise Towers en Larimar City & Resort, Punta Cana.',
};

const content = {
  es: {
    badge: "Fase I • Vistas al Farallón",
    title: "Paradise Towers",
    desc: "Diseñadas para elevar tu estilo de vida. Un complejo residencial que combina arquitectura vanguardista con una ubicación envidiable sobre la majestuosa elevación de Larimar City.",
    cta: "Descargar Catálogo",
    sec1Title: "Un Oasis de Bienestar",
    sec1Desc: "Paradise Towers no es solo un conjunto de edificios; es una declaración de intenciones. Cada torre ha sido posicionada para maximizar la entrada de luz natural y ofrecer las mejores puestas de sol de Punta Cana. Con áreas sociales integradas y senderos verdes, es el lugar perfecto para quienes buscan equilibrio.",
    specsTitle: "Amenidades Exclusivas",
    features: [
      "Piscina tipo Lagoon",
      "Gimnasio de última generación",
      "Áreas de BBQ y Co-working",
      "Seguridad 24/7 con control de acceso",
      "Vistas panorámicas garantizadas",
      "Sendero ecológico privado",
      "Cercanía al área comercial (Village)",
      "Parqueo privado por unidad"
    ],
    vipTitle: "Documentación Inversor",
    doc1: "BrochureParadise.pdf",
    doc1Size: "PDF • 4.2 MB",
    doc2: "Tipologías de Apto.",
    doc2Size: "Imágenes • 12 MB",
    tableTitle: "Inventario de Unidades",
    tableDesc: "Unidades disponibles en preventa. Entrega estimada: 2026.",
    headers: ["Tipo", "M²", "Hab.", "Precio", "Estado", ""],
    units: [
      { type: "Suite Vista Jardín", area: "65 m²", beds: 1, price: "$105,000", status: "Disponible" },
      { type: "Family Suite Prime", area: "95 m²", beds: 2, price: "$145,000", status: "Vendida" },
      { type: "Penthouse Horizon", area: "160 m²", beds: 3, price: "$240,000", status: "Reservada" },
    ]
  },
  en: {
    badge: "Phase I • Cliff Views",
    title: "Paradise Towers",
    desc: "Designed to elevate your lifestyle. A residential complex that combines avant-garde architecture with an enviable location on the majestic elevation of Larimar City.",
    cta: "Download Catalog",
    sec1Title: "An Oasis of Well-being",
    sec1Desc: "Paradise Towers is not just a group of buildings; it is a statement of intent. Each tower has been positioned to maximize natural light and offer the best sunsets in Punta Cana. With integrated social areas and green trails, it is the perfect place for those seeking balance.",
    specsTitle: "Exclusive Amenities",
    features: [
      "Lagoon-style pool",
      "State-of-the-art gym",
      "BBQ and Co-working areas",
      "24/7 security with access control",
      "Guaranteed panoramic views",
      "Private ecological trail",
      "Proximity to commercial area (Village)",
      "Private parking per unit"
    ],
    vipTitle: "Investor Documentation",
    doc1: "BrochureParadise.pdf",
    doc1Size: "PDF • 4.2 MB",
    doc2: "Apt. Typologies",
    doc2Size: "Images • 12 MB",
    tableTitle: "Unit Inventory",
    tableDesc: "Units available in pre-sale. Estimated delivery: 2026.",
    headers: ["Type", "M²", "Beds", "Price", "Status", ""],
    units: [
      { type: "Garden View Suite", area: "65 m²", beds: 1, price: "$105,000", status: "Available" },
      { type: "Family Suite Prime", area: "95 m²", beds: 2, price: "$145,000", status: "Sold" },
      { type: "Penthouse Horizon", area: "160 m²", beds: 3, price: "$240,000", status: "Reserved" },
    ]
  }
};

export default function ParadiseTowersPage() {
  const locale = useLocale();
  const t = locale === 'en' ? content.en : content.es;

  return (
    <main className="min-h-screen bg-white">
      {/* Property Hero */}
      <section className="relative w-full h-[70vh] min-h-[600px] flex items-end pb-24 overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent z-10" />
          <Image
            src="/images/original/paradise-towers-main.webp"
            alt="Paradise Towers Exterior"
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

      {/* Inventory Table */}
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
                    <tr key={i} className="hover:bg-white/5 transition-colors text-white/80">
                      <td className="p-4 font-medium text-white">{unit.type}</td>
                      <td className="p-4">{unit.area}</td>
                      <td className="p-4">{unit.beds}</td>
                      <td className="p-4 text-secondary font-semibold">{unit.price}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs rounded-sm font-medium ${unit.status === 'Disponible' || unit.status === 'Available' ? 'bg-green-500/20 text-green-300' :
                          unit.status === 'Vendida' || unit.status === 'Sold' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'
                          }`}>
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
