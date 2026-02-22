"use client";

import { useState, useEffect } from "react";
import { Phone, Mail, Menu, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const TopBar = () => (
  <div className="bg-primary text-white py-2 px-4 text-sm hidden md:block">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <span className="text-accent">❄️</span> Especialistas en Cadena de Frío en Lima y Provincias
        </span>
      </div>
      <div className="flex items-center gap-6">
        <a href="tel:+51952310802" className="flex items-center gap-1 hover:text-accent transition-colors">
          <Phone size={14} /> +51 952 310 802
        </a>
        <a href="mailto:fastcoldcharge@gmail.com" className="flex items-center gap-1 hover:text-accent transition-colors">
          <Mail size={14} /> fastcoldcharge@gmail.com
        </a>
      </div>
    </div>
  </div>
);

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Inicio", href: "#inicio" },
    { name: "Servicios", href: "#servicios" },
    { name: "Flota", href: "#flota" },
    { name: "Cobertura", href: "#cobertura" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <>
      <TopBar />
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg py-2 top-0" : "bg-transparent py-4 md:top-10"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <span className="text-white font-bold text-xl tracking-tighter">FAST<span className="text-accent">COLD</span></span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors hover:text-secondary ${
                  isScrolled ? "text-primary" : "text-primary md:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="#contacto"
              className="bg-secondary text-white px-6 py-2 rounded-full font-bold hover:bg-primary transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              Solicitar Cotización <ChevronRight size={18} />
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} className={isScrolled ? "text-primary" : "text-white"} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t"
            >
              <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-primary font-medium text-lg border-b pb-2"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="#contacto"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-secondary text-white px-6 py-3 rounded-xl font-bold text-center mt-2"
                >
                  Solicitar Cotización
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
