"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mensaje enviado con éxito. Nos pondremos en contacto pronto.");
  };

  return (
    <section id="contacto" className="py-28 bg-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/3 rounded-full blur-3xl -mr-48" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <span className="inline-block text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4 border border-secondary/20 px-4 py-2 rounded-full">
              Contáctanos
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-primary mt-4 mb-8">
              ¿Listo para asegurar tu{" "}
              <span className="text-gradient">cadena de frío</span>?
            </h2>
            <p className="text-slate-500 text-lg mb-12 leading-relaxed">
              Solicita una cotización personalizada o resuelve tus dudas con nuestros especialistas. Estamos disponibles para atenderte.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: <MapPin size={22} />,
                  title: "Dirección",
                  detail: "MZA. K LOTE. 19 A.H. NUEVA ALIANZA\nLIMA - LIMA - CHACLACAYO",
                },
                {
                  icon: <Phone size={22} />,
                  title: "Teléfono",
                  detail: "+51 952 310 802",
                },
                {
                  icon: <Mail size={22} />,
                  title: "Correo",
                  detail: "fastcoldcharge@gmail.com",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="bg-gradient-to-br from-primary to-secondary p-3.5 rounded-xl text-white shadow-lg shadow-primary/15 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-sm">{item.title}</h4>
                    <p className="text-slate-500 text-sm whitespace-pre-line mt-1">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-slate-50/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100/80"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-primary tracking-wide uppercase">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition-all bg-white"
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-primary tracking-wide uppercase">Empresa</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition-all bg-white"
                    placeholder="Nombre de tu empresa"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-primary tracking-wide uppercase">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition-all bg-white"
                    placeholder="ejemplo@correo.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-primary tracking-wide uppercase">Teléfono</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition-all bg-white"
                    placeholder="+51 000 000 000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary tracking-wide uppercase">Servicio de Interés</label>
                <select className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition-all appearance-none bg-white">
                  <option>Transporte Refrigerado</option>
                  <option>Transporte Congelado</option>
                  <option>Distribución Local</option>
                  <option>Otro</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary tracking-wide uppercase">Mensaje / Requerimiento</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition-all bg-white resize-none"
                  placeholder="Cuéntanos más sobre lo que necesitas..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-primary/15 hover:shadow-xl"
              >
                Enviar Solicitud <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Google Map */}
        <div className="mt-24 rounded-3xl overflow-hidden h-[420px] shadow-2xl border-4 border-white ring-1 ring-slate-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15609.9142805214!2d-76.7725!3d-11.9688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105ea8600000001%3A0x0!2sChaclacayo%2C%20Lima!5e0!3m2!1ses!2spe!4v1645000000000!5m2!1ses!2spe"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
