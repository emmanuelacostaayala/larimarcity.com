"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, Video, Users, ArrowRight, MapPin } from "lucide-react";
import { useLocale } from "next-intl";

const slots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"
];

export default function AgendaPage() {
    const [step, setStep] = useState(1);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const locale = useLocale();

    return (
        <div className="bg-[#0a101f] min-h-screen text-white pt-20">
            <div className="container mx-auto px-4 py-24 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Left Column: Context */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h1 className="font-playfair text-5xl md:text-6xl mb-6">
                                {locale === 'en' ? 'Schedule a ' : 'Agenda una '}<span className="text-secondary italic">{locale === 'en' ? 'Visit' : 'Visita'}</span>
                            </h1>
                            <p className="text-white/60 mb-12 leading-relaxed">
                                {locale === 'en'
                                    ? 'Select the time that best suits you for a personalized session with one of our expert advisors. We can conduct a video call or welcome you at our offices.'
                                    : 'Selecciona el horario que mejor te convenga para una sesión personalizada con uno de nuestros asesores expertos. Podemos realizar una videollamada o recibirte en nuestras oficinas.'}
                            </p>

                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 border border-secondary/30 flex items-center justify-center shrink-0">
                                        <Video className="w-5 h-5 text-secondary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">{locale === 'en' ? 'Virtual Meeting' : 'Reunión Virtual'}</h4>
                                        <p className="text-white/40 text-sm">{locale === 'en' ? 'Zoom or Google Meet for international investors.' : 'Zoom o Google Meet para inversores internacionales.'}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 border border-secondary/30 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-secondary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">{locale === 'en' ? 'Visit the Farallón' : 'Visita al Farallón'}</h4>
                                        <p className="text-white/40 text-sm">{locale === 'en' ? 'Physical tour of the terrain and Masterplan visualization.' : 'Recorrido físico por el terreno y visualización del Masterplan.'}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Scheduling Widget */}
                    <div className="lg:col-span-7 bg-[#121c30] border border-white/10 p-8 md:p-12">
                        {step === 1 ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <h3 className="font-playfair text-3xl mb-8 flex items-center gap-3">
                                    <Calendar className="text-secondary" /> {locale === 'en' ? 'Select the Time' : 'Selecciona el Horario'}
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                                    {slots.map((slot) => (
                                        <button
                                            key={slot}
                                            onClick={() => setSelectedSlot(slot)}
                                            className={`p-4 border text-sm font-semibold transition-all ${selectedSlot === slot
                                                ? "bg-secondary text-[#0a101f] border-secondary"
                                                : "border-white/10 text-white/60 hover:border-secondary/50"
                                                }`}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    disabled={!selectedSlot}
                                    onClick={() => setStep(2)}
                                    className="w-full py-5 bg-white text-[#0a101f] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-secondary transition-colors uppercase tracking-widest text-xs font-bold flex items-center justify-center gap-2"
                                >
                                    Continuar <ArrowRight className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <h3 className="font-playfair text-3xl mb-8">{locale === 'en' ? 'Confirm your Details' : 'Confirma tus Datos'}</h3>
                                <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">{locale === 'en' ? 'Full Name' : 'Nombre Completo'}</label>
                                            <input required type="text" className="w-full bg-transparent border-b border-white/20 focus:border-secondary py-2 text-white outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Email</label>
                                            <input required type="email" className="w-full bg-transparent border-b border-white/20 focus:border-secondary py-2 text-white outline-none" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">{locale === 'en' ? 'Phone *' : 'Teléfono *'}</label>
                                            <input required type="tel" className="w-full bg-transparent border-b border-white/20 focus:border-secondary py-2 text-white outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">{locale === 'en' ? 'Preferred Modality' : 'Modalidad Preferida'}</label>
                                            <select className="w-full bg-[#121c30] border-b border-white/20 focus:border-secondary py-2 text-white outline-none uppercase tracking-widest text-[10px]">
                                                <option>{locale === 'en' ? 'Virtual (Zoom / Meet)' : 'Virtual (Zoom / Meet)'}</option>
                                                <option>{locale === 'en' ? 'In-Person (Punta Cana)' : 'Presencial (Punta Cana)'}</option>
                                                <option>{locale === 'en' ? 'In-Person (Spain Offices)' : 'Presencial (Oficinas España)'}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">{locale === 'en' ? `Session for day ${selectedSlot}` : `Sesión para el día ${selectedSlot}`}</label>
                                        <textarea rows={3} placeholder={locale === 'en' ? "Any specific questions you'd like to discuss?" : "¿Alguna pregunta específica que quieras tratar?"} className="w-full bg-transparent border-b border-white/20 focus:border-secondary py-2 text-white outline-none resize-none" />
                                    </div>
                                    <div className="flex gap-4">
                                        <button type="button" onClick={() => setStep(1)} className="px-8 py-4 border border-white/20 hover:border-white transition-colors text-xs uppercase tracking-widest font-bold">{locale === 'en' ? 'Back' : 'Volver'}</button>
                                        <button type="submit" className="flex-1 py-4 bg-secondary text-[#0a101f] hover:bg-white transition-colors text-xs uppercase tracking-widest font-bold">{locale === 'en' ? 'Confirm Appointment' : 'Confirmar Cita'}</button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                                <div className="w-20 h-20 bg-secondary/10 text-secondary mx-auto rounded-full flex items-center justify-center mb-6">
                                    <Users className="w-10 h-10" />
                                </div>
                                <h3 className="font-playfair text-4xl mb-4">{locale === 'en' ? 'Appointment Requested!' : '¡Cita Solicitada!'}</h3>
                                <p className="text-white/60 mb-8">{locale === 'en' ? `You will receive a confirmation email and the session link shortly. See you on ${selectedSlot}!` : `Recibirás un correo de confirmación y el link de la sesión en breve. ¡Nos vemos en ${selectedSlot}!`}</p>
                                <button onClick={() => setStep(1)} className="text-secondary uppercase tracking-[0.2em] text-xs font-bold hover:text-white transition-colors">{locale === 'en' ? 'Schedule another' : 'Agendar otra'}</button>
                            </motion.div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
