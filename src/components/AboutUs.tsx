"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { withBasePath } from "@/lib/paths";

export default function AboutUs() {
  return (
    <section id="nosotros" className="py-28 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/3 rounded-full blur-3xl -mr-48" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:w-1/2"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src={withBasePath("/images/carga-logistica.jpg")}
                alt="Operaciones de logística de frío"
                width={800}
                height={600}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />

              {/* Experience Badge */}
              <div className="absolute bottom-6 left-6 glass-card p-6 rounded-xl shadow-lg max-w-[200px]">
                <span className="block text-4xl font-black text-gradient">10+</span>
                <span className="text-sm text-slate-600 font-medium leading-tight">Años de experiencia en logística de frío</span>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-accent/40 rounded-tr-xl" />
            </div>
          </motion.div>

          <div className="lg:w-1/2">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="inline-block text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4 border border-secondary/20 px-4 py-2 rounded-full"
            >
              Sobre Nosotros
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold text-primary mt-4 mb-8"
            >
              Líderes en{" "}
              <span className="text-gradient">Transporte Refrigerado</span>
            </motion.h2>
            <div className="space-y-6 text-slate-500 text-lg leading-relaxed">
              <p>
                En <span className="font-bold text-primary">FAST COLD E.I.R.L.</span>, nos especializamos en brindar soluciones integrales de transporte para productos que requieren un control estricto de temperatura.
              </p>
              <p>
                Nuestra misión es garantizar que cada producto, ya sea fresco, congelado o farmacéutico, llegue a su destino manteniendo su integridad y calidad original. Utilizamos tecnología de vanguardia y procesos certificados para asegurar la excelencia en cada ruta.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 hover:border-accent/30 transition-all group">
                  <div className="w-12 h-1 bg-gradient-to-r from-secondary to-accent rounded-full mb-4 group-hover:w-16 transition-all" />
                  <h4 className="font-bold text-primary mb-2">Misión</h4>
                  <p className="text-sm text-slate-500">Ser el socio logístico más confiable en la cadena de frío del Perú.</p>
                </div>
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 hover:border-accent/30 transition-all group">
                  <div className="w-12 h-1 bg-gradient-to-r from-accent to-secondary rounded-full mb-4 group-hover:w-16 transition-all" />
                  <h4 className="font-bold text-primary mb-2">Visión</h4>
                  <p className="text-sm text-slate-500">Expandir nuestra red logística con innovación y sostenibilidad.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
