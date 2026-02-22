"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert("Mensaje enviado con éxito. Nos pondremos en contacto pronto.");
  };

  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <span className="text-secondary font-bold tracking-widest uppercase text-sm">Contáctanos</span>
            <h2 className="text-3xl md:text-5xl font-bold text-primary mt-4 mb-8">
              ¿Listo para asegurar tu cadena de frío?
            </h2>
            <p className="text-slate-600 text-lg mb-12">
              Solicita una cotización personalizada o resuelve tus dudas con nuestros especialistas. Estamos disponibles para atenderte.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary p-4 rounded-xl text-white">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-primary">Dirección</h4>
                  <p className="text-slate-600">MZA. K LOTE. 19 A.H. NUEVA ALIANZA<br />LIMA - LIMA - CHACLACAYO</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary p-4 rounded-xl text-white">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-primary">Teléfono</h4>
                  <p className="text-slate-600">+51 952 310 802</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary p-4 rounded-xl text-white">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-primary">Correo</h4>
                  <p className="text-slate-600">fastcoldcharge@gmail.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-slate-50 p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary">Empresa</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                    placeholder="Nombre de tu empresa"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                    placeholder="ejemplo@correo.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary">Teléfono</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                    placeholder="+51 000 000 000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-primary">Servicio de Interés</label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all appearance-none bg-white">
                  <option>Transporte Refrigerado</option>
                  <option>Transporte Congelado</option>
                  <option>Distribución Local</option>
                  <option>Otro</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-primary">Mensaje / Requerimiento</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                  placeholder="Cuéntanos más sobre lo que necesitas..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-secondary text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg"
              >
                Enviar Solicitud <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Google Map */}
        <div className="mt-24 rounded-3xl overflow-hidden h-[450px] shadow-2xl border-8 border-white">
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
