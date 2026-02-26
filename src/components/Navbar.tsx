"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
    { name: "INICIO", href: "/" },
    {
        name: "LARIMAR CITY",
        href: "/la-ciudad",
        dropdown: [
            { name: "Visión", href: "/la-ciudad" },
            { name: "Ciudad Sostenible", href: "/ciudad-sostenible" },
            { name: "Amenidades", href: "/amenidades" },
            { name: "Golf & Country", href: "/golf-y-country-club" }
        ]
    },
    {
        name: "PROYECTOS",
        href: "/proyectos",
        dropdown: [
            { name: "Fase I - Masterplan", href: "/fase-i-larimar-city-resort" },
            { name: "Live Towers", href: "/live-towers" },
            { name: "Horizon View", href: "/horizon-view" },
            { name: "Prime Towers", href: "/prime-towers" },
            { name: "Breeze Towers", href: "/breeze-towers" },
            { name: "Villas & Townhouses", href: "/villas" }
        ]
    },
    {
        name: "INVERSIÓN",
        href: "/inversion",
        dropdown: [
            { name: "Inversión Segura", href: "/por-que-invertir" },
            { name: "Invertir como Extranjero", href: "/comprar-propiedad-en-punta-cana" },
            { name: "Renta Vacacional", href: "/inversion-en-alquiler-vacacional-en-punta-cana" }
        ]
    },
    {
        name: "ACTUALIDAD",
        href: "/noticias",
        dropdown: [
            { name: "Noticias", href: "/noticias" },
            { name: "Blog", href: "/blog" },
            { name: "Eventos", href: "/eventos" }
        ]
    },
    {
        name: "CONTACTO",
        href: "/contacto",
        dropdown: [
            { name: "Contáctanos", href: "/contacto" },
            { name: "Agenda una Visita", href: "/agenda" },
            { name: "Servicio Postventa", href: "/servicio-postventa" },
            { name: "Canal Externo (B2B)", href: "/canal-externo" }
        ]
    },
    {
        name: "CORPORATIVO",
        href: "/clerhp",
        dropdown: [
            { name: "Grupo Clerhp (BME: CLR)", href: "/clerhp" },
            { name: "Oficinas Corporativas", href: "/oficinas-corporativas" },
            { name: "Nuestro Equipo", href: "/agentes" }
        ]
    }
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleSubmenu = (index: number) => {
        setOpenSubmenuIndex(openSubmenuIndex === index ? null : index);
    };

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || pathname !== "/"
                ? "bg-primary shadow-lg py-4"
                : "bg-transparent py-4 lg:py-6"
                }`}
        >
            <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="z-50 flex items-center shrink-0">
                    <img
                        src="/images/larimarlogo.png"
                        alt="Larimar City Logo"
                        className={`h-10 lg:h-12 w-auto transition-all duration-300 object-contain ${(isScrolled || pathname !== "/") ? "brightness-0 invert" : ""}`}
                        onError={(e) => { e.currentTarget.src = "/images/larimarlogo.png" }}
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden xl:flex items-center space-x-6 xl:space-x-8">
                    {navLinks.map((link, index) => (
                        <div key={link.name} className="relative group">
                            <Link
                                href={link.href}
                                className={`flex items-center text-[13px] 2xl:text-sm font-medium tracking-wide transition-colors py-2 ${pathname === link.href || (link.dropdown && link.dropdown.some(d => pathname.includes(d.href))) ? "text-secondary font-bold" : "text-white/90 hover:text-accent"
                                    }`}
                            >
                                {link.name}
                                {link.dropdown && <ChevronDown className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" />}
                            </Link>

                            {/* Desktop Dropdown */}
                            {link.dropdown && (
                                <div className="absolute left-0 top-full pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                                    <div className="bg-white rounded-md shadow-xl border border-slate-100 py-3 w-56 flex flex-col overflow-hidden">
                                        {link.dropdown.map((subLink) => (
                                            <Link
                                                key={subLink.name}
                                                href={subLink.href}
                                                target={subLink.href.startsWith('http') ? '_blank' : '_self'}
                                                className={`px-5 py-2.5 text-sm transition-colors ${pathname === subLink.href ? "bg-slate-50 text-secondary font-semibold border-l-2 border-secondary" : "text-primary hover:bg-slate-50 hover:text-secondary border-l-2 border-transparent"
                                                    }`}
                                            >
                                                {subLink.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Desktop CTAs */}
                <div className="hidden xl:flex items-center space-x-4 shrink-0">
                    <Link
                        href="/contacto"
                        className="px-5 py-2.5 text-sm font-medium border border-white/50 text-white rounded-sm hover:bg-white hover:text-primary transition-colors"
                    >
                        Visítanos
                    </Link>
                    <Link
                        href="/canal-externo"
                        className="px-5 py-2.5 text-sm font-medium bg-secondary text-white rounded-sm hover:bg-white hover:text-primary transition-colors duration-300"
                    >
                        Acceso B2B
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="xl:hidden flex items-center space-x-4 z-50">
                    <button
                        className="text-white p-2 focus:outline-none"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Navigation Drawer */}
                <div
                    className={`fixed inset-0 bg-primary/95 backdrop-blur-md z-40 flex flex-col pt-24 pb-8 px-6 overflow-y-auto transition-transform duration-500 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                        } xl:hidden`}
                >
                    <div className="flex flex-col space-y-6">
                        {navLinks.map((link, index) => (
                            <div key={link.name} className="flex flex-col border-b border-white/10 pb-4">
                                <div className="flex items-center justify-between">
                                    <Link
                                        href={link.href}
                                        onClick={() => !link.dropdown && setMobileMenuOpen(false)}
                                        className={`text-lg font-medium tracking-wider ${pathname === link.href || (link.dropdown && link.dropdown.some(d => pathname.includes(d.href))) ? "text-secondary" : "text-white hover:text-secondary"
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                    {link.dropdown && (
                                        <button
                                            onClick={() => toggleSubmenu(index)}
                                            className="p-2 text-white/70"
                                        >
                                            <ChevronDown className={`w-5 h-5 transition-transform ${openSubmenuIndex === index ? "rotate-180" : ""}`} />
                                        </button>
                                    )}
                                </div>

                                {/* Mobile Submenu */}
                                {link.dropdown && (
                                    <div className={`flex flex-col pl-4 mt-2 space-y-3 overflow-hidden transition-all duration-300 ${openSubmenuIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                                        {link.dropdown.map((subLink) => (
                                            <Link
                                                key={subLink.name}
                                                href={subLink.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={`text-base ${pathname === subLink.href ? "text-secondary" : "text-slate-300 hover:text-white"
                                                    }`}
                                            >
                                                {subLink.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-col space-y-4 pt-4">
                        <Link
                            href="/proyectos"
                            className="w-full py-4 bg-secondary text-white text-center font-bold tracking-wider rounded-sm transition-colors hover:bg-white hover:text-primary"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            VER PROYECTOS
                        </Link>
                        <Link
                            href="/canal-externo"
                            className="w-full py-4 border border-white/50 text-white text-center font-bold tracking-wider rounded-sm transition-colors hover:bg-white hover:text-primary"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            ACCESO BROKERS (B2B)
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
