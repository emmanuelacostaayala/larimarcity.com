import Link from "next/image";
import NextLink from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#050a15] text-white border-t border-white/5 py-20">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

                    {/* Brand & Mission */}
                    <div className="space-y-8">
                        <NextLink href="/" className="block">
                            <Image
                                src="/images/larimarlogo.png"
                                alt="Larimar City & Resort"
                                width={180}
                                height={60}
                                className="brightness-0 invert"
                            />
                        </NextLink>
                        <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                            La primera Smart City del Caribe. Un proyecto disruptivo que integra sostenibilidad, tecnología y lujo en la cota más alta de Punta Cana.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                                <NextLink key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all text-white/50 hover:text-white">
                                    <Icon className="w-4 h-4" />
                                </NextLink>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-8">
                        <h4 className="font-playfair text-xl font-bold">Navegación</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Proyectos", href: "/proyectos" },
                                { name: "Fase I", href: "/fase-i-larimar-city-resort" },
                                { name: "Inversión", href: "/inversion" },
                                { name: "Amenities", href: "/amenidades" },
                                { name: "Agentes", href: "/agentes" },
                                { name: "Blog", href: "/blog" }
                            ].map((link, i) => (
                                <li key={i}>
                                    <NextLink href={link.href} className="text-white/50 hover:text-secondary text-sm transition-colors flex items-center gap-2 group">
                                        <span className="w-0 h-[1px] bg-secondary group-hover:w-4 transition-all" />
                                        {link.name}
                                    </NextLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Corporate */}
                    <div className="space-y-8">
                        <h4 className="font-playfair text-xl font-bold">Corporativo</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Grupo CLERHP", href: "/clerhp" },
                                { name: "Oficinas", href: "/oficinas-corporativas" },
                                { name: "Canal Externo", href: "/canal-externo" },
                                { name: "Servicio Postventa", href: "/servicio-postventa" },
                                { name: "Contacto", href: "/contacto" }
                            ].map((link, i) => (
                                <li key={i}>
                                    <NextLink href={link.href} className="text-white/50 hover:text-secondary text-sm transition-colors flex items-center gap-2 group">
                                        <span className="w-0 h-[1px] bg-secondary group-hover:w-4 transition-all" />
                                        {link.name}
                                    </NextLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <h4 className="font-playfair text-xl font-bold">Contacto</h4>
                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <MapPin className="w-5 h-5 text-secondary shrink-0" />
                                <div className="text-sm">
                                    <p className="font-bold mb-1">Punta Cana, RD</p>
                                    <p className="text-white/50">Edf Aqua, Av. 1ero de Noviembre, Punta Cana 23000</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <Phone className="w-5 h-5 text-secondary shrink-0" />
                                <div className="text-sm">
                                    <p className="font-bold mb-1">Llámanos</p>
                                    <p className="text-white/50">+1 (809) 630-1698</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <Mail className="w-5 h-5 text-secondary shrink-0" />
                                <div className="text-sm">
                                    <p className="font-bold mb-1">Email</p>
                                    <p className="text-white/50">info@larimarcity.com</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-white/30 text-xs">
                        © {currentYear} Larimar City & Resort. Todos los derechos reservados. Un proyecto de Grupo CLERHP.
                    </p>
                    <div className="flex gap-8 text-white/30 text-xs">
                        <NextLink href="#" className="hover:text-white transition-colors">Aviso Legal</NextLink>
                        <NextLink href="#" className="hover:text-white transition-colors">Política de Privacidad</NextLink>
                        <NextLink href="#" className="hover:text-white transition-colors">Cookies</NextLink>
                    </div>
                </div>
            </div>
        </footer>
    );
}
