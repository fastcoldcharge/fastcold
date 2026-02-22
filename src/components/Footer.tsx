import Link from "next/link";
import { Facebook, Mail, MapPin, Phone, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div>
            <div className="bg-white p-2 rounded-lg inline-block mb-6">
              <span className="text-primary font-bold text-2xl tracking-tighter">FAST<span className="text-secondary">COLD</span></span>
            </div>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Especialistas en la logística de cadena de frío más avanzada del Perú. Seguridad, tecnología y puntualidad en cada entrega.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/FastColdSolutions" target="_blank" className="bg-white/10 p-3 rounded-full hover:bg-secondary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-secondary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-secondary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-8 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-secondary">Enlaces</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link href="#inicio" className="hover:text-white transition-colors">Inicio</Link></li>
              <li><Link href="#servicios" className="hover:text-white transition-colors">Servicios</Link></li>
              <li><Link href="#flota" className="hover:text-white transition-colors">Flota</Link></li>
              <li><Link href="#cobertura" className="hover:text-white transition-colors">Cobertura</Link></li>
              <li><Link href="#nosotros" className="hover:text-white transition-colors">Nosotros</Link></li>
              <li><Link href="#contacto" className="hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-8 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-secondary">Servicios</h4>
            <ul className="space-y-4 text-slate-400">
              <li>Transporte Refrigerado</li>
              <li>Transporte Congelado</li>
              <li>Distribución Local Lima</li>
              <li>Transporte a Provincias</li>
              <li>Logística Inversa Fría</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-8 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-secondary">Contacto</h4>
            <ul className="space-y-6">
              <li className="flex gap-3 items-start text-slate-400">
                <MapPin className="text-secondary shrink-0" size={20} />
                <span>MZA. K LOTE. 19 A.H. NUEVA ALIANZA, Chaclacayo, Lima</span>
              </li>
              <li className="flex gap-3 items-center text-slate-400">
                <Phone className="text-secondary shrink-0" size={20} />
                <span>+51 952 310 802</span>
              </li>
              <li className="flex gap-3 items-center text-slate-400">
                <Mail className="text-secondary shrink-0" size={20} />
                <span>fastcoldcharge@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} FAST COLD E.I.R.L. Todos los derechos reservados.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
