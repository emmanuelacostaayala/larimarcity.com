import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Breeze Towers | Larimar City & Resort',
  description: 'Descubre Breeze Towers en Larimar City & Resort. La primera Smart City en Punta Cana con 22,000 propiedades de lujo.',
};

export default function Page() {
  return (
    <main className="min-h-screen py-24 px-8 max-w-7xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">{ 'Breeze Towers' }</h1>
      <p className="text-lg text-gray-600">
        Bienvenido a la página de Breeze Towers. Esta sección está en construcción.
      </p>
    </main>
  );
}
