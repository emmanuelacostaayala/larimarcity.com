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
                        <div className="lg:col-span-2 relative h-[500px] bg-slate-100 rounded-md border border-slate-200 overflow-hidden flex items-center justify-center">
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+")', backgroundSize: '16px' }} />
                            <Globe className="absolute w-[800px] h-[800px] text-slate-200 scale-150 transform -translate-y-20 opacity-50" />
                            <div className="relative z-10 text-center">
                                <p className="text-slate-500 uppercase tracking-widest font-bold mb-4">
                                    {locale === 'en' ? '[ INTERACTIVE MAP SIMULATION ]' : '[ SIMULACIÓN MAPA INTERACTIVO ]'}
                                </p>
                                <p className="text-sm text-slate-400 max-w-sm mx-auto">
                                    {locale === 'en' ? 'Through a geographic API connector (Google Maps / Mapbox), this space will render global coverage and clickable profiles of authorized brokers.' : 'A través de un conector API geográfico (Google Maps / Mapbox), este espacio renderizará la cobertura mundial y los perfiles clickeables de los brokers autorizados.'}
                                </p>
                            </div>

                            {/* Mocking plotted dots */}
                            <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-secondary rounded-full shadow-[0_0_15px_rgba(79,176,198,0.8)] animate-pulse" />
                            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-secondary rounded-full shadow-[0_0_15px_rgba(79,176,198,0.8)] animate-pulse" />
                            <div className="absolute top-[40%] right-1/4 w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(18,55,85,0.8)]" />
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
