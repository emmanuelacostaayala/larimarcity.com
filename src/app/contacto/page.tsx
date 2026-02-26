"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock, Globe } from "lucide-react";

export default function ContactoPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-[#0a101f] min-h-screen text-white">

      {/* Hero */}
      <section className="relative h-[40vh] min-h-[320px] flex items-end pb-16 overflow-hidden">
        <Image
          src="/images/original/Farallon_Fase-1_larimar-city-1536x864.webp"
          alt="Contacto Larimar City"
          fill
          className="object-cover object-center opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f] to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-[1px] bg-gold" />
              <p className="text-gold uppercase tracking-[0.3em] text-sm font-bold">Estamos Aquí para Ti</p>
            </div>
            <h1 className="font-playfair text-5xl md:text-7xl text-white">Contáctanos</h1>
          </motion.div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

            {/* Left: Contact Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-playfair text-3xl text-white mb-8">Envíanos un Mensaje</h2>

              {submitted ? (
                <div className="bg-white/5 border border-gold/30 p-12 text-center">
                  <Send className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="font-playfair text-2xl text-white mb-2">¡Mensaje Enviado!</h3>
                  <p className="text-white/60">Un asesor te contactará en menos de 24 horas.</p>
                </div>
              ) : (
                <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Nombre Completo *</label>
                      <input required type="text" className="w-full bg-transparent border-b border-white/20 focus:border-gold py-3 text-white outline-none transition-colors placeholder-white/20" placeholder="Ej. María García" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Email *</label>
                      <input required type="email" className="w-full bg-transparent border-b border-white/20 focus:border-gold py-3 text-white outline-none transition-colors placeholder-white/20" placeholder="correo@ejemplo.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Teléfono / WhatsApp</label>
                      <input type="tel" className="w-full bg-transparent border-b border-white/20 focus:border-gold py-3 text-white outline-none transition-colors placeholder-white/20" placeholder="+1 809 000 0000" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">País de Origen</label>
                      <input type="text" className="w-full bg-transparent border-b border-white/20 focus:border-gold py-3 text-white outline-none transition-colors placeholder-white/20" placeholder="España, México, EE.UU..." />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Proyecto de Interés</label>
                    <select className="w-full bg-[#0a101f] border-b border-white/20 focus:border-gold py-3 text-white/80 outline-none transition-colors">
                      <option value="">Seleccionar...</option>
                      <option>Prime Towers</option>
                      <option>Horizon View</option>
                      <option>Breeze Towers</option>
                      <option>Villas Golf</option>
                      <option>Townhouses</option>
                      <option>Información General</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Mensaje</label>
                    <textarea rows={4} className="w-full bg-transparent border-b border-white/20 focus:border-gold py-3 text-white outline-none transition-colors resize-none placeholder-white/20" placeholder="Cuéntanos qué estás buscando..." />
                  </div>
                  <button type="submit" className="self-start flex items-center gap-3 px-10 py-4 bg-gold text-[#0a101f] hover:bg-white transition-colors uppercase tracking-widest text-xs font-bold">
                    Enviar Mensaje
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </motion.div>

            {/* Right: Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col gap-12">
              <h2 className="font-playfair text-3xl text-white mb-4">Información de Contacto</h2>

              <div className="flex flex-col gap-8">
                {[
                  { icon: <MapPin />, title: "Sede Central (España)", lines: ["Avenida Europa, 3B Entresuelo 1", "30007 Murcia, España"] },
                  { icon: <Globe />, title: "Operaciones (Caribe)", lines: ["Edf. Aqua, Av. 1ro de Noviembre 801", "Punta Cana 23000, RD"] },
                  { icon: <Phone />, title: "Teléfonos", lines: ["+34 900 000 000 (España)", "+1 809 000 0000 (RD)"] },
                  { icon: <Mail />, title: "Email", lines: ["info@larimarcity.com", "inversores@larimarcity.com"] },
                  { icon: <Clock />, title: "Horario de Atención", lines: ["Lunes a Viernes: 9:00 - 19:00 CET", "Sábados: 10:00 - 14:00 CET"] },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-10 h-10 border border-gold/30 flex items-center justify-center shrink-0 text-gold">{item.icon}</div>
                    <div>
                      <h4 className="text-white font-semibold mb-1 uppercase tracking-wider text-xs">{item.title}</h4>
                      {item.lines.map((l, i) => <p key={i} className="text-white/60 text-sm">{l}</p>)}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
