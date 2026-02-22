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
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-primary"
          >
            Lo que dicen nuestros clientes
          </motion.h2>
          <div className="w-24 h-1 bg-accent mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative group hover:shadow-xl transition-shadow"
            >
              <div className="absolute -top-4 left-8 bg-secondary p-3 rounded-xl text-white shadow-lg">
                <Quote size={24} />
              </div>
              <div className="flex gap-1 mb-6 mt-4">
                {[...Array(t.stars)].map((_, j) => (
                  <Star key={j} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-600 italic mb-8 leading-relaxed">
                "{t.content}"
              </p>
              <div>
                <h4 className="font-bold text-primary">{t.name}</h4>
                <p className="text-sm text-slate-500">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
