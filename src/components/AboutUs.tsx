"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { withBasePath } from "@/lib/paths";

export default function AboutUs() {
  return (
    <section id="nosotros" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:w-1/2"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={withBasePath("/images/carga-logistica.jpg")}
                alt="Logística de frío"
                width={800}
                height={600}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/20" />
              <div className="absolute bottom-6 left-6 bg-white p-6 rounded-xl shadow-lg max-w-[200px]">
                <span className="block text-4xl font-bold text-secondary">10+</span>
                <span className="text-sm text-slate-600 font-medium">Años de experiencia en logística de frío</span>
              </div>
            </div>
          </motion.div>

          <div className="lg:w-1/2">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-secondary font-bold tracking-widest uppercase text-sm"
            >
              Sobre Nosotros
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold text-primary mt-4 mb-8"
            >
              Líderes en el Transporte de Carga Refrigerada
            </motion.h2>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                En <span className="font-bold text-primary">FAST COLD E.I.R.L.</span>, nos especializamos en brindar soluciones integrales de transporte para productos que requieren un control estricto de temperatura.
              </p>
              <p>
                Nuestra misión es garantizar que cada producto, ya sea fresco, congelado o farmacéutico, llegue a su destino manteniendo su integridad y calidad original. Utilizamos tecnología de vanguardia y procesos certificados para asegurar la excelencia en cada ruta.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="border-l-4 border-accent pl-4">
                  <h4 className="font-bold text-primary">Misión</h4>
                  <p className="text-sm">Ser el socio logístico más confiable en la cadena de frío del Perú.</p>
                </div>
                <div className="border-l-4 border-accent pl-4">
                  <h4 className="font-bold text-primary">Visión</h4>
                  <p className="text-sm">Expandir nuestra red logística con innovación y sostenibilidad.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
