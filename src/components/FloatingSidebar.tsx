"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Facebook, MessageCircle, Car } from "lucide-react";

const links = [
  {
    icon: <MapPin size={24} />,
    href: "https://www.google.com/maps/search/?api=1&query=MZA.+K+LOTE.+19+A.H.+NUEVA+ALIANZA+CHACLACAYO",
    color: "bg-red-500",
    label: "Ubicación",
  },
  {
    icon: <Mail size={24} />,
    href: "mailto:fastcoldcharge@gmail.com",
    color: "bg-blue-600",
    label: "Correo",
  },
  {
    icon: <Facebook size={24} />,
    href: "https://facebook.com/FastColdSolutions",
    color: "bg-blue-800",
    label: "Facebook",
  },
  {
    icon: <MessageCircle size={24} />,
    href: "https://wa.me/51952310802",
    color: "bg-green-500",
    label: "WhatsApp",
  },
  {
    icon: <Car size={24} />,
    href: "https://waze.com/ul?q=MZA.+K+LOTE.+19+A.H.+NUEVA+ALIANZA+CHACLACAYO",
    color: "bg-blue-400",
    label: "Waze",
  },
];

export default function FloatingSidebar() {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-4">
      {links.map((link, i) => (
        <motion.a
          key={i}
          href={link.href}
          target="_blank"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
          whileHover={{ x: 5, scale: 1.1 }}
          className={`${link.color} text-white p-3 rounded-full shadow-lg relative group transition-all glow-hover`}
          title={link.label}
        >
          {link.icon}
          <span className="absolute left-full ml-4 px-3 py-1 bg-primary text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {link.label}
          </span>
        </motion.a>
      ))}
    </div>
  );
}
