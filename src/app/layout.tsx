import type { Metadata } from "next";
import "./globals.css";

// SEO
export const metadata: Metadata = {
  title: {
    default: "Planeamos tus Sueños — Eventos en el Oriente Antioqueño",
    template: "%s | Planeamos tus Sueños",
  },
  description:
    "Empresa especializada en organización de bodas, quinceañeras y eventos especiales en Rionegro, Guarne y Llanogrande.",
  keywords: [
    "eventos Rionegro",
    "bodas Oriente Antioqueño",
    "quinceañeras Guarne",
    "organización de eventos Llanogrande",
    "planeación de bodas Colombia",
  ],
};

// Layout principal
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}