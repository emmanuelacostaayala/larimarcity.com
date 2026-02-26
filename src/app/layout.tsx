import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Larimar City & Resort | Punta Cana",
  description: "La primera Smart City en República Dominicana. Un estilo de vida superior con 22,000 propiedades de lujo en Punta Cana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#0a101f] text-stone-900`}>
        <Navbar />
        {/* pt-20 compensates for the fixed-position Navbar (80px) on all pages */}
        <main className="pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}

