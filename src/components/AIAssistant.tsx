"use client";

import { useState } from "react";
import { MessageSquare, Send, X, User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

const responses: Record<string, string> = {
  cotización: "Claro, indícanos origen, destino, tipo de carga y temperatura requerida para cotizarte.",
  precio: "Claro, indícanos origen, destino, tipo de carga y temperatura requerida para cotizarte.",
  tarifa: "Claro, indícanos origen, destino, tipo de carga y temperatura requerida para cotizarte.",
  refrigerado: "Ofrecemos transporte refrigerado ideal para alimentos frescos y productos sensibles.",
  congelado: "Nuestros camiones mantienen temperaturas bajo cero con control constante.",
  provincias: "Realizamos rutas desde Lima hacia diversas provincias del Perú.",
  ubicación: "Estamos en Chaclacayo. Aquí puedes ver nuestra ubicación: MZA. K LOTE. 19 A.H. NUEVA ALIANZA.",
  whatsapp: "Puedes escribirnos directamente aquí 👉 https://wa.me/51952310802",
  horario: "Atendemos solicitudes todos los días. Escríbenos y coordinamos tu servicio.",
  servicios: "Ofrecemos transporte refrigerado, congelado y logística de cadena de frío.",
  emergencia: "Nuestro equipo puede atender servicios urgentes. Escríbenos por WhatsApp ahora.",
  hola: "Hola 👋 Bienvenido a FAST COLD E.I.R.L. ¿Necesitas transporte refrigerado o congelado?",
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "¡Estamos aquí para ayudarte! 👷‍♂️❄️" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.toLowerCase();
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Find response
    let botResponse = "Lo siento, no entiendo tu consulta. ¿Podrías intentar con palabras clave como 'cotización', 'servicios' o 'whatsapp'?";

    for (const key in responses) {
      if (userMsg.includes(key)) {
        botResponse = responses[key];
        break;
      }
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: botResponse }]);
    }, 500);
  };

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-80 md:w-96 overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-300">
          {/* Header */}
          <div className="bg-brand-blue p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="text-white w-6 h-6" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">FAST COLD E.I.R.L.</p>
                <p className="text-brand-light text-xs flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Soporte en línea
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:rotate-90 transition-transform">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Chat Area */}
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex gap-2 max-w-[85%]",
                  msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                  msg.role === "user" ? "bg-brand-blue" : "bg-brand-light"
                )}>
                  {msg.role === "user" ? <User className="text-white w-4 h-4" /> : <Bot className="text-white w-4 h-4" />}
                </div>
                <div className={cn(
                  "p-3 rounded-2xl text-sm",
                  msg.role === "user" ? "bg-brand-blue text-white rounded-tr-none" : "bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none"
                )}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Escribe tu mensaje..."
                className="w-full pl-4 pr-12 py-3 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="absolute right-2 top-1.5 p-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-brand-blue text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
        >
          <MessageSquare className="w-8 h-8 group-hover:rotate-12 transition-transform" />
        </button>
      )}
    </div>
  );
}
