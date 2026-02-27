import { Metadata } from 'next';
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Download, Check, FileText, LayoutGrid, Calendar, ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";

export const metadata: Metadata = {
  title: 'Horizon View | Larimar City & Resort',
  description: 'Descubre Horizon View en Larimar City & Resort. Apartamentos de lujo con vistas infinitas al horizonte en Punta Cana.',
};

const content = {
  es: {
    badge: "Fase I • Vistas Panorámicas",
    title: "Horizon View",
    desc: "Redefiniendo el concepto de amplitud. Apartamentos diseñados para maximizar la luz natural y expandir tu horizonte personal sobre el Farallón.",
    cta: "Solicitar Más Información",
    sec1Title: "Un Mirador al Caribe",
    sec1Desc: "Horizon View se alza sobre uno de los puntos más elevados de Larimar City, ofreciendo vistas ininterrumpidas de 180 grados. Su arquitectura se caracteriza por el uso extensivo de cristal y balcones profundos que desdibujan la línea entre el interior y el majestuoso paisaje exterior.",
    specsTitle: "Detalles que Elevan",
    features: [
      "Balcones aterrazados extra amplios",
      "Ventanales de piso a techo",
      "Piscina panorámica infinita",
      "Área de Spa y Wellness",
      "Jardines zen en niveles intermedios",
      "Vigilancia privada de alta tecnología",
      "Sistemas de climatización inteligente",
      "Parqueos para visitantes"
    ],
    vipTitle: "Recursos PDF",
    doc1: "Dossier Informativo",
    doc1Size: "PDF • 4.1 MB",
    doc2: "Planos Detallados",
    doc2Size: "PDF • 6.0 MB",
    tableTitle: "Apartamentos Disponibles",
    tableDesc: "Exclusividad y vistas aseguradas por contrato.",
    headers: ["Configuración", "Dormitorios", "Vista", "Precio", "Estado", ""],
    units: [
      { type: "Horizon Standard", beds: "2", view: "Golf & Mar", price: "$182,000", status: "Disponible" },
      { type: "Horizon Plus", beds: "3", view: "Mar (Frontal)", price: "$245,000", status: "Disponible" },
      { type: "Grand Horizon PH", beds: "4", view: "360° Panorámica", price: "$510,000", status: "Reservado" },
    ]
  },
  en: {
    badge: "Phase I • Panoramic Views",
    title: "Horizon View",
    desc: "Redefining the concept of spaciousness. Apartments designed to maximize natural light and expand your personal horizon over the Farallón.",
    cta: "Request More Information",
    sec1Title: "A Viewpoint to the Caribbean",
    sec1Desc: "Horizon View rises on one of the highest points of Larimar City, offering uninterrupted 180-degree views. Its architecture is characterized by the extensive use of glass and deep balconies that blur the line between the interior and the majestic exterior landscape.",
    specsTitle: "Details that Elevate",
    features: [
      "Extra wide terraced balconies",
      "Floor-to-ceiling windows",
      "Panoramic infinity pool",
      "Spa and Wellness Area",
      "Zen gardens on intermediate levels",
      "High-tech private surveillance",
      "Smart climate control systems",
      "Visitor parking"
    ],
    vipTitle: "PDF Resources",
    doc1: "Informative Dossier",
    doc1Size: "PDF • 4.1 MB",
    doc2: "Detailed Plans",
    doc2Size: "PDF • 6.0 MB",
    tableTitle: "Available Apartments",
    tableDesc: "Exclusivity and views guaranteed by contract.",
    headers: ["Configuration", "Bedrooms", "View", "Price", "Status", ""],
    units: [
      { type: "Horizon Standard", beds: "2", view: "Golf & Sea", price: "$182,000", status: "Available" },
      { type: "Horizon Plus", beds: "3", view: "Sea (Front)", price: "$245,000", status: "Available" },
      { type: "Grand Horizon PH", beds: "4", view: "360° Panoramic", price: "$510,000", status: "Reserved" },
    ]
  }
};

export default function HorizonViewPage() {
  const locale = useLocale();
  const t = locale === 'en' ? content.en : content.es;

  return (
    <main className="min-h-screen bg-white">
      {/* Property Hero */}
      <section className="relative w-full h-[70vh] min-h-[600px] flex items-end pb-24 overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent z-10" />
          <Image
            src="/images/original/Horizon-View_8.webp"
            alt="Horizon View Exterior"
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
                      <td className="p-4">{unit.beds} {t.headers[1] === "Dormitorios" ? "Hab" : "Beds"}</td>
                      <td className="p-4">{unit.view}</td>
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
