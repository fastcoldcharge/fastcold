"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-brand-dark">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent z-10" />
        <img
          src="/camion.jpeg"
          alt="Camión Refrigerado"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-brand-blue/20 text-brand-light text-sm font-bold mb-6 border border-brand-light/30 uppercase tracking-widest">
              Logística Especializada ❄️
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
              Transporte <span className="text-brand-light">Refrigerado</span> y Congelado Seguro
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
              Control de temperatura, puntualidad y logística especializada para tu carga en Lima y todas las provincias del Perú.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="#contacto"
                className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 group transition-all"
              >
                Solicitar Cotización
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/51952310802"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-5 h-5 text-green-400" />
                WhatsApp Directo
              </a>
            </div>

            <div className="flex flex-wrap gap-6">
              {[
                "Cadena de frío garantizada",
                "Monitoreo constante",
                "Cobertura nacional",
              ].map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-white/80">
                  <CheckCircle2 className="w-5 h-5 text-brand-light" />
                  <span className="text-sm font-medium">{badge}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-20" />
    </section>
  );
}
