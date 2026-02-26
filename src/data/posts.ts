export interface BlogPost {
    slug: string;
    title: string;
    category: string;
    date: string;
    excerpt: string;
    image: string;
    content: string;
    author?: {
        name: string;
        role: string;
        image: string;
    };
}

export const posts: BlogPost[] = [
    {
        slug: "por-que-punta-cana-es-el-mejor-destino-inversor-2026",
        title: "Por Qué Punta Cana es el Mejor Destino Inversor en 2026",
        category: "Inversión",
        date: "15 Febrero 2026",
        excerpt: "Analizamos los factores macroeconómicos que posicionan a la República Dominicana como la economía de mayor crecimiento del Caribe.",
        image: "/images/original/Farallon_Fase-1_larimar-city-1536x864.webp",
        content: `
      <p>Punta Cana ha dejado de ser únicamente un destino de vacaciones para convertirse en una de las metrópolis más dinámicas y atractivas para la inversión inmobiliaria en todo el Caribe. En 2026, factores macroeconómicos y de infraestructura están convergiendo para crear un escenario sin precedentes.</p>
      
      <h3>1. Conectividad y Crecimiento Económico</h3>
      <p>La República Dominicana se mantiene como la economía de mayor crecimiento en la región. El Aeropuerto Internacional de Punta Cana, con más de 8 millones de pasajeros anuales, es el motor que impulsa la demanda constante de alojamientos, tanto turísticos como residenciales de larga estancia.</p>
      
      <h3>2. Infraestructura de Primer Nivel</h3>
      <p>La consolidación de servicios como el IMG Hospital, centros educativos internacionales y centros comerciales de lujo ha transformado la zona en un lugar viable para vivir todo el año. Larimar City se sitúa en el epicentro de esta transformación, ofreciendo una ciudad planificada desde cero.</p>
      
      <h3>3. Rentabilidad y Plusvalía</h3>
      <p>Con retornos de inversión (ROI) que oscilan entre el 6% y el 10% anual, sumado a una plusvalía histórica sostenida, Punta Cana ofrece una seguridad que pocos mercados pueden igualar. Larimar City, al estar en su fase inicial de desarrollo, ofrece el mayor potencial de crecimiento para los inversores tempranos.</p>
      
      <h3>4. Beneficios Fiscales: Ley CONFOTUR</h3>
      <p>Invertir en Larimar City significa acogerse a los beneficios de la Ley 158-01 (CONFOTUR), que incluye exenciones de impuestos sobre la renta y transferencias inmobiliarias por hasta 15 años. Es una ventaja competitiva masiva que protege y potencia tu capital.</p>
    `
    },
    {
        slug: "smart-city-larimar-sostenibilidad-y-tecnologia",
        title: "Smart City Larimar: Sostenibilidad y Tecnología al Servicio del Lujo",
        category: "Ciudad",
        date: "8 Febrero 2026",
        excerpt: "Cómo Larimar City integra infraestructura tecnológica, energías renovables y diseño bioclimático en un único desarrollo de clase mundial.",
        image: "/images/original/prime-tower-penthouse-terraza-2-scaled.webp",
        content: `
      <p>¿Qué define realmente a una Ciudad Inteligente en el Caribe? En Larimar City & Resort, hemos ido más allá de la simple domótica para crear un ecosistema urbano donde la tecnología mejora la calidad de vida de forma invisible y eficiente.</p>
      
      <h3>Innovación en cada m²</h3>
      <ol>
        <li><strong>Conectividad Ubicua:</strong> Red de fibra óptica de alta velocidad e integración de IoT para la gestión optimizada de servicios públicos.</li>
        <li><strong>Sostenibilidad Real:</strong> Implementación de materiales ecoeficientes, sistemas de reutilización de agua y una apuesta decidida por la energía solar para reducir la huella de carbono.</li>
        <li><strong>Movilidad Inteligente:</strong> Una ciudad diseñada para ser caminable en 15 minutos, reduciendo la dependencia del vehículo y fomentando un estilo de vida activo.</li>
      </ol>
      
      <p>Nuestra visión es clara: el lujo del futuro es sostenible. No se trata solo de construir edificios, sino de generar un entorno que respete la naturaleza del Farallón mientras ofrece las comodidades del mañana.</p>
    `
    },
    {
        slug: "guia-completa-confotur-inversores-extranjeros",
        title: "Guía Completa CONFOTUR 2026: Beneficios para Inversores Extranjeros",
        category: "Legal",
        date: "1 Febrero 2026",
        excerpt: "Explicamos en detalle las exenciones fiscales de la Ley 158-01 y cómo afectan directamente a tu inversión en Larimar City.",
        image: "/images/original/villa-larimar-city-lujo.webp",
        content: `
      <p>La Ley 158-01, conocida como CONFOTUR (Consejo de Fomento Turístico), es el principal incentivo para la inversión extranjera en la República Dominicana. Larimar City & Resort cuenta con esta clasificación, lo que traduce beneficios directos para ti.</p>
      
      <h3>Beneficios Principales</h3>
      <ul>
        <li><strong>Exención del Impuesto de Transferencia (3%):</strong> No pagas el impuesto sobre el valor de la propiedad al momento del registro del título.</li>
        <li><strong>Exención del IPI (1% anual):</strong> El Impuesto al Patrimonio Inmobiliario queda exento durante un periodo de hasta 15 años.</li>
        <li><strong>Exención de Impuestos sobre la Renta:</strong> Especialmente relevante para inversores corporativos y proyectos de desarrollo.</li>
      </ul>
      
      <p>Esta seguridad jurídica y fiscal posiciona a Larimar City como una opción de bajo riesgo y alta eficiencia impositiva para inversores de todo el mundo.</p>
    `
    },
    {
        slug: "prime-towers-penthouses-vista-panoramica",
        title: "Prime Towers: Los Penthouses con la Vista más Espectacular del Caribe",
        category: "Proyectos",
        date: "25 Enero 2026",
        excerpt: "Un recorrido visual por los penthouses triples de Prime Towers y sus 180° de vistas al Océano Atlántico desde el Farallón.",
        image: "/images/original/prime-tower-penthouse-terraza-2-scaled.webp",
        content: `
      <p>Ubicadas en la cota más alta de Larimar City, las Prime Towers representan el pináculo del diseño arquitectónico en el Farallón. Pero es en sus niveles superiores donde ocurre la verdadera magia.</p>
      <p>Los penthouses de Prime Towers han sido diseñados con un concepto de "Open Luxury", donde las barreras entre el interior y el exterior se difuminan gracias a ventanales de suelo a techo y terrazas infinitas.</p>
      <blockquote>"Vivir aquí es como flotar sobre el Caribe, con la seguridad de estar en tierra firme."</blockquote>
    `
    },
    {
        slug: "rentabilidad-airbnb-punta-cana-2026",
        title: "Rentabilidad Airbnb en Punta Cana 2026: Datos Reales por Tipología",
        category: "Inversión",
        date: "18 Enero 2026",
        excerpt: "Nuestro equipo analiza los datos reales de plataformas vacacionales y proyecta los retornos por tipo de unidad en Larimar City.",
        image: "/images/original/render-3d-de-villas-de-lujo-min-scaled.webp",
        content: `
      <p>El mercado de alquiler vacacional en Punta Cana sigue siendo el más fuerte del Caribe. Con una ocupación media que supera el 70% anual en propiedades de calidad, Larimar City ofrece una ventaja única por su oferta complementaria (Golf, Beach Club, Restaurantes).</p>
      <p>Nuestras proyecciones indican que las unidades de 1 y 2 dormitorios en torres como Horizon o Breeze tendrán la mayor tasa de rotación, mientras que las villas generarán ingresos premium en temporadas altas.</p>
    `
    }
];
