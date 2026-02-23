"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, ArrowRight, MessageSquare } from "lucide-react";
import { useRef } from "react";
import { withBasePath } from "@/lib/paths";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} id="inicio" className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${withBasePath('/images/camion-almacen.jpg')}")`,
          filter: 'brightness(0.3) saturate(1.2)',
          y
        }}
      />

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 z-1 bg-gradient-to-br from-primary/95 via-primary/70 to-transparent" />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/8 rounded-full blur-3xl" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 z-2 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-block text-accent font-bold tracking-[0.2em] uppercase text-xs mb-6 border border-accent/30 px-4 py-2 rounded-full backdrop-blur-sm bg-accent/5"
            >
              ❄️ Transporte Refrigerado Profesional
            </motion.span>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6 tracking-tight">
              Transporte Refrigerado y{" "}
              <span className="text-gradient-accent">Congelado Seguro</span>{" "}
              en Lima y Provincias
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 font-light leading-relaxed max-w-2xl">
              Protegemos tu cadena de frío con logística especializada y control de temperatura de última generación.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-14"
          >
            <a
              href="#contacto"
              className="bg-gradient-to-r from-secondary to-accent hover:from-accent hover:to-secondary px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 group shadow-xl shadow-secondary/25 hover:shadow-accent/25"
            >
              Cotizar Ahora <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://wa.me/51952310802"
              target="_blank"
              className="glass px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 hover:bg-white/15"
            >
              <MessageSquare className="text-accent" /> WhatsApp Directo
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            {[
              "Cadena de frío garantizada",
              "Unidades refrigeradas",
              "Monitoreo constante"
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 glass px-4 py-2.5 rounded-full text-sm">
                <CheckCircle2 size={16} className="text-accent" />
                <span className="text-slate-200">{badge}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}
