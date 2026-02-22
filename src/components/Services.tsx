"use client";

import { motion } from "framer-motion";
import { Truck, ThermometerSnowflake, MapPin, Package, Settings, ShieldCheck } from "lucide-react";

const services = [
  {
    title: "Transporte Refrigerado",
    desc: "Mantenemos temperaturas precisas para productos frescos y farmacéuticos.",
    icon: <ThermometerSnowflake size={40} />,
  },
  {
    title: "Transporte Congelado",
    desc: "Equipos de alta potencia para mantener productos bajo cero en todo el trayecto.",
    icon: <Truck size={40} />,
  },
  {
    title: "Distribución Lima",
    desc: "Reparto capilar eficiente en todos los distritos de Lima Metropolitana y Callao.",
    icon: <MapPin size={40} />,
  },
  {
    title: "Rutas a Provincias",
    desc: "Conexión logística nacional garantizando la integridad de la carga.",
    icon: <Package size={40} />,
  },
  {
    title: "Logística Frigorífica",
    desc: "Gestión integral de inventarios y flujo de productos sensibles al calor.",
    icon: <Settings size={40} />,
  },
  {
    title: "Soporte Técnico Frío",
    desc: "Personal capacitado para el manejo y monitoreo de equipos de refrigeración.",
    icon: <ShieldCheck size={40} />,
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-secondary font-bold tracking-widest uppercase text-sm"
          >
            Nuestras Soluciones
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-primary mt-4"
          >
            Servicios Logísticos Especializados
          </motion.h2>
          <div className="w-24 h-1 bg-accent mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-accent transition-all duration-300 card-3d-hover glow-hover relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-accent/5 rounded-full group-hover:scale-150 transition-transform duration-500" />

              <div className="text-secondary mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
