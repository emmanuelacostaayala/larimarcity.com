import { Metadata } from 'next';
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Globe, MapPin, Building, Users, Lock, ChevronRight, Mail, CheckCircle } from "lucide-react";
import { useLocale } from "next-intl";

export const metadata: Metadata = {
    title: 'Canal Externo & Master Brokers | Larimar City & Resort',
    description: 'Red global de oficinas corporativas y colaboradores. Únete como Master Broker y accede a nuestro portal privado B2B.',
};

const locations = [
    { city: "Santo Domingo", country: "Rep. Dominicana", type: "Oficina Híbrida", address: "Av. Winston Churchill, Blue Mall", coords: "18.47, -69.94", typeEn: "Hybrid Office", countryEn: "Dominican Rep." },
    { city: "Punta Cana", country: "Rep. Dominicana", type: "Punto de Venta", address: "Boulevard Turístico del Este", coords: "18.58, -68.40", typeEn: "Point of Sale", countryEn: "Dominican Rep." },
    { city: "Murcia", country: "España", type: "Sede Central Grupo Clerhp", address: "Avenida Europa, 3B Entresuelo 1", coords: "37.99, -1.13", typeEn: "Clerhp Group HQ", countryEn: "Spain" },
    { city: "Miami", country: "USA", type: "Master Broker", address: "Brickell Avenue", coords: "25.76, -80.19", typeEn: "Master Broker", countryEn: "USA" },
    { city: "Bogotá", country: "Colombia", type: "Master Broker", address: "Calle 93, Chicó", coords: "4.67, -74.05", typeEn: "Master Broker", countryEn: "Colombia" }
];

