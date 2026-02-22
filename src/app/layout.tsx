import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "FAST COLD E.I.R.L. | Transporte Refrigerado y Congelado Lima",
  description: "Empresa especializada en transporte refrigerado y congelado en Lima y provincias. Seguridad, puntualidad y logística de frío profesional.",
  keywords: ["transporte refrigerado lima", "transporte congelado lima", "cadena de frío logística", "camión refrigerado Perú"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
