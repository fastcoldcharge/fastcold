"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot } from "lucide-react";

interface Message {
  text: string;
  isBot: boolean;
}

const responses: Record<string, string> = {
  "hola": "Bienvenido a FAST COLD. ¿Necesitas transporte refrigerado o congelado?",
  "precio": "Indícanos origen, destino, tipo de carga y temperatura para cotizarte rápido.",
  "cotización": "Indícanos origen, destino, tipo de carga y temperatura para cotizarte rápido.",
  "refrigerado": "Ideal para alimentos frescos y productos sensibles.",
  "congelado": "Mantenemos temperaturas bajo cero con equipos especializados.",
  "provincias": "Realizamos rutas desde Lima hacia distintas regiones del Perú.",
  "whatsapp": "Escríbenos directo aquí 👉 https://wa.me/51952310802",
  "ubicación": "Estamos en Chaclacayo. Puedes ver el mapa aquí.",
  "emergencia": "Podemos atender servicios urgentes. Escríbenos ahora.",
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "¡Estamos aquí para ayudarte! 👷‍♂️❄️", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.toLowerCase();
    setMessages((prev) => [...prev, { text: input, isBot: false }]);
    setInput("");

    // Simple response logic
    setTimeout(() => {
      let botResponse = "Gracias por escribirnos. Un asesor se pondrá en contacto pronto o puedes escribirnos al WhatsApp directo.";

      for (const key in responses) {
        if (userMsg.includes(key)) {
          botResponse = responses[key];
          break;
        }
      }

      setMessages((prev) => [...prev, { text: botResponse, isBot: true }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="bg-white rounded-2xl shadow-2xl w-[350px] overflow-hidden border border-slate-200 mb-4"
          >
            {/* Header */}
            <div className="bg-[#075e54] p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">FAST COLD E.I.R.L.</h4>
                  <p className="text-[10px] text-green-300 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> En línea
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded">
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div
              ref={scrollRef}
              className="h-[350px] overflow-y-auto p-4 bg-[#e5ddd5] flex flex-col gap-4 scroll-smooth"
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-xl text-sm shadow-sm ${
                      msg.isBot ? "bg-white text-slate-800 rounded-tl-none" : "bg-[#dcf8c6] text-slate-800 rounded-tr-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Escribe un mensaje..."
                className="flex-1 px-4 py-2 bg-slate-100 rounded-full text-sm outline-none focus:ring-1 focus:ring-[#075e54]"
              />
              <button
                onClick={handleSend}
                className="bg-[#075e54] text-white p-2 rounded-full hover:scale-110 transition-transform"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#25d366] text-white p-4 rounded-full shadow-2xl relative"
      >
        <MessageSquare size={32} />
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-bounce" />
        )}
      </motion.button>
    </div>
  );
}
