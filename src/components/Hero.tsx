"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, ArrowRight, MessageSquare } from "lucide-react";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} id="inicio" className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background Image with Parallax effect */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("images/camion-carretera.jpg")',
          filter: 'brightness(0.4)',
          y
        }}
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-primary/90 to-transparent" />

      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Transporte Refrigerado y <span className="text-accent">Congelado Seguro</span> en Lima y Provincias
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-8 font-light">
              Protegemos tu cadena de frío con logística especializada y control de temperatura de última generación.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <a
              href="#contacto"
              className="bg-secondary hover:bg-white hover:text-primary px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 group shadow-xl"
            >
              Cotizar Ahora <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://wa.me/51952310802"
              target="_blank"
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2"
            >
              <MessageSquare className="text-accent" /> WhatsApp Directo
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-wrap gap-6"
          >
            {[
              "Cadena de frío garantizada",
              "Unidades refrigeradas",
              "Monitoreo constante"
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 bg-primary/40 backdrop-blur-sm px-4 py-2 rounded-full border border-accent/30 text-sm md:text-base animate-pulse">
                <CheckCircle2 size={18} className="text-accent" />
                <span>{badge}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative Wave or Element */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}
