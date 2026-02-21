import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import SpeedDial from "@/components/SpeedDial";
import AIAssistant from "@/components/AIAssistant";
import Contact from "@/components/Contact";
import { Truck, Snowflake, ShieldCheck, Clock, Award, Globe } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />

      {/* About Section */}
      <section id="nosotros" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-light/10 rounded-full blur-3xl" />
              <img
                src="/camion1.jpeg"
                alt="Logística"
                className="rounded-3xl shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-6 -right-6 bg-brand-blue p-8 rounded-2xl shadow-xl z-20 hidden md:block">
                <p className="text-white text-4xl font-black italic">+10</p>
                <p className="text-brand-light font-bold text-sm uppercase tracking-wider">Años de Experiencia</p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-brand-blue font-bold tracking-widest uppercase text-sm mb-3">Sobre Nosotros</h2>
              <h3 className="text-4xl md:text-5xl font-black text-brand-dark mb-6">Expertos en Logística de Frío Industrial</h3>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                En <strong>FAST COLD E.I.R.L.</strong>, nos dedicamos a garantizar la integridad de sus productos a través de una cadena de frío ininterrumpida. Contamos con una flota moderna y personal altamente capacitado para el transporte seguro de carga refrigerada y congelada.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-brand-blue/10 rounded-lg flex items-center justify-center shrink-0">
                    <ShieldCheck className="text-brand-blue w-6 h-6" />
                  </div>
                  <p className="font-bold text-brand-dark">Seguridad Certificada</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-brand-blue/10 rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="text-brand-blue w-6 h-6" />
                  </div>
                  <p className="font-bold text-brand-dark">Puntualidad Exacta</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Services />

      {/* Coverage Section */}
      <section id="cobertura" className="py-24 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-brand-light font-bold tracking-widest uppercase text-sm mb-3">Cobertura Nacional</h2>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-6">Llegamos a todo el Perú</h3>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Nuestra base operativa en Lima nos permite coordinar despachos eficientes hacia el norte, centro y sur del país, manteniendo siempre el estándar de calidad que su carga requiere.
              </p>
              <ul className="space-y-4">
                {["Lima Metropolitana y Callao", "Rutas al Norte (Piura, Chiclayo, Trujillo)", "Rutas al Sur (Ica, Arequipa, Cusco)", "Rutas al Centro (Huancayo, Huánuco)"].map((city) => (
                  <li key={city} className="flex items-center gap-3 text-white">
                    <div className="w-2 h-2 bg-brand-light rounded-full" />
                    {city}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-3xl">
              <div className="bg-brand-blue/20 p-8 rounded-2xl text-center">
                <Globe className="w-20 h-20 text-brand-light mx-auto mb-6 animate-pulse" />
                <p className="text-white font-bold text-2xl mb-2">Logística Sin Fronteras</p>
                <p className="text-gray-400 text-sm">Monitoreo GPS en tiempo real en todas nuestras unidades.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-brand-blue font-bold tracking-widest uppercase text-sm mb-3">Beneficios</h2>
          <h3 className="text-4xl md:text-5xl font-black text-brand-dark mb-16">¿Por qué elegir FAST COLD?</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Garantía de Frío", desc: "Sistemas de refrigeración redundantes para evitar cualquier pérdida.", icon: Snowflake },
              { title: "Flota Moderna", desc: "Unidades equipadas con la última tecnología en aislamiento térmico.", icon: Truck },
              { title: "Atención 24/7", desc: "Soporte y seguimiento constante para sus envíos urgentes.", icon: Award },
            ].map((benefit) => (
              <div key={benefit.title} className="group">
                <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-blue group-hover:rotate-12 transition-all duration-300">
                  <benefit.icon className="w-10 h-10 text-brand-blue group-hover:text-white" />
                </div>
                <h4 className="text-xl font-bold text-brand-dark mb-4">{benefit.title}</h4>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-brand-blue font-bold tracking-widest uppercase text-sm mb-3">Logística de Vanguardia</h2>
              <h3 className="text-4xl font-black text-brand-dark">Nuestras Unidades</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["camion.jpeg", "camion1.jpeg", "camion2.jpeg", "camion3.jpeg"].map((img, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl h-64 shadow-lg perspective-1000">
                <img
                  src={`/${img}`}
                  alt={`Camion ${i}`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-brand-blue/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-brand-blue font-bold tracking-widest uppercase text-sm mb-3 text-center">Testimonios</h2>
          <h3 className="text-4xl font-black text-brand-dark mb-16 text-center">Clientes Satisfechos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: "Alimentos del Perú", text: "Excelente servicio, la puntualidad y el estado de la carga siempre son óptimos." },
              { name: "Distribuidora San José", text: "El soporte técnico y el monitoreo constante nos dan mucha tranquilidad." }
            ].map((t) => (
              <div key={t.name} className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                <p className="text-gray-600 italic mb-6">"{t.text}"</p>
                <p className="font-bold text-brand-dark">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />

      {/* Footer */}
      <footer className="bg-brand-dark py-12 border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} FAST COLD E.I.R.L. - Todos los derechos reservados.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Diseñado para la excelencia en logística de frío.
          </p>
        </div>
      </footer>

      <SpeedDial />
      <AIAssistant />
    </main>
  );
}
