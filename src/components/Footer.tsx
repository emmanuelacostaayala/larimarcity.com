import { Link as NextLink } from "@/i18n/routing";
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const t = useTranslations('Footer');
    const tNav = useTranslations('Navbar');

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
                            {t('descubre')}
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
                        <h4 className="font-playfair text-xl font-bold">{t('navegacion')}</h4>
                        <ul className="space-y-4">
                            {[
                                { name: tNav('proyectos'), href: "/proyectos" },
                                { name: tNav('faseIMasterplan'), href: "/fase-i-larimar-city-resort" },
                                { name: tNav('inversion'), href: "/inversion" },
                                { name: tNav('amenidades'), href: "/amenidades" },
                                { name: tNav('nuestroEquipo'), href: "/agentes" },
                                { name: tNav('blog'), href: "/blog" }
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
                        <h4 className="font-playfair text-xl font-bold">{t('corporativoTitulo')}</h4>
                        <ul className="space-y-4">
                            {[
                                { name: tNav('grupoClerhp'), href: "/clerhp" },
                                { name: tNav('oficinasCorporativas'), href: "/oficinas-corporativas" },
                                { name: tNav('canalExterno'), href: "/canal-externo" },
                                { name: tNav('servicioPostventa'), href: "/servicio-postventa" },
                                { name: tNav('contacto'), href: "/contacto" }
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
                        <h4 className="font-playfair text-xl font-bold">{t('contactoTitulo')}</h4>
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
                                    <p className="font-bold mb-1">{t('llamanos')}</p>
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
                    <p className="text-white/30 text-xs text-center md:text-left">
                        {t('derechos', { year: currentYear })}
                    </p>
                    <div className="flex gap-8 text-white/30 text-xs">
                        <NextLink href="#" className="hover:text-white transition-colors">{t('avisoLegal')}</NextLink>
                        <NextLink href="#" className="hover:text-white transition-colors">{t('privacidad')}</NextLink>
                        <NextLink href="#" className="hover:text-white transition-colors">{t('cookies')}</NextLink>
                    </div>
                </div>
            </div>
        </footer>
    );
}
