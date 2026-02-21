"use client";

import { motion } from "framer-motion";
import {
  ThermometerSnowflake,
  IceCream,
  MapPin,
  Truck,
  Settings2,
  ShieldCheck
} from "lucide-react";

const services = [
  {
    title: "Transporte Refrigerado",
    desc: "Mantenemos tus productos frescos entre 0°C y 15°C con equipos de última generación.",
    icon: ThermometerSnowflake,
  },
  {
    title: "Transporte Congelado",
    desc: "Control riguroso para cargas que requieren hasta -20°C, ideal para cárnicos y helados.",
    icon: IceCream,
  },
  {
    title: "Distribución Local Lima",
    desc: "Entregas capilares en todo Lima Metropolitana con puntualidad garantizada.",
    icon: MapPin,
  },
  {
    title: "Rutas a Provincias",
    desc: "Conectamos Lima con las principales ciudades del Perú bajo estándares de seguridad.",
    icon: Truck,
  },
  {
    title: "Logística Industrial Fría",
    desc: "Gestión integral de la cadena de suministro para grandes industrias alimentarias.",
    icon: Settings2,
  },
  {
    title: "Soporte Técnico en Frío",
    desc: "Monitoreo y asistencia técnica para asegurar la integridad de tu mercancía.",
    icon: ShieldCheck,
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-blue font-bold tracking-widest uppercase text-sm mb-3">
            Nuestra Especialidad
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-brand-dark mb-6">
            Logística Inteligente en Cadena de Frío
          </h3>
          <p className="text-gray-600 text-lg">
            Ofrecemos soluciones personalizadas para el transporte de mercancías que requieren un control térmico estricto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-brand-blue/10 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-light/5 rounded-bl-full group-hover:bg-brand-blue/10 transition-colors" />

              <div className="w-14 h-14 bg-white rounded-xl shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="w-8 h-8 text-brand-blue" />
              </div>

              <h4 className="text-xl font-bold text-brand-dark mb-4 group-hover:text-brand-blue transition-colors">
                {service.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
