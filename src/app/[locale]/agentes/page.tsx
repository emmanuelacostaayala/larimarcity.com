"use client";

import { useState } from "react";
import { agents } from "@/data/agents";
import AgentCard from "@/components/AgentCard";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

export default function AgentesDirectory() {
    const locale = useLocale();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredAgents = agents.filter(
        (agent) =>
            agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agent.specialties.some((spec) =>
                spec.toLowerCase().includes(searchTerm.toLowerCase())
            ) ||
            agent.languages.some((lang) =>
                lang.toLowerCase().includes(searchTerm.toLowerCase())
            )
    );

    return (
        <div className="bg-[#0a101f] min-h-screen pt-32 pb-24 text-white">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-playfair text-5xl md:text-7xl mb-6 text-white"
                    >
                        {locale === 'en' ? (
                            <>Our <span className="text-secondary italic">Advisors</span></>
                        ) : (
                            <>Nuestros <span className="text-secondary italic">Asesores</span></>
                        )}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/60 max-w-2xl mx-auto text-lg"
                    >
                        {locale === 'en' ? (
                            <>Connect with our team of real estate investment experts. We guide your investment in the first Smart City in the Caribbean with transparency, professionalism, and exclusive dedication.</>
                        ) : (
                            <>Conecta con nuestro equipo de expertos en inversión inmobiliaria. Guiamos tu inversión en la primera Smart City del Caribe con transparencia, profesionalidad y dedicación exclusiva.</>
                        )}
                    </motion.p>
                </div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-xl mx-auto mb-16 relative"
                >
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-white/40" />
                    </div>
                    <input
                        type="text"
                        placeholder={locale === 'en' ? "Search by name, specialty, or language..." : "Buscar por nombre, especialidad o idioma..."}
                        className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-secondary/50 transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </motion.div>

                {/* Agent Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAgents.length > 0 ? (
                        filteredAgents.map((agent) => (
                            <AgentCard key={agent.id} agent={agent} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-white/50">
                            {locale === 'en' ? 'No advisors found matching your search.' : 'No se encontraron asesores que coincidan con tu búsqueda.'}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
