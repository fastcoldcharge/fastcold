"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { withBasePath } from "@/lib/paths";
import { Snowflake, Gauge, ThermometerSnowflake } from "lucide-react";

const fleetItems = [
  {
    src: withBasePath("/images/carga-logistica.jpg"),
    title: "Unidad Refrigerada Premium",
    subtitle: "Control digital de temperatura",
    icon: <ThermometerSnowflake size={18} />,
  },
  {
    src: withBasePath("/images/camion-almacen.jpg"),
    title: "Transporte Congelado",
    subtitle: "Equipos de alta potencia",
    icon: <Snowflake size={18} />,
  },
  {
    src: withBasePath("/images/carga-logistica.jpg"),
    title: "Distribución Express",
    subtitle: "Entregas rápidas y seguras",
    icon: <Gauge size={18} />,
  },
];

export default function Fleet() {
  return (
    <section id="flota" className="py-28 bg-gradient-to-b from-white via-slate-50/50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4 border border-secondary/20 px-4 py-2 rounded-full"
          >
            Tecnología en Movimiento
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-primary mt-4"
          >
            Flota Premium con{" "}
            <span className="text-gradient">Control Térmico</span>
          </motion.h2>
          <p className="text-slate-500 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
            Contamos con unidades modernas equipadas con sistemas de refrigeración industrial Thermo King y monitoreo GPS en tiempo real.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-secondary to-accent mx-auto mt-8 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
          {fleetItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              viewport={{ once: true }}
              className="group relative h-[440px] overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 card-3d-hover"
            >
              <Image
                src={item.src}
                alt={`Camión refrigerado FAST COLD ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Permanent subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-transparent" />

              {/* Enhanced hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-accent/20 backdrop-blur-sm p-2 rounded-lg text-accent border border-accent/20">
                      {item.icon}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                  <p className="text-accent/80 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{item.subtitle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
