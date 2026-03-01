import { posts } from "@/data/posts";
import Image from "next/image";
import { Link, routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Calendar, User, ChevronLeft, Share2, Bookmark } from "lucide-react";
import { Metadata } from "next";

interface Props {
    params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, locale } = await params;
    const post = posts.find((p) => p.slug === slug);

    if (!post) return { title: locale === 'en' ? "Post not found" : "Post no encontrado" };

    return {
        title: `${locale === 'en' ? (post as any).titleEn || post.title : post.title} | Blog Larimar City`,
        description: locale === 'en' ? (post as any).excerptEn || post.excerpt : post.excerpt,
    };
}

export async function generateStaticParams() {
    const params: { locale: string; slug: string }[] = [];

    routing.locales.forEach((locale: any) => {
        posts.forEach((post) => {
            params.push({
                locale,
                slug: post.slug,
            });
        });
    });

    return params;
}

export default async function BlogPostPage({ params }: Props) {
    const { slug, locale } = await params;
    const post = posts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-white">
            {/* Article Hero */}
            <header className="relative w-full h-[60vh] min-h-[500px] flex items-end pb-16 bg-primary overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent z-10" />
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover opacity-80"
                        priority
                    />
                </div>

                <div className="relative z-20 container mx-auto px-6 lg:px-12">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-secondary text-sm font-bold uppercase tracking-widest mb-8 hover:text-white transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" /> {locale === 'en' ? 'Back to Blog' : 'Volver al Blog'}
                    </Link>
                    <div className="max-w-4xl">
                        <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary text-xs font-bold uppercase tracking-widest rounded-sm mb-4 border border-secondary/30 backdrop-blur-md">
                            {post.category}
                        </span>
                        <h1 className="text-white font-playfair text-4xl md:text-6xl font-bold leading-tight mb-6">
                            {locale === 'en' ? (post as any).titleEn || post.title : post.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-slate-300 text-sm">
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-secondary" /> {post.date}
                            </span>
                            <span className="flex items-center gap-2">
                                <User className="w-4 h-4 text-secondary" /> {locale === 'en' ? 'By Team Larimar' : 'Por Equipo Larimar'}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Article Content */}
            <div className="container mx-auto px-6 lg:px-12 py-20">
                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <div
                            className="max-w-none text-[#334155] [&>p:first-of-type]:text-2xl [&>p:first-of-type]:font-light [&>p:first-of-type]:leading-relaxed [&>p:first-of-type]:mb-10 [&>p:first-of-type]:text-[#1e293b] [&>h3]:font-playfair [&>h3]:text-3xl [&>h3]:md:text-4xl [&>h3]:font-bold [&>h3]:text-[#0a101f] [&>h3]:mt-16 [&>h3]:mb-8 [&>h3]:border-l-4 [&>h3]:border-gold [&>h3]:pl-6 [&>p]:text-lg [&>p]:leading-relaxed [&>p]:mb-8 [&>ul]:list-none [&>ul]:pl-0 [&>ul]:mb-8 [&>ul>li]:relative [&>ul>li]:pl-6 [&>ul>li]:mb-4 [&>ul>li]:before:content-[''] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:top-3 [&>ul>li]:before:w-2 [&>ul>li]:before:h-2 [&>ul>li]:before:bg-gold [&>ul>li]:before:rounded-full [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-8 [&>ol>li]:mb-4 [&>ol>li::marker]:text-gold [&>ol>li::marker]:font-bold [&>strong]:text-[#0a101f] [&>blockquote]:border-l-4 [&>blockquote]:border-gold [&>blockquote]:bg-slate-50 [&>blockquote]:p-8 [&>blockquote]:my-12 [&>blockquote]:text-2xl [&>blockquote]:font-playfair [&>blockquote]:italic [&>blockquote]:text-[#0a101f] [&>blockquote]:rounded-r-xl"
                            dangerouslySetInnerHTML={{ __html: locale === 'en' ? (post as any).contentEn || post.content : post.content }}
                        />

                        <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex gap-4">
                                <button className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-sm font-medium">
                                    <Share2 className="w-4 h-4" /> {locale === 'en' ? 'Share' : 'Compartir'}
                                </button>
                                <button className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-sm font-medium">
                                    <Bookmark className="w-4 h-4" /> {locale === 'en' ? 'Save' : 'Guardar'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-12">
                        <div className="bg-slate-50 p-8 rounded-md border border-slate-100">
                            <h3 className="font-playfair text-xl font-bold text-primary mb-6">{locale === 'en' ? 'Smart Investment' : 'Inversión Inteligente'}</h3>
                            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                                {locale === 'en' ? 'Join the first Smart City in the Caribbean. Discover how Larimar City redefines safety and property value in Punta Cana.' : 'Únete a la primera Smart City del Caribe. Descubre cómo Larimar City redefine el concepto de seguridad y plusvalía en Punta Cana.'}
                            </p>
                            <Link
                                href="/agenda"
                                className="block w-full text-center py-4 bg-primary text-white font-bold text-sm tracking-widest uppercase hover:bg-secondary transition-colors transition-all duration-300 rounded-sm"
                            >
                                {locale === 'en' ? 'Schedule a Call' : 'Agenda una Llamada'}
                            </Link>
                        </div>

                        <div className="space-y-6">
                            <h3 className="font-playfair text-xl font-bold text-primary px-2">{locale === 'en' ? 'More Articles' : 'Más Artículos'}</h3>
                            <div className="grid gap-6">
                                {posts.filter(p => p.slug !== slug).slice(0, 3).map((related, i) => (
                                    <Link key={i} href={`/blog/${related.slug}`} className="group flex gap-4 items-start">
                                        <div className="relative w-24 h-20 shrink-0 overflow-hidden rounded-sm">
                                            <Image
                                                src={related.image}
                                                alt={locale === 'en' ? (related as any).titleEn || related.title : related.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div>
                                            <span className="text-secondary text-[10px] font-bold uppercase tracking-wider">{related.category}</span>
                                            <h4 className="text-primary font-bold text-sm leading-snug line-clamp-2 group-hover:text-secondary transition-colors">
                                                {locale === 'en' ? (related as any).titleEn || related.title : related.title}
                                            </h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </article>
    );
}