export default function CanalExternoPage() {
    const locale = useLocale();
    return (
        <main className="min-h-screen bg-stone-50 pt-20">
            {/* Hero Section */}
            <section className="relative w-full py-24 md:py-32 bg-primary flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-primary/80 z-10" />
                    <Image
                        src="/images/original/Brezze-Towers_1.webp"
                        alt="Business Center"
                        fill
                        className="object-cover opacity-50"
                        priority
                    />
                </div>
                <div className="relative z-20 container mx-auto px-6 text-center max-w-4xl">
                    <span className="text-secondary tracking-[0.3em] font-medium uppercase mb-4 block">
                        {locale === 'en' ? 'B2B & Partners' : 'B2B & Colaboradores'}
                    </span>
                    <h1 className="text-white font-playfair text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        {locale === 'en' ? 'Our Global Investment Network' : 'Nuestra Red Global de Inversión'}
                    </h1>
                    <p className="text-slate-200 text-lg md:text-xl font-light mb-10">
                        {locale === 'en' ? 'Join the most exclusive international real estate network in the Caribbean. Connect with corporate offices and consolidate your portfolio backed by CLERHP Group.' : 'Únete a la red inmobiliaria internacional más exclusiva del Caribe. Conecta con oficinas corporativas y consolida tu portafolio respaldado por Grupo CLERHP.'}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="#portal-b2b" className="px-8 py-4 bg-secondary text-white font-semibold rounded-sm tracking-wide hover:bg-white hover:text-primary transition-colors flex items-center">
                            {locale === 'en' ? 'Private B2B Portal' : 'Portal Privado B2B'} <Lock className="ml-2 w-4 h-4" />
                        </Link>
                        <Link href="#master-brokers" className="px-8 py-4 bg-transparent border border-white text-white font-semibold rounded-sm tracking-wide hover:bg-white/10 transition-colors flex items-center">
                            {locale === 'en' ? 'Join the Network' : 'Unirse a la Red'} <Globe className="ml-2 w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Global Interactive Map Simulation */}
            <section className="py-24 px-6 lg:px-12 bg-white relative overflow-hidden" id="master-brokers">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-playfair font-bold text-primary mb-4">
                            {locale === 'en' ? 'International Presence' : 'Presencia Internacional'}
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            {locale === 'en' ? 'Our offices and official partners are strategically located to provide impeccable service and support on key investment continents.' : 'Nuestras oficinas y colaboradores oficiales están estratégicamente ubicados para brindar un servicio y soporte impecable en los continentes clave de inversión.'}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12 items-start">
                        {/* List of points */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-primary mb-6 flex items-center border-b border-slate-200 pb-3">
                                <Building className="w-5 h-5 mr-3 text-secondary" />
                                {locale === 'en' ? 'Offices & Master Brokers' : 'Oficinas y Master Brokers'}
                            </h3>
                            {locations.map((loc, idx) => (
                                <div key={idx} className="p-5 bg-stone-50 border border-slate-100 rounded-sm hover:border-secondary transition-all group flex items-start cursor-pointer">
                                    <MapPin className="w-5 h-5 text-slate-400 group-hover:text-secondary shrink-0 mt-1 mr-4" />
                                    <div>
                                        <h4 className="font-bold text-primary text-lg">{loc.city}</h4>
                                        <p className="text-sm font-semibold text-secondary mb-1">{locale === 'en' ? loc.typeEn : loc.type}</p>
                                        <p className="text-xs text-slate-500">{loc.address}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Simulated Interactive World Map using Tailwind layouting representing coordinates conceptually */}
                        <div className="lg:col-span-2 relative h-[600px] bg-slate-900 rounded-md border border-white/10 overflow-hidden flex flex-col items-center group">
                            <div className="absolute inset-0 z-0 opacity-20">
                                <Globe className="w-full h-full text-secondary animate-slow-spin" />
                            </div>

                            {/* Hierarchy Tree Overlay */}
                            <div className="relative z-10 w-full p-8 bg-black/40 backdrop-blur-md flex flex-col items-center">
                                <p className="text-secondary text-xs font-bold tracking-[0.3em] uppercase mb-8">{locale === 'en' ? 'Operational Structure' : 'Estructura Operativa'}</p>
                                <div className="flex flex-col items-center gap-12 w-full max-w-2xl">
                                    {/* Level 1: HQ */}
                                    <div className="relative p-4 border border-secondary bg-secondary/10 rounded-sm text-center min-w-[200px] shadow-[0_0_20px_rgba(79,176,198,0.3)]">
                                        <p className="text-white font-bold">{locale === 'en' ? 'CLERHP Group HQ' : 'Sede Central CLERHP'}</p>
                                        <div className="absolute -bottom-12 left-1/2 w-[1px] h-12 bg-secondary" />
                                    </div>

                                    {/* Level 2: Offices / Master Brokers */}
                                    <div className="flex justify-between w-full h-24 items-end relative">
                                        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-secondary" />
                                        <div className="absolute top-0 left-1/4 w-[1px] h-8 bg-secondary" />
                                        <div className="absolute top-0 right-1/4 w-[1px] h-8 bg-secondary" />

                                        <div className="p-3 border border-slate-700 bg-slate-800/80 rounded-sm text-xs text-center min-w-[140px]">
                                            <p className="text-white">{locale === 'en' ? 'Regional Offices' : 'Oficinas Regionales'}</p>
                                        </div>
                                        <div className="p-3 border border-slate-700 bg-slate-800/80 rounded-sm text-xs text-center min-w-[140px]">
                                            <p className="text-white">{locale === 'en' ? 'Master Brokers' : 'Master Brokers'}</p>
                                        </div>
                                    </div>

                                    {/* Level 3: Network */}
                                    <p className="text-slate-400 text-[10px] italic mt-4">
                                        {locale === 'en' ? 'Click on map markers to view assigned Brokers and local offices.' : 'Haz clic en los puntos del mapa para ver Brokers asignados y oficinas locales.'}
                                    </p>
                                </div>
                            </div>

                            <div className="relative z-10 flex-grow w-full flex items-center justify-center p-12">
                                <div className="text-center">
                                    <p className="text-slate-500 uppercase tracking-widest font-bold mb-4">
                                        {locale === 'en' ? '[ INTERACTIVE MAP ACTIVE ]' : '[ MAPA INTERACTIVO ACTIVO ]'}
                                    </p>
                                    <button className="px-6 py-2 border border-secondary text-secondary text-xs uppercase font-bold hover:bg-secondary hover:text-white transition-all">
                                        {locale === 'en' ? 'Filter by Country' : 'Filtrar por País'}
                                    </button>
                                </div>
                            </div>

                            {/* Plotted dots with data hints */}
                            <div className="absolute top-[60%] left-1/4 w-3 h-3 bg-secondary rounded-full shadow-[0_0_15px_rgba(79,176,198,0.8)] animate-pulse cursor-pointer group/dot">
                                <div className="hidden group-hover/dot:block absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-primary p-2 rounded-sm text-[10px] font-bold whitespace-nowrap z-50 shadow-xl">
                                    Miami Hub: 12 Brokers
                                </div>
                            </div>
                            <div className="absolute top-2/3 left-1/2 w-3 h-3 bg-secondary rounded-full shadow-[0_0_15px_rgba(79,176,198,0.8)] animate-pulse cursor-pointer" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Master Brokers Section */}
            <section className="py-24 px-6 lg:px-12 bg-stone-50" id="brokers-oficiales">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-16">
                        <span className="text-secondary tracking-[0.3em] font-medium uppercase mb-4 block">
                            {locale === 'en' ? 'Accredited Network' : 'Red Acreditada'}
                        </span>
                        <h2 className="text-3xl font-playfair font-bold text-primary mb-4">
                            {locale === 'en' ? 'Official Master Brokers' : 'Master Brokers Oficiales'}
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            {locale === 'en' ? 'Meet the agencies and representatives leading the global commercialization of Larimar City & Resort.' : 'Conoce a las agencias y representantes que lideran la comercialización de Larimar City & Resort a nivel global.'}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Miami Realty Group", rep: "Elena Valdés", role: "Principal Broker", location: "Miami, USA", img: "/images/original/MARTA-MARCILLA.jpg", logo: "MRG" },
                            { name: "EuroInvest Partners", rep: "Carlos Ruiz", role: "Managing Director", location: "Madrid, ES", img: "/images/original/Gilberto-Pezzotta-perfil.jpg", logo: "EIP" },
                            { name: "Caribe Prime Estates", rep: "Sofia Méndez", role: "CEO & Founder", location: "Santo Domingo, DR", img: "/images/original/Marisol-Baez-imagen-perfil.png", logo: "CPE" }
                        ].map((broker, idx) => (
                            <div key={idx} className="bg-white border border-slate-100 rounded-sm overflow-hidden hover:border-secondary transition-all group shadow-sm hover:shadow-xl">
                                <div className="relative h-80">
                                    <Image src={broker.img} alt={broker.rep} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                                    <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-sm flex items-center justify-center shadow-lg border-b-2 border-secondary">
                                        <span className="font-bold text-primary text-sm tracking-tighter">{broker.logo}</span>
                                    </div>
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <h3 className="font-playfair text-2xl mb-1">{broker.rep}</h3>
                                        <p className="text-secondary text-xs font-bold tracking-widest uppercase">{broker.role}</p>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="font-bold text-primary text-lg mb-1">{broker.name}</p>
                                    <p className="text-slate-500 text-sm flex items-center gap-2"><MapPin className="w-4 h-4 text-secondary" /> {broker.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* B2B Private Portal Link */}
            <section className="py-24 px-6 lg:px-12 bg-primary/5 border-t border-slate-200" id="portal-b2b">
                <div className="container mx-auto max-w-4xl text-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-md">
                        <Lock className="w-8 h-8 text-secondary" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-6">
                        {locale === 'en' ? 'B2B Brokers & Investors Access' : 'Acceso a Inversores y Brokers B2B'}
                    </h2>
                    <p className="text-slate-600 text-lg mb-10">
                        {locale === 'en' ? 'Our Master Brokers and accredited partners have biometric and protected access to the private Larimar B2B portal; connecting directly to our intranet (Bitrix24) for document management, real-time inventory, and marketing materials.' : 'Nuestros Master Brokers y colaboradores acreditados disponen de acceso biométrico y protegido al portal privado Larimar B2B; conectando directamente con nuestra intranet (Bitrix24) para gestión documental, inventario en tiempo real y material de marketing.'}
                    </p>

                    <div className="bg-white p-8 md:p-12 rounded-md shadow-xl text-left border border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-2 h-full bg-secondary" />
                        <div className="grid md:grid-cols-2 gap-10 items-center">
                            <div>
                                <h3 className="text-2xl font-bold text-primary mb-4">
                                    {locale === 'en' ? 'B2B Portal Login' : 'Ingreso Portal B2B'}
                                </h3>
                                <p className="text-sm text-slate-500 mb-6">
                                    {locale === 'en' ? 'Exclusive area for the commercial and corporate management of the Larimar ecosystem.' : 'Área exclusiva para la gestión comercial y corporativa del ecosistema Larimar.'}
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center text-sm font-medium text-slate-700">
                                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                        {locale === 'en' ? 'Marketing Materials' : 'Materiales de Marketing'}
                                    </li>
                                    <li className="flex items-center text-sm font-medium text-slate-700">
                                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                        {locale === 'en' ? 'Live Inventory' : 'Inventario Live'}
                                    </li>
                                    <li className="flex items-center text-sm font-medium text-slate-700">
                                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                        {locale === 'en' ? 'Intranet Access (Bitrix24)' : 'Acceso Intranet (Bitrix24)'}
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <Link href="/login" className="px-6 py-4 bg-primary text-white text-center font-bold tracking-widest rounded-sm hover:bg-primary/90 transition-colors uppercase flex justify-center items-center">
                                    {locale === 'en' ? 'Sign In' : 'Iniciar Sesión'} <ChevronRight className="ml-2 w-4 h-4" />
                                </Link>
                                <button className="px-6 py-3 bg-transparent border border-slate-300 text-slate-600 font-bold tracking-widest rounded-sm hover:border-secondary hover:text-secondary transition-colors text-sm">
                                    {locale === 'en' ? 'Register as Broker' : 'Darse de alta como Broker'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
