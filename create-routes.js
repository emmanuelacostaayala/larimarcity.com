const fs = require('fs');
const path = require('path');

const routes = [
    // 1. Rutas de Conversión e Inversión (SEO Core)
    'comprar-propiedad-en-punta-cana',
    'requisitos-y-procedimientos-para-inversores-extranjeros-en-rd',
    'ventaja-competitiva-de-punta-cana',
    'inversion-en-alquiler-vacacional-en-punta-cana',
    'por-que-invertir',

    // 2. Rutas de Proyectos e Inventario (Fase I y otros)
    'proyectos',
    'fase-i-larimar-city-resort',
    'horizon-view',
    'prime-towers',
    'breeze-towers',
    'paradise-towers',
    'villas-golf',
    'townhouses',
    'sunset-residences',

    // 3. Rutas de Concepto, Ciudad y Estilo de Vida
    'la-ciudad',
    'ciudad-destino-punta-cana',
    'ciudad-sostenible',
    'concepto-ciudad',
    'amenities',

    // 4. Rutas Corporativas, Equipo y Soporte
    'grupo-clerhp',
    'nuestro-equipo-venta-brokers',
    'oficinas-corporativas',
    'servicio-postventa',
    'contacto',
    'preguntas-frecuentes',

    // 5. Rutas de Contenido Dinámico (Blog/News)
    'blog',
    'noticias',
    'eventos',
    'larimar-magazine',

    // 6. Rutas B2B (Privadas)
    'login',
    'dashboard-brokers',
    'dashboard-brokers/inventario',
    'dashboard-brokers/materiales'
];

routes.forEach(route => {
    const dir = path.join(__dirname, 'src', 'app', route);
    fs.mkdirSync(dir, { recursive: true });

    const title = route.split('/').pop().split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    const content = `import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${title} | Larimar City & Resort',
  description: 'Descubre ${title} en Larimar City & Resort. La primera Smart City en Punta Cana con 22,000 propiedades de lujo.',
};

export default function Page() {
  return (
    <main className="min-h-screen py-24 px-8 max-w-7xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">{ '${title}' }</h1>
      <p className="text-lg text-gray-600">
        Bienvenido a la página de ${title}. Esta sección está en construcción.
      </p>
    </main>
  );
}
`;

    fs.writeFileSync(path.join(dir, 'page.tsx'), content);
    console.log(`Created route: /${route}`);
});
