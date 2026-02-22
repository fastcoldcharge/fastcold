"use client";

import { motion } from "framer-motion";
import { Thermometer, Clock, Shield, Users } from "lucide-react";

const benefits = [
  {
    title: "Control de temperatura",
    desc: "Mantenimiento riguroso de la cadena de frío.",
    icon: <Thermometer className="text-accent" size={32} />,
  },
  {
    title: "Puntualidad",
    desc: "Entregas programadas con cumplimiento del 100%.",
    icon: <Clock className="text-accent" size={32} />,
  },
  {
    title: "Seguridad logística",
    desc: "Carga asegurada y monitoreada 24/7.",
    icon: <Shield className="text-accent" size={32} />,
  },
  {
    title: "Personal especializado",
    desc: "Conductores expertos en manejo de frío.",
    icon: <Users className="text-accent" size={32} />,
  },
];

export default function Benefits() {
  return (
    <section className="py-20 bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -mr-32 -mt-32 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full -ml-32 -mb-32 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-accent/20 group-hover:border-accent/50 transition-all duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
