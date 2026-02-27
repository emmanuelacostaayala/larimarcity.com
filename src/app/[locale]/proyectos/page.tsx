import { Metadata } from 'next';
import Image from 'next/image';
import { Link } from "@/i18n/routing";
import { ArrowRight, Building2, Trees, Waves, Home } from 'lucide-react';
import Footer from '@/components/Footer';
import { useLocale } from 'next-intl';

export const metadata: Metadata = {
  title: 'Proyectos | Larimar City & Resort',
  description: 'Descubre el portafolio de proyectos residenciales en Larimar City & Resort. Apartamentos, villas y townhouses de lujo en Punta Cana.',
};


const projects = {
  es: [
    {
      id: "prime-towers",
      title: "Prime Towers",
      category: "Apartamentos Premium",
      desc: "El corazón cosmopolita de Fase I. Comodidad urbana con impresionantes vistas al farallón y cercanía a todas las amenidades.",
      href: "/prime-towers",
      image: "/images/original/prime-towers-main.webp",
      icon: <Building2 className="w-5 h-5" />,
    },
    {
      id: "horizon-view",
      title: "Horizon View",
      category: "Torres Residenciales",
      desc: "Vistas infinitas al océano Atlántico desde la cota más alta del acantilado. Lujo vertical redefinido.",
      href: "/horizon-view",
      image: "/images/original/horizon-view-main.webp",
      icon: <Waves className="w-5 h-5" />,
    },
    {
      id: "villas-golf",
      title: "Villas Golf",
      category: "Villas de Lujo",
      desc: "Privacidad absoluta frente al campo de golf de 18 hoyos. Espacios abiertos, jardines privados y piscinas exclusivas.",
      href: "/villas",
      image: "/images/original/villas-golf-main.webp",
      icon: <Trees className="w-5 h-5" />,
    },
    {
      id: "townhouses",
      title: "Townhouses",
      category: "Residencias Familiares",
      desc: "El equilibrio perfecto entre la comodidad de un apartamento y el espacio de una villa. Ideal para familias e inversión.",
      href: "/townhouses",
      image: "/images/original/townhouses-main.webp",
      icon: <Home className="w-5 h-5" />,
    }
  ],
  en: [
    {
      id: "prime-towers",
      title: "Prime Towers",
      category: "Premium Apartments",
      desc: "The cosmopolitan heart of Phase I. Urban comfort with stunning views of the cliff and proximity to all amenities.",
      href: "/prime-towers",
      image: "/images/original/prime-towers-main.webp",
      icon: <Building2 className="w-5 h-5" />,
    },
    {
      id: "horizon-view",
      title: "Horizon View",
      category: "Residential Towers",
      desc: "Endless views of the Atlantic Ocean from the highest point of the cliff. Vertical luxury redefined.",
      href: "/horizon-view",
      image: "/images/original/horizon-view-main.webp",
      icon: <Waves className="w-5 h-5" />,
    },
    {
      id: "villas-golf",
      title: "Golf Villas",
      category: "Luxury Villas",
      desc: "Absolute privacy facing the 18-hole golf course. Open spaces, private gardens, and exclusive pools.",
      href: "/villas",
      image: "/images/original/villas-golf-main.webp",
      icon: <Trees className="w-5 h-5" />,
    },
    {
      id: "townhouses",
      title: "Townhouses",
      category: "Family Residences",
      desc: "The perfect balance between apartment comfort and villa space. Ideal for families and investment.",
      href: "/townhouses",
      image: "/images/original/townhouses-main.webp",
      icon: <Home className="w-5 h-5" />,
    }
  ]
};

export default function ProyectosPage() {
  const locale = useLocale();
  const currentProjects = locale === 'en' ? projects.en : projects.es;

  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-8 bg-[#0a2e52] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/original/larimarcity-fondo1-1.webp"
            alt="Larimar City Panorama"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a2e52] via-[#0a2e52]/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair mb-6">
            {locale === 'en' ? 'Larimar Collection' : 'Colección Larimar'}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light">
            {locale === 'en' ? 'Explore our portfolio of residential projects. Avant-garde architectural designs integrated with the nature of Punta Cana.' : 'Explora nuestro portafolio de proyectos residenciales. Diseños arquitectónicos de vanguardia integrados con la naturaleza de Punta Cana.'}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 md:py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {currentProjects.map((project, index) => (
              <Link href={project.href} key={project.id} className={`group block relative bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 ${index % 2 !== 0 ? 'md:mt-16' : ''}`}>
                <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a2e52] via-[#0a2e52]/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-white">
                    <div className="flex items-center gap-3 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 text-[#D4AF37]">
                      {project.icon}
                      <span className="text-xs md:text-sm font-bold tracking-widest uppercase">{project.category}</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-playfair mb-4">{project.title}</h2>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      {project.desc}
                    </p>

                    <div className="flex items-center gap-2 text-[#D4AF37] font-semibold uppercase tracking-wider text-xs md:text-sm">
                      {locale === 'en' ? 'Explore Project' : 'Explorar Proyecto'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
