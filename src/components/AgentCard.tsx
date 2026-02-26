"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, MapPin, Mail, Phone } from "lucide-react";
import type { Agent } from "@/data/agents";

export default function AgentCard({ agent }: { agent: Agent }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative bg-[#0a101f] border border-white/5 overflow-hidden flex flex-col items-center text-center hover:border-gold/30 transition-colors duration-500"
        >
            {/* Decorative Top Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Profile Image Container */}
            <div className="w-full relative h-[400px] overflow-hidden">
                <Image
                    src={agent.image}
                    alt={`Retrato de ${agent.name}`}
                    fill
                    className="object-cover object-center grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f] via-[#0a101f]/40 to-transparent" />
            </div>

            {/* Content Area */}
            <div className="p-8 -mt-20 relative z-10 w-full flex flex-col items-center">
                <h3 className="font-playfair text-3xl text-white mb-2">{agent.name}</h3>
                <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-6">
                    {agent.role}
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {agent.specialties.slice(0, 2).map((specialty, idx) => (
                        <span
                            key={idx}
                            className="px-3 py-1 bg-white/5 border border-white/10 text-white/70 text-xs rounded-full"
                        >
                            {specialty}
                        </span>
                    ))}
                </div>

                <p className="text-white/60 text-sm mb-8 line-clamp-3 px-4">
                    {agent.bio}
                </p>

                <div className="flex gap-4">
                    <Link
                        href={`/agentes/${agent.slug}`}
                        className="px-6 py-3 bg-gold/10 text-gold border border-gold/20 hover:bg-gold hover:text-primary transition-all duration-300 uppercase tracking-widest text-xs font-medium"
                    >
                        Ver Perfil
                    </Link>
                    <a
                        href={`mailto:${agent.email}`}
                        className="w-12 h-12 flex items-center justify-center border border-white/10 text-white hover:border-gold hover:text-gold transition-colors duration-300"
                        aria-label={`Enviar correo a ${agent.name}`}
                    >
                        <Mail className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
