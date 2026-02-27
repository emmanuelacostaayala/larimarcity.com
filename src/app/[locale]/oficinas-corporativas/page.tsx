"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Building2, Phone, Mail, Clock } from "lucide-react";
import { useLocale } from "next-intl";

const offices = {
  es: [
    {
      country: "España",
      city: "Murcia",
      title: "Sede Central Corporativa",
      address: "Avenida Europa, 3B Entresuelo 1",
      zip: "30007 Murcia, España",
      phone: "+34 900 000 000",
      email: "info@clerhp.com",
      image: "/images/original/prime-tower-penthouse-terraza-2-scaled.webp"
    },
    {
      country: "República Dominicana",
      city: "Punta Cana",
      title: "Operaciones Caribe",
      address: "Edf. Aqua, Avenida Primero de Noviembre 801",
      zip: "Punta Cana 23000, RD",
      phone: "+1 809 000 0000",
      email: "caribe@clerhp.com",
      image: "/images/original/vista-atardecer-apartamentos-punta-cana.webp"
    },
    {
      country: "Bolivia",
      city: "Santa Cruz",
      title: "Operaciones Latam",
      address: "Avenida San Martín, Edificio Equipetrol",
      zip: "Santa Cruz de la Sierra, Bolivia",
      phone: "+591 3 000 0000",
      email: "bolivia@clerhp.com",
      image: "/images/original/render-3d-de-villas-de-lujo-min-scaled.webp"
    }
  ],
  en: [
    {
      country: "Spain",
      city: "Murcia",
      title: "Corporate Headquarters",
      address: "Avenida Europa, 3B Entresuelo 1",
      zip: "30007 Murcia, Spain",
      phone: "+34 900 000 000",
      email: "info@clerhp.com",
      image: "/images/original/prime-tower-penthouse-terraza-2-scaled.webp"
    },
    {
      country: "Dominican Republic",
      city: "Punta Cana",
      title: "Caribbean Operations",
      address: "Edf. Aqua, Avenida Primero de Noviembre 801",
      zip: "Punta Cana 23000, DR",
      phone: "+1 809 000 0000",
      email: "caribe@clerhp.com",
      image: "/images/original/vista-atardecer-apartamentos-punta-cana.webp"
    },
    {
      country: "Bolivia",
      city: "Santa Cruz",
      title: "Latam Operations",
      address: "Avenida San Martín, Edificio Equipetrol",
      zip: "Santa Cruz de la Sierra, Bolivia",
      phone: "+591 3 000 0000",
      email: "bolivia@clerhp.com",
      image: "/images/original/render-3d-de-villas-de-lujo-min-scaled.webp"
    }
  ]
};

export default function OficinasCorporativas() {
  const locale = useLocale();
  const currentOffices = locale === 'en' ? offices.en : offices.es;
  return (
    <div className="bg-[#0a101f] min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/original/prime-towers-noche-larimar-city.webp"
          alt="Oficinas Corporativas Larimar City"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a101f]/80 to-[#0a101f]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-playfair text-5xl md:text-7xl text-white mb-6">
              {locale === 'en' ? 'Corporate' : 'Oficinas'} <span className="text-secondary italic">{locale === 'en' ? 'Offices' : 'Corporativas'}</span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto uppercase tracking-widest text-sm">
              {locale === 'en' ? 'Our global network serving your real estate investment' : 'Nuestra red global al servicio de tu inversión inmobiliaria'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Offices Grid */}
      <section className="py-24 container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {currentOffices.map((office, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#121c30] border border-white/5 hover:border-secondary/30 transition-all duration-500 overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={office.image}
                  alt={office.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121c30] to-transparent" />
                <div className="absolute bottom-6 left-8">
                  <span className="text-secondary text-xs font-bold uppercase tracking-widest bg-[#0a101f]/80 px-3 py-1 border border-secondary/30">{office.country}</span>
                </div>
              </div>

              <div className="p-10">
                <h3 className="font-playfair text-3xl mb-2">{office.city}</h3>
                <p className="text-secondary uppercase tracking-widest text-xs font-semibold mb-8">{office.title}</p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-secondary shrink-0 mt-1" />
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address + ' ' + office.city)}`} target="_blank" rel="noopener noreferrer" className="block hover:text-secondary transition-colors">
                      <p className="text-white/80">{office.address}</p>
                      <p className="text-white/40 text-sm">{office.zip}</p>
                    </a>
                  </div>

                  <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-secondary shrink-0" />
                    <a href={`tel:${office.phone.replace(/\s+/g, '')}`} className="text-white/80 hover:text-secondary transition-colors">{office.phone}</a>
                  </div>

                  <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-secondary shrink-0" />
                    <a href={`mailto:${office.email}`} className="text-white/80 hover:text-secondary transition-colors">{office.email}</a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Global Presence Banner */}
      <section className="py-24 bg-secondary/5 border-y border-secondary/10 overflow-hidden relative">
        <div className="container mx-auto px-4 max-w-7xl relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h2 className="font-playfair text-4xl mb-6">
              {locale === 'en' ? (
                <>Solid Institutional <br /><span className="text-secondary italic">Backing</span></>
              ) : (
                <>Un Respaldo <br /><span className="text-secondary italic">Institucional Sólido</span></>
              )}
            </h2>
            <p className="text-white/70 leading-relaxed font-light mb-8">
              {locale === 'en' ? 'As part of the CLERHP Group, our international offices not only manage the development of Larimar City but also act as bridges of trust for our investors in Europe, America, and the Caribbean.' : 'Como parte del Grupo CLERHP, nuestras oficinas internacionales no solo gestionan el desarrollo de Larimar City, sino que actúan como puentes de confianza para nuestros inversores en Europa, América y el Caribe.'}
            </p>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-3xl font-playfair text-secondary">20+</p>
                <p className="text-[10px] uppercase tracking-widest text-white/40">{locale === 'en' ? 'Years of Exp.' : 'Años de Exp.'}</p>
              </div>
              <div className="w-[1px] h-12 bg-white/10" />
              <div className="text-center">
                <p className="text-3xl font-playfair text-secondary">4</p>
                <p className="text-[10px] uppercase tracking-widest text-white/40">{locale === 'en' ? 'Direct Countries' : 'Países Directos'}</p>
              </div>
              <div className="w-[1px] h-12 bg-white/10" />
              <div className="text-center">
                <p className="text-3xl font-playfair text-secondary">10k+</p>
                <p className="text-[10px] uppercase tracking-widest text-white/40">{locale === 'en' ? 'Units in Proj.' : 'Unidades en Proy.'}</p>
              </div>
            </div>
          </div>
          <div className="relative w-full max-w-md aspect-square rounded-full border border-secondary/20 flex items-center justify-center">
            <Building2 className="w-32 h-32 text-secondary/20" />
            <div className="absolute inset-0 bg-secondary/5 blur-[100px] rounded-full" />
          </div>
        </div>
      </section>
    </div>
  );
}
