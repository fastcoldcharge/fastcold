"use client";

import { motion } from "framer-motion";
import { Truck, ThermometerSnowflake, MapPin, Package, Settings, ShieldCheck } from "lucide-react";

const services = [
  {
    title: "Transporte Refrigerado",
    desc: "Mantenemos temperaturas precisas para productos frescos y farmacéuticos.",
    icon: <ThermometerSnowflake size={36} />,
    gradient: "from-blue-500/15 to-cyan-500/15",
  },
  {
    title: "Transporte Congelado",
    desc: "Equipos de alta potencia para mantener productos bajo cero en todo el trayecto.",
    icon: <Truck size={36} />,
    gradient: "from-indigo-500/15 to-blue-500/15",
  },
  {
    title: "Distribución Lima",
    desc: "Reparto capilar eficiente en todos los distritos de Lima Metropolitana y Callao.",
    icon: <MapPin size={36} />,
    gradient: "from-cyan-500/15 to-teal-500/15",
  },
  {
    title: "Rutas a Provincias",
    desc: "Conexión logística nacional garantizando la integridad de la carga.",
    icon: <Package size={36} />,
    gradient: "from-violet-500/15 to-indigo-500/15",
  },
  {
    title: "Logística Frigorífica",
    desc: "Gestión integral de inventarios y flujo de productos sensibles al calor.",
    icon: <Settings size={36} />,
    gradient: "from-blue-500/15 to-violet-500/15",
  },
  {
    title: "Soporte Técnico Frío",
    desc: "Personal capacitado para el manejo y monitoreo de equipos de refrigeración.",
    icon: <ShieldCheck size={36} />,
    gradient: "from-teal-500/15 to-cyan-500/15",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-28 bg-slate-50/70 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4 border border-secondary/20 px-4 py-2 rounded-full"
          >
            Nuestras Soluciones
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-primary mt-4"
          >
            Servicios Logísticos{" "}
            <span className="text-gradient">Especializados</span>
          </motion.h2>
          <div className="w-20 h-1 bg-gradient-to-r from-secondary to-accent mx-auto mt-8 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              viewport={{ once: true }}
              className="group bg-white p-8 rounded-2xl border border-slate-100/80 hover:border-accent/30 transition-all duration-500 card-3d-hover glow-hover relative overflow-hidden"
            >
              {/* Decorative Background Gradient */}
              <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${service.gradient} rounded-full group-hover:scale-[2.5] transition-transform duration-700 blur-sm`} />

              <div className="relative z-10">
                <div className="text-secondary mb-6 p-3 inline-flex rounded-xl bg-gradient-to-br from-secondary/10 to-accent/10 border border-secondary/10 group-hover:scale-110 group-hover:border-accent/30 transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed text-[15px]">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
