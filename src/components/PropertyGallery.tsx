"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const images = [
    { src: "/images/original/prime-towers-exterior-12.webp", alt: "Prime Towers Exterior Arch View" },
    { src: "/images/original/prime-tower-penthouse-terraza-2-scaled.webp", alt: "Prime Towers Penthouse Terrace" },
    { src: "/images/original/Salon_Atardecer-prime-towers-scaled.jpg", alt: "Prime Towers Living Room Sunset" },
    { src: "/images/original/prime-towers-exterior-12.webp", alt: "Prime Towers Night View" },
    { src: "/images/original/SR_Int_11-scaled.webp", alt: "Prime Towers Premium Interior" }
];

export default function PropertyGallery() {
    const [index, setIndex] = useState(0);

    const next = () => setIndex((i) => (i + 1) % images.length);
    const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

    return (
        <div className="relative w-full aspect-[16/10] bg-stone-100 overflow-hidden group rounded-sm">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={images[index].src}
                        alt={images[index].alt}
                        fill
                        className="object-cover"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={prev}
                    className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={next}
                    className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Index indicator */}
            <div className="absolute bottom-8 right-8 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 text-white text-xs tracking-widest font-bold rounded-sm">
                {index + 1} / {images.length}
            </div>

            {/* Thumbnails */}
            <div className="absolute bottom-8 left-8 flex gap-2">
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`w-12 h-12 rounded-sm overflow-hidden border-2 transition-all ${i === index ? 'border-secondary scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`}
                    >
                        <Image src={img.src} alt="thumb" fill className="object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
}
