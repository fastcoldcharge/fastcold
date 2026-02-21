import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FAST COLD E.I.R.L. | Transporte Refrigerado y Congelado en Lima",
  description: "Empresa especializada en transporte refrigerado y congelado en Lima y provincias. Seguridad, puntualidad y control de temperatura.",
  keywords: ["transporte refrigerado lima", "transporte congelado lima", "transporte frío Perú", "camión refrigerado Lima", "cadena de frío logística"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
