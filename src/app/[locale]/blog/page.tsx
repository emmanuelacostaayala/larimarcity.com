import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { posts } from "@/data/posts";

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="bg-[#0a101f] min-h-screen text-white">
      {/* Header */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden flex flex-col justify-end">
        <Image src="/images/original/vista-atardecer-apartamentos-punta-cana.webp" alt="Blog Larimar City" fill className="object-cover opacity-30" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f] to-transparent" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-12 h-[1px] bg-secondary" />
            <p className="text-secondary uppercase tracking-[0.3em] text-sm font-bold">
              {locale === 'en' ? 'Knowledge & Market' : 'Conocimiento & Mercado'}
            </p>
          </div>
          <h1 className="font-playfair text-5xl md:text-7xl text-white pr-12">Blog</h1>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">

          {/* Featured Post */}
          <div className="group mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-[#121c30] border border-white/5 overflow-hidden hover:border-gold/20 transition-colors">
              <div className="relative h-80 lg:h-full overflow-hidden">
                <Image src={posts[0].image} alt={(posts[0] as any).titleEn || posts[0].title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-12 flex flex-col justify-center gap-6">
                <span className="text-secondary uppercase tracking-widest text-xs font-bold">{posts[0].category}</span>
                <h2 className="font-playfair text-3xl lg:text-4xl text-white group-hover:text-secondary transition-colors">
                  {locale === 'en' ? (posts[0] as any).titleEn || posts[0].title : posts[0].title}
                </h2>
                <p className="text-white/60 leading-relaxed">
                  {locale === 'en' ? (posts[0] as any).excerptEn || posts[0].excerpt : posts[0].excerpt}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-white/40 text-xs flex items-center gap-2"><Calendar className="w-3 h-3" />{posts[0].date}</span>
                  <Link href={`/blog/${posts[0].slug}`} className="text-secondary text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:text-white transition-colors">
                    {locale === 'en' ? 'Read Article' : 'Leer Artículo'} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Rest of Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post, idx) => (
              <div key={idx} className="group bg-[#121c30] border border-white/5 hover:border-secondary/20 transition-colors overflow-hidden flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image src={post.image} alt={(post as any).titleEn || post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8 flex flex-col gap-4 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-secondary uppercase tracking-widest text-xs font-bold">{post.category}</span>
                    <span className="text-white/40 text-xs flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                  </div>
                  <h3 className="font-playfair text-xl text-white group-hover:text-secondary transition-colors line-clamp-2">
                    {locale === 'en' ? (post as any).titleEn || post.title : post.title}
                  </h3>
                  <p className="text-white/60 text-sm line-clamp-3">
                    {locale === 'en' ? (post as any).excerptEn || post.excerpt : post.excerpt}
                  </p>
                  <Link href={`/blog/${post.slug}`} className="text-secondary text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:text-white transition-colors mt-auto">
                    {locale === 'en' ? 'Read More' : 'Leer'} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 flex items-center justify-center gap-3 text-white/40">
            <BookOpen className="w-5 h-5" />
            <p className="text-sm">{locale === 'en' ? 'More articles coming soon...' : 'Más artículos próximamente...'}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
