"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

const regions = [
  { name: "Lima Metropolitana y Callao", detail: "Distribución Diaria" },
  { name: "Norte: Trujillo, Chiclayo, Piura, Tumbes", detail: "Rutas Semanales" },
  { name: "Sur: Ica, Arequipa, Moquegua, Tacna", detail: "Rutas Semanales" },
  { name: "Centro: Huancayo, Huánuco, Pasco", detail: "Rutas Programadas" },
];

export default function Coverage() {
  return (
    <section id="cobertura" className="py-28 bg-slate-50/70 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="inline-block text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4 border border-secondary/20 px-4 py-2 rounded-full"
            >
              Presencia Nacional
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold text-primary mt-4 mb-6"
            >
              Cobertura en Lima y{" "}
              <span className="text-gradient">todo el Perú</span>
            </motion.h2>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed">
              Desde nuestra base estratégica en Lima, conectamos con las principales regiones del país, asegurando que tu mercancía llegue a su destino con la temperatura perfecta.
            </p>

            <div className="space-y-4">
              {regions.map((region, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100 hover:border-accent/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="bg-gradient-to-br from-secondary/10 to-accent/10 p-3 rounded-xl border border-secondary/10 group-hover:border-accent/30 transition-colors">
                    <MapPin size={18} className="text-secondary" />
                  </div>
                  <div>
                    <span className="text-primary font-semibold text-sm">{region.name}</span>
                    <span className="block text-xs text-accent font-medium">{region.detail}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative w-full aspect-square max-w-[480px] mx-auto">
              {/* Outer rotating ring */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-accent/15 animate-spin-slow"
              />

              {/* Inner ring */}
              <div className="absolute inset-8 rounded-full border border-secondary/10" />

              {/* Map container */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-80 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="relative">
                      <Navigation size={48} className="text-secondary" />
                      <div className="absolute inset-0 animate-ping">
                        <Navigation size={48} className="text-secondary/20" />
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="block font-bold text-primary text-lg">PERÚ</span>
                      <span className="block text-xs text-slate-500 mt-1">Cobertura Nacional</span>
                    </div>
                  </div>

                  {/* Animated connection dots */}
                  <motion.div
                    className="absolute top-1/2 left-1/3 w-3 h-3 bg-secondary rounded-full shadow-[0_0_12px_#1e6fd9]"
                  />
                  {[
                    { t: "25%", l: "65%", delay: 0 },
                    { t: "75%", l: "55%", delay: 0.3 },
                    { t: "35%", l: "75%", delay: 0.6 },
                    { t: "55%", l: "30%", delay: 0.9 },
                  ].map((pos, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 + pos.delay }}
                      className="absolute w-2 h-2 bg-accent rounded-full shadow-[0_0_8px_#38d9e8]"
                      style={{ top: pos.t, left: pos.l }}
                    />
                  ))}

                  {/* Connection lines */}
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={`line-${i}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: "80px" }}
                      transition={{ delay: 0.8 + i * 0.2 }}
                      className="absolute bg-gradient-to-r from-secondary/40 to-accent/40 h-[1.5px] origin-left"
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

              {/* Floating labels */}
              {[
                { label: "Lima", t: "45%", l: "5%", delay: 1 },
                { label: "Norte", t: "15%", l: "70%", delay: 1.2 },
                { label: "Sur", t: "80%", l: "65%", delay: 1.4 },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: item.delay }}
                  className="absolute bg-white px-3 py-1.5 rounded-lg shadow-md text-xs font-bold text-primary border border-slate-100"
                  style={{ top: item.t, left: item.l }}
                >
                  {item.label}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
