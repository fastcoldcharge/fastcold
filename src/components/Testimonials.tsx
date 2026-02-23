"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Rodríguez",
    role: "Gerente de Logística - AgroExport",
    content: "FAST COLD ha sido clave para nuestra exportación de arándanos. Su puntualidad y control de temperatura son impecables.",
    stars: 5,
  },
  {
    name: "Elena Martínez",
    role: "Directora de Operaciones - Distribuidora Del Mar",
    content: "Excelente servicio de transporte congelado. Sus unidades siempre están en óptimas condiciones y el personal es muy profesional.",
    stars: 5,
  },
  {
    name: "Jorge Huamán",
    role: "Jefe de Compras - Cadena Market",
    content: "La mejor opción para distribución local en Lima. Entienden la urgencia de los productos frescos.",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-28 bg-slate-50/70 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-accent/3 rounded-full blur-3xl -ml-40" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4 border border-secondary/20 px-4 py-2 rounded-full"
          >
            Testimonios
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-primary mt-4"
          >
            Lo que dicen nuestros{" "}
            <span className="text-gradient">clientes</span>
          </motion.h2>
          <div className="w-20 h-1 bg-gradient-to-r from-secondary to-accent mx-auto mt-8 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white p-8 rounded-2xl border border-slate-100 relative group hover:border-accent/20 hover:shadow-xl transition-all duration-500"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8 bg-gradient-to-r from-secondary to-accent p-3 rounded-xl text-white shadow-lg shadow-secondary/20">
                <Quote size={20} />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6 mt-4">
                {[...Array(t.stars)].map((_, j) => (
                  <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-slate-500 italic mb-8 leading-relaxed text-[15px]">
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Author */}
              <div className="border-t border-slate-100 pt-6">
                <h4 className="font-bold text-primary">{t.name}</h4>
                <p className="text-xs text-slate-400 mt-1">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
