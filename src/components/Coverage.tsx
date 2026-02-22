"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function Coverage() {
  return (
    <section id="cobertura" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-secondary font-bold tracking-widest uppercase text-sm"
            >
              Presencia Nacional
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold text-primary mt-4 mb-6"
            >
              Cobertura en Lima y todo el Perú
            </motion.h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Desde nuestra base estratégica en Lima, conectamos con las principales regiones del país, asegurando que tu mercancía llegue a su destino con la temperatura perfecta.
            </p>

            <div className="space-y-4">
              {[
                "Lima Metropolitana y Callao (Distribución Diaria)",
                "Norte: Trujillo, Chiclayo, Piura, Tumbes",
                "Sur: Ica, Arequipa, Moquegua, Tacna",
                "Centro: Huancayo, Huánuco, Pasco"
              ].map((region, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-primary font-semibold"
                >
                  <div className="bg-accent/20 p-2 rounded-full">
                    <MapPin size={18} className="text-secondary" />
                  </div>
                  {region}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              {/* Stylized Peru Map Shape (Simplified) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-primary/5 rounded-full border-4 border-dashed border-accent/20 animate-spin-slow"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="relative w-64 h-80 bg-slate-200 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                    {/* Placeholder for actual Map Image or SVG */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-300 flex items-center justify-center">
                       <MapPin size={60} className="text-secondary animate-bounce" />
                       <span className="absolute bottom-10 font-bold text-primary">MAPA PERÚ</span>
                    </div>
                    {/* Animated Lines starting from Lima (center-left-ish) */}
                    <motion.div
                      className="absolute top-1/2 left-1/3 w-2 h-2 bg-secondary rounded-full shadow-[0_0_10px_#266bd9]"
                    />
                    {[
                      { t: "20%", l: "60%" },
                      { t: "80%", l: "50%" },
                      { t: "40%", l: "80%" }
                    ].map((pos, i) => (
                      <motion.div
                        key={i}
                        initial={{ width: 0 }}
                        whileInView={{ width: "100px" }}
                        className="absolute bg-accent/40 h-[2px] origin-left"
                        style={{
                          top: "50%",
                          left: "33%",
                          rotate: `${i * 120 - 60}deg`,
                          transformOrigin: "left center"
                        }}
                      />
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
