"use client";

import { Mail, MapPin, Phone, Facebook, Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contacto" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Form */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
            <h3 className="text-3xl font-black text-brand-dark mb-2">Solicita una Cotización</h3>
            <p className="text-gray-500 mb-8">Déjanos tus datos y nos pondremos en contacto contigo a la brevedad.</p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Nombre Completo</label>
                  <input
                    type="text"
                    placeholder="Juan Pérez"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Empresa</label>
                  <input
                    type="text"
                    placeholder="Ej. Logística SAC"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Teléfono / WhatsApp</label>
                <input
                  type="tel"
                  placeholder="+51 9XX XXX XXX"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Mensaje</label>
                <textarea
                  placeholder="Describe tu requerimiento (Origen, destino, tipo de carga...)"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-blue/30 active:scale-95">
                Enviar Solicitud
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Right Column: Info & Map */}
          <div className="space-y-12">
            <div>
              <h3 className="text-3xl font-black text-brand-dark mb-8">Información de Contacto</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="text-brand-blue w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-brand-dark">Dirección</p>
                    <p className="text-gray-600">MZA. K LOTE. 19 A.H. NUEVA ALIANZA LIMA - LIMA - CHACLACAYO</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="text-brand-blue w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-brand-dark">Teléfono</p>
                    <p className="text-gray-600">+51 952 310 802</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="text-brand-blue w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-brand-dark">Correo Electrónico</p>
                    <p className="text-gray-600">fastcoldcharge@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center shrink-0">
                    <Facebook className="text-brand-blue w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-brand-dark">Facebook</p>
                    <p className="text-gray-600">Fast Cold Solutions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-80 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15609.43124564567!2d-76.77!3d-11.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105e94b2a6a1a1b%3A0x1a1a1a1a1a1a1a1a!2sChaclacayo!5e0!3m2!1ses!2spe!4v1620000000000!5m2!1ses!2spe"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
