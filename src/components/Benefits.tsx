"use client";

import { motion } from "framer-motion";
import { Thermometer, Clock, Shield, Users } from "lucide-react";

const benefits = [
  {
    title: "Control de temperatura",
    desc: "Mantenimiento riguroso de la cadena de frío en cada etapa del transporte.",
    icon: <Thermometer className="text-accent" size={28} />,
    number: "01",
  },
  {
    title: "Puntualidad",
    desc: "Entregas programadas con cumplimiento del 100% y trazabilidad total.",
    icon: <Clock className="text-accent" size={28} />,
    number: "02",
  },
  {
    title: "Seguridad logística",
    desc: "Carga asegurada y monitoreada 24/7 con tecnología GPS avanzada.",
    icon: <Shield className="text-accent" size={28} />,
    number: "03",
  },
  {
    title: "Personal especializado",
    desc: "Conductores expertos certificados en manejo de carga refrigerada.",
    icon: <Users className="text-accent" size={28} />,
    number: "04",
  },
];

export default function Benefits() {
  return (
    <section className="py-24 bg-gradient-animated text-white overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full -mr-40 -mt-40 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full -ml-40 -mb-40 blur-3xl" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block text-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 border border-accent/20 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            ¿Por qué elegirnos?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold mt-4"
          >
            Ventajas <span className="text-gradient-accent">Competitivas</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-6 p-5 rounded-2xl glass group-hover:bg-accent/15 group-hover:border-accent/30 transition-all duration-500 relative">
                <span className="absolute -top-2 -right-2 text-[10px] font-bold text-accent/50 tracking-widest">{benefit.number}</span>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-slate-300/80 text-sm leading-relaxed">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
