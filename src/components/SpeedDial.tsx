"use client";

import { MapPin, Mail, Facebook, MessageCircle, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  {
    icon: MapPin,
    name: "Ubicación",
    href: "https://www.google.com/maps/search/?api=1&query=MZA.+K+LOTE.+19+A.H.+NUEVA+ALIANZA+CHACLACAYO",
    color: "bg-red-500",
  },
  {
    icon: Mail,
    name: "Correo",
    href: "mailto:fastcoldcharge@gmail.com",
    color: "bg-blue-600",
  },
  {
    icon: Facebook,
    name: "Facebook",
    href: "https://facebook.com/FastColdSolutions",
    color: "bg-blue-800",
  },
  {
    icon: MessageCircle,
    name: "WhatsApp",
    href: "https://wa.me/51952310802",
    color: "bg-green-500",
  },
  {
    icon: Navigation,
    name: "Waze",
    href: "https://waze.com/ul?q=MZA.+K+LOTE.+19+A.H.+NUEVA+ALIANZA+CHACLACAYO",
    color: "bg-sky-400",
  },
];

export default function SpeedDial() {
  return (
    <div className="fixed left-6 bottom-6 z-40 flex flex-col gap-3">
      {actions.map((action) => (
        <a
          key={action.name}
          href={action.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group flex items-center gap-3 p-3 rounded-full text-white shadow-lg hover:pr-6 transition-all duration-300",
            action.color
          )}
        >
          <action.icon className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap">
            {action.name}
          </span>
        </a>
      ))}
    </div>
  );
}
