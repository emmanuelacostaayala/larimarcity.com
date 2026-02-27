import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getAgentBySlug, agents } from "@/data/agents";
import { Mail, Phone, MapPin, Globe, Linkedin, ArrowLeft } from "lucide-react";

export function generateStaticParams() {
    return agents.map((agent) => ({
        slug: agent.slug,
    }));
}

export default function AgentProfilePage({ params }: { params: { slug: string } }) {
    const agent = getAgentBySlug(params.slug);

    if (!agent) {
        notFound();
    }

    return (
        <div className="bg-[#0a101f] min-h-screen text-white pt-28 pb-24">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Back Link */}
                <Link
                    href="/agentes"
                    className="inline-flex items-center text-gold hover:text-white transition-colors uppercase tracking-widest text-xs font-semibold mb-12"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver al Directorio
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* Left Column: Image and Contact Meta */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        <div className="relative w-full aspect-[3/4] border border-white/10 group">
                            <Image
                                src={agent.image}
                                alt={`Retrato de ${agent.name}`}
                                fill
                                className="object-cover object-center grayscale opacity-90 group-hover:grayscale-0 transition-all duration-700"
                                priority
                            />
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a101f] to-transparent" />
                        </div>

                        {/* Contact Details Card */}
                        <div className="bg-white/5 border border-white/10 p-8 flex flex-col gap-6">
                            <h3 className="font-playfair text-2xl text-gold mb-2">Contacto Directo</h3>

                            <a href={`tel:${agent.phone.replace(/\s+/g, '')}`} className="flex items-center gap-4 text-white hover:text-gold transition-colors">
                                <div className="w-10 h-10 border border-white/20 flex items-center justify-center shrink-0">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <span className="text-sm tracking-wider">{agent.phone}</span>
                            </a>

                            <a href={`mailto:${agent.email}`} className="flex items-center gap-4 text-white hover:text-gold transition-colors">
                                <div className="w-10 h-10 border border-white/20 flex items-center justify-center shrink-0">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <span className="text-sm tracking-wider break-all">{agent.email}</span>
                            </a>

                            {agent.linkedin && (
                                <a href={agent.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white hover:text-gold transition-colors">
                                    <div className="w-10 h-10 border border-white/20 flex items-center justify-center shrink-0">
                                        <Linkedin className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm tracking-wider">LinkedIn Profile</span>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Bio, Specialties, Form */}
                    <div className="lg:col-span-7 flex flex-col">
                        <h1 className="font-playfair text-5xl md:text-6xl mb-4">{agent.name}</h1>
                        <p className="text-gold uppercase tracking-widest text-sm font-semibold mb-8">
                            {agent.role}
                        </p>

                        <div className="prose prose-invert prose-lg max-w-none mb-12 text-white/70 leading-relaxed font-light">
                            <p>{agent.bio}</p>
                        </div>

                        {/* Meta Grids */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                            <div>
                                <h4 className="text-white uppercase tracking-widest text-xs font-bold mb-4 flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-gold" />
                                    Idiomas
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {agent.languages.map((lang, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 text-white/80 text-sm rounded-sm">
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-white uppercase tracking-widest text-xs font-bold mb-4 flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-gold" />
                                    Especialidades
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {agent.specialties.map((spec, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 text-white/80 text-sm rounded-sm">
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quick Links / Content mapping */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 border-t border-white/10 pt-12">
                            <div>
                                <h4 className="font-playfair text-2xl text-gold mb-6">Proyectos Asignados</h4>
                                <ul className="flex flex-col gap-4">
                                    {agent.projects.map((proj, idx) => (
                                        <li key={idx}>
                                            <Link href={proj.url} className="text-white/80 hover:text-white flex items-center gap-3 group">
                                                <span className="w-8 h-[1px] bg-gold/50 group-hover:w-12 group-hover:bg-gold transition-all" />
                                                {proj.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-playfair text-2xl text-gold mb-6">Publicaciones</h4>
                                <ul className="flex flex-col gap-4">
                                    {agent.articles.map((art, idx) => (
                                        <li key={idx}>
                                            <Link href={art.url} className="text-white/80 hover:text-white flex items-center gap-3 group">
                                                <span className="w-1 h-1 bg-gold rounded-full" />
                                                <span className="line-clamp-2">{art.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Contact Form Dedicated to Agent */}
                        <div className="bg-gradient-to-br from-[#121c30] to-[#0a101f] border border-white/10 p-8 md:p-12">
                            <h3 className="font-playfair text-3xl mb-6">Contactar a {agent.name.split(' ')[0]}</h3>
                            <p className="text-white/60 text-sm mb-8">
                                Completa este formulario y {agent.name.split(' ')[0]} se pondrá en contacto contigo en las próximas 24 horas para brindarte asesoría personalizada.
                            </p>

                            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Nombre Completo</label>
                                        <input type="text" className="w-full bg-transparent border-b border-white/20 focus:border-gold py-2 text-white outline-none transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Email</label>
                                        <input type="email" className="w-full bg-transparent border-b border-white/20 focus:border-gold py-2 text-white outline-none transition-colors" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Teléfono / WhatsApp</label>
                                    <input type="tel" className="w-full bg-transparent border-b border-white/20 focus:border-gold py-2 text-white outline-none transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">¿Cómo podemos ayudarte?</label>
                                    <textarea rows={4} className="w-full bg-transparent border-b border-white/20 focus:border-gold py-2 text-white outline-none transition-colors resize-none" defaultValue={`Hola ${agent.name.split(' ')[0]}, me gustaría recibir información sobre...`}></textarea>
                                </div>
                                <button type="submit" className="self-start mt-4 px-10 py-4 bg-gold text-[#0a101f] font-semibold tracking-widest uppercase text-xs hover:bg-white transition-colors">
                                    Enviar Mensaje
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
