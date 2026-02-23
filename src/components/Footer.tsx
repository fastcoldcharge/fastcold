import Link from "next/link";
import { Facebook, Mail, MapPin, Phone, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-20 pb-10 relative overflow-hidden">
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />

      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/3 rounded-full blur-3xl -mr-40" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div>
            <div className="inline-block mb-6">
              <span className="text-2xl font-black tracking-tighter">FAST<span className="text-accent">COLD</span></span>
            </div>
            <p className="text-slate-400 mb-8 leading-relaxed text-sm">
              Especialistas en la logística de cadena de frío más avanzada del Perú. Seguridad, tecnología y puntualidad en cada entrega.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Facebook size={18} />, href: "https://facebook.com/FastColdSolutions" },
                { icon: <Instagram size={18} />, href: "#" },
                { icon: <Linkedin size={18} />, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  className="bg-white/5 border border-white/10 p-2.5 rounded-xl hover:bg-accent/20 hover:border-accent/30 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-8 relative">
              Enlaces
              <span className="absolute bottom-[-8px] left-0 w-10 h-0.5 bg-gradient-to-r from-secondary to-accent rounded-full" />
            </h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              {["Inicio", "Servicios", "Flota", "Cobertura", "Nosotros", "Contacto"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-accent transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-accent transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-8 relative">
              Servicios
              <span className="absolute bottom-[-8px] left-0 w-10 h-0.5 bg-gradient-to-r from-secondary to-accent rounded-full" />
            </h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              {[
                "Transporte Refrigerado",
                "Transporte Congelado",
                "Distribución Local Lima",
                "Transporte a Provincias",
                "Logística Inversa Fría"
              ].map((service, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-accent/50 rounded-full" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-8 relative">
              Contacto
              <span className="absolute bottom-[-8px] left-0 w-10 h-0.5 bg-gradient-to-r from-secondary to-accent rounded-full" />
            </h4>
            <ul className="space-y-5">
              {[
                { icon: <MapPin className="text-accent shrink-0" size={16} />, text: "MZA. K LOTE. 19 A.H. NUEVA ALIANZA, Chaclacayo, Lima" },
                { icon: <Phone className="text-accent shrink-0" size={16} />, text: "+51 952 310 802" },
                { icon: <Mail className="text-accent shrink-0" size={16} />, text: "fastcoldcharge@gmail.com" },
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start text-slate-400 text-sm">
                  {item.icon}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="section-divider mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} FAST COLD E.I.R.L. Todos los derechos reservados.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-accent transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-accent transition-colors">Términos y Condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
