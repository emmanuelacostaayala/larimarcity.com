import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { HandHeart, PaintBucket, Layers, Key, CheckCircle, Headphones, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: 'Servicio Postventa & Customer Experience | Larimar City & Resort',
  description: 'Acompañarte hasta que Larimar se convierta en tu hogar en Punta Cana. Diseño de interiores, gestión de la rentabilidad y atención personalizada al inversor.',
};

export default function PostventaPage() {
  return (
    <main className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-32 bg-primary flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/70 z-10" />
          <Image
            src="/images/original/vista-piscina-edificios-2-600x337.webp"
            alt="Larimar City Lifestyle"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="relative z-20 container mx-auto px-6 text-center max-w-4xl">
          <span className="text-secondary tracking-[0.3em] font-medium uppercase mb-4 block">
            Postventa & Customer Experience
          </span>
          <h1 className="text-white font-playfair text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Acompañarte hasta que Larimar se convierta en tu hogar
          </h1>
          <p className="text-slate-200 text-lg md:text-xl font-light">
            En Larimar City & Resort, la experiencia no termina con la compra. Empieza una nueva etapa: la de crear el hogar o la inversión que siempre has imaginado, con calma, confianza y atención personalizada.
          </p>
        </div>
      </section>

      {/* Intro Copy */}
      <section className="py-20 px-6 lg:px-12 bg-stone-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-playfair font-bold text-primary mb-6">Un proceso de compra diseñado a tu medida</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            Sabemos que elegir tu vivienda en el corazón del Caribe es una decisión importante. Por eso, nuestro servicio de Atención al Cliente y Postventa está diseñado para acompañarte desde cualquier lugar del mundo —Nueva York, Madrid, Medellín o Santo Domingo— y facilitarte cada elección, cada detalle y cada paso del proceso de compra de tu apartamento en República Dominicana.
          </p>
          <p className="text-slate-600 text-lg leading-relaxed">
            Entendemos el acompañamiento como un servicio continuo, cercano y humano. Un servicio que resuelve dudas, anticipa necesidades y simplifica procesos, para que el cliente pueda centrarse en lo verdaderamente importante: disfrutar de la experiencia de crear su nuevo hogar en el Caribe o asegurar una gestión óptima de su rentabilidad inmobiliaria.
          </p>
        </div>
      </section>

      {/* Key Pillars */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: HandHeart,
                title: "Acompañamiento Constante",
                text: "La experiencia continúa más allá de la compra. Un servicio personalizado, cercano y profesional que garantiza claridad y confianza en todo momento."
              },
              {
                icon: PaintBucket,
                title: "Interiorismo & Diseño",
                text: "Espacios pensados desde el bienestar. Entornos únicos donde la luz, las proporciones y los materiales crean viviendas elegantes, serenas y atemporales."
              },
              {
                icon: Layers,
                title: "Elección de Materiales",
                text: "Cada material ha sido elegido por su calidad, durabilidad y coherencia caribeña. Acabados nobles que combinan diseño, confort y altísima sostenibilidad."
              },
              {
                icon: Key,
                title: "Llave en Mano & Gestión",
                text: "Todo el proceso necesario para activar la rentabilidad real de la propiedad, garantizando una experiencia óptima para propietarios e inquilinos."
              }
            ].map((pillar, i) => (
              <div key={i} className="bg-stone-50 p-8 rounded-md border border-slate-100 text-center hover:border-secondary transition-colors duration-300 flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-secondary">
                  <pillar.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{pillar.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {pillar.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interior Design & Architecture Content */}
      <section className="py-20 px-6 lg:px-12 bg-stone-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] rounded-md overflow-hidden shadow-2xl">
              <Image
                src="/images/original/breezer_towers_interior_bajo_24.webp"
                alt="Larimar Interiorismo"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-playfair font-bold text-primary mb-6">Interiorismo y personalización en la primera smart city del Caribe</h2>
              <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                Crear un hogar no es solo una cuestión funcional. Es una experiencia emocional. Ponemos a tu alcance un servicio integral de personalización, donde el interiorismo y equipamiento forman parte de una propuesta cuidada y consciente.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                El estilo de vida que define a Larimar City se adapta a ti. Ya sea para la etapa de jubilación, la vida del nómada digital, la creación de una nueva familia, o la inversión con alta visión de rentabilidad; nuestro objetivo es personalizar tu vivienda para que trascienda.
              </p>

              <h3 className="text-xl font-bold text-primary mb-4">Firmas Internacionales Aliadas</h3>
              <p className="text-slate-600 mb-6 border-l-2 border-secondary pl-4 py-1 italic">
                Nuestra apuesta por República Dominicana exige trabajar únicamente con marcas líderes que aporten seguridad a nuestros clientes en Europa, Norteamérica y Latinoamérica.
              </p>

              {/* Trust Markers */}
              <div className="flex flex-wrap items-center gap-6 mt-8 opacity-70 grayscale">
                <div className="flex items-center space-x-2 font-bold text-2xl tracking-widest text-slate-400">
                  <Building2 className="w-6 h-6" /> <span>ROCA</span>
                </div>
                <div className="flex items-center space-x-2 font-bold text-2xl tracking-widest text-slate-400 ml-4">
                  <Building2 className="w-6 h-6" /> <span>CONCREMAX</span>
                </div>
                <div className="flex items-center space-x-2 font-bold text-2xl tracking-widest text-slate-400 ml-4">
                  <Building2 className="w-6 h-6" /> <span>FERRALIA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Support */}
      <section className="py-24 px-6 lg:px-12 bg-primary text-white text-center">
        <div className="container mx-auto max-w-3xl">
          <Headphones className="w-16 h-16 text-secondary mx-auto mb-6" />
          <h2 className="text-4xl font-playfair font-bold mb-6">¿Preparado para dar el siguiente paso?</h2>
          <p className="text-xl text-slate-300 font-light mb-10">
            Nuestros asesores internacionales y el equipo de Postventa están a su total disposición. Porque invertir en el Caribe no debería generar incertidumbre, sino la certeza de haber elegido un proyecto sólido, humano y diseñado para perdurar.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              href="mailto:aencionalcliente@larimarcity.com"
              className="px-8 py-4 bg-secondary text-white font-semibold hover:bg-white hover:text-primary transition-colors rounded-sm tracking-wide"
            >
              Contactar Soporte
            </Link>
            <div className="px-8 py-4 bg-transparent border border-white/50 text-white font-semibold rounded-sm tracking-wide">
              +1 829 761 1316
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
