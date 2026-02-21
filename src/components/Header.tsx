"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Snowflake, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const navLinks = [
    { name: "Inicio", href: "#" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Servicios", href: "#servicios" },
    { name: "Cobertura", href: "#cobertura" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-brand-blue p-2 rounded-lg group-hover:rotate-12 transition-transform">
            <Snowflake className="text-white w-6 h-6" />
          </div>
          <span
            className={cn(
              "text-xl font-bold tracking-tighter",
              isScrolled ? "text-brand-dark" : "text-white"
            )}
          >
            FAST <span className="text-brand-light">COLD</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium hover:text-brand-light transition-colors",
                isScrolled ? "text-brand-dark" : "text-white/90"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#contacto"
            className="bg-brand-blue hover:bg-brand-blue/90 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95"
          >
            Cotizar Ahora
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-brand-dark"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? "text-brand-dark" : "text-white"} />
          ) : (
            <Menu className={isScrolled ? "text-brand-dark" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-brand-dark font-medium border-b border-gray-100 pb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#contacto"
              className="bg-brand-blue text-white text-center py-3 rounded-lg font-bold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Solicitar Cotización
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
