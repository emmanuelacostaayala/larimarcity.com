export interface Agent {
    id: string;
    slug: string;
    name: string;
    role: string;
    image: string;
    bio: string;
    languages: string[];
    specialties: string[];
    phone: string;
    email: string;
    linkedin?: string;
    projects: {
        name: string;
        url: string;
    }[];
    articles: {
        title: string;
        url: string;
    }[];
}

export const agents: Agent[] = [
    {
        id: "ag-001",
        slug: "luca-lodi",
        name: "Luca Lodi",
        role: "Senior Investment Advisor",
        image: "/images/original/villa-larimar-city-lujo.webp", // Using premium placeholder
        bio: "Con más de 12 años de experiencia en el mercado inmobiliario del Caribe, Luca se especializa en asesorar a inversores internacionales en la adquisición de activos de alto rendimiento en Punta Cana. Su profundo conocimiento de Larimar City & Resort garantiza que cada cliente encuentre la propiedad perfecta para maximizar su ROI.",
        languages: ["Español", "English", "Italiano"],
        specialties: ["Inversión Extranjera", "Villas de Lujo", "Renta Vacacional"],
        phone: "+1 829 555 0101",
        email: "luca.lodi@larimarcity.com",
        linkedin: "https://linkedin.com/in/lucalodi",
        projects: [
            { name: "Prime Towers", url: "/prime-towers" },
            { name: "Villas Golf", url: "/villas-golf" }
        ],
        articles: [
            { title: "El Auge de la Inversión en Punta Cana en 2026", url: "/blog/auge-inversion-punta-cana" },
            { title: "Cómo el Diseño Sostenible Incrementa el Valor de tu Propiedad", url: "/blog/diseno-sostenible-valor" }
        ]
    },
    {
        id: "ag-002",
        slug: "leticia-decena",
        name: "Leticia Decena",
        role: "Directora Comercial",
        image: "/images/original/Farallon_Fase-1_larimar-city.webp", // Using premium placeholder
        bio: "Leticia lidera el equipo comercial de Larimar City con una visión estratégica enfocada en la satisfacción total del cliente. Su enfoque consultivo y su habilidad para entender las necesidades únicas de cada familia la convierten en la guía ideal para quienes buscan no solo una inversión, sino un hogar en el Caribe.",
        languages: ["Español", "English"],
        specialties: ["Residencias Familiares", "Townhouses", "Postventa"],
        phone: "+1 829 555 0102",
        email: "leticia.decena@larimarcity.com",
        linkedin: "https://linkedin.com/in/leticiadecena",
        projects: [
            { name: "Horizon View", url: "/horizon-view" },
            { name: "Townhouses", url: "/townhouses" }
        ],
        articles: [
            { title: "Creando Hogares: El Lujo de Vivir en Larimar", url: "/blog/lujo-vivir-larimar" },
            { title: "Guía para Familias Expatriadas en República Dominicana", url: "/blog/guia-familias-expatriadas" }
        ]
    },
    {
        id: "ag-003",
        slug: "carlos-mendoza",
        name: "Carlos Mendoza",
        role: "Expert en Campos de Golf",
        image: "/images/original/LARIMAR_MASTERPLAN_Foto.webp", // Using premium placeholder
        bio: "Apasionado por el golf y el estilo de vida premium, Carlos es nuestro especialista en las propiedades colindantes a los campos de golf de Larimar City. Su asesoramiento combina la perspectiva deportiva con el análisis de rentabilidad, ofreciendo opciones incomparables para los amantes de este deporte.",
        languages: ["Español", "English", "Français"],
        specialties: ["Golf Residences", "Country Club Lifestyle", "Inversión Temática"],
        phone: "+1 829 555 0103",
        email: "carlos.mendoza@larimarcity.com",
        projects: [
            { name: "Golf Residences", url: "/golf-y-country-club" },
            { name: "Live Towers", url: "/live-towers" }
        ],
        articles: [
            { title: "Por Qué Invertir en una Propiedad con Campo de Golf", url: "/blog/invertir-campo-golf" }
        ]
    }
];

export function getAgentBySlug(slug: string): Agent | undefined {
    return agents.find(agent => agent.slug === slug);
}
