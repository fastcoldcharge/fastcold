"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fleetImages = [
  "/images/carga-logistica.jpg",
  "/images/camion-almacen.jpg",
  "/images/fast-cold-warehouse.jpg",
];

export default function Fleet() {
  return (
    <section id="flota" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-secondary font-bold tracking-widest uppercase text-sm"
            >
              Tecnología en Movimiento
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold text-primary mt-4"
            >
              Flota Premium con Control Térmico
            </motion.h2>
            <p className="text-slate-600 mt-6 text-lg">
              Contamos con unidades modernas equipadas con sistemas de refrigeración industrial Thermo King y monitoreo GPS en tiempo real.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-primary px-6 py-3 rounded-lg text-white font-bold"
          >
            +20 Unidades Disponibles
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-1000">
          {fleetImages.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative h-[420px] overflow-hidden rounded-2xl shadow-xl shadow-soft card-3d-hover"
            >
              <Image
                src={src}
                alt={`Camión refrigerado FAST COLD ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <div className="text-white">
                  <h4 className="text-xl font-bold">Unidad Refrigerada Clase A</h4>
                  <p className="text-accent text-sm">Control de temperatura digital</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
