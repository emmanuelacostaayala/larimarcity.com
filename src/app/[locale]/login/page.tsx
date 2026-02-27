"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="bg-[#0a101f] min-h-screen text-white flex items-center justify-center relative overflow-hidden">

      {/* Background */}
      <Image src="/images/original/prime-towers-noche-larimar-city-1024x576.webp" alt="Acceso Portal B2B" fill className="object-cover opacity-20" />
      <div className="absolute inset-0 bg-[#0a101f]/80 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-md px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="bg-[#121c30]/90 border border-white/10 p-10 backdrop-blur-md">

          {/* Logo */}
          <div className="text-center mb-10">
            <img src="/images/larimarlogo.png" alt="Larimar City" className="h-10 mx-auto mb-6 brightness-0 invert" />
            <h1 className="font-playfair text-3xl text-white mb-2">Portal de Acceso</h1>
            <p className="text-white/50 text-sm uppercase tracking-widest">Canal Externo B2B</p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Usuario o Email</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input type="text" placeholder="tu@email.com" className="w-full bg-white/5 border border-white/10 focus:border-gold pl-10 pr-4 py-3 text-white outline-none transition-colors placeholder-white/20" />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input type={showPass ? "text" : "password"} placeholder="••••••••" className="w-full bg-white/5 border border-white/10 focus:border-gold pl-10 pr-10 py-3 text-white outline-none transition-colors" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" className="flex items-center justify-center gap-3 w-full py-4 bg-gold text-[#0a101f] hover:bg-white transition-colors uppercase tracking-widest text-xs font-bold">
              Acceder al Portal
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/10 text-center flex flex-col gap-4">
            <p className="text-white/40 text-xs">¿No tienes acceso todavía?</p>
            <Link href="/canal-externo" className="text-gold text-xs uppercase tracking-widest font-bold hover:text-white transition-colors">
              Solicitar Registro como Broker
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
