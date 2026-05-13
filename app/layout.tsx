import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-exo",
});

export const metadata: Metadata = {
  title: "VEYLO - Walk Your Style",
  description: "Sneakers Collection - Diseños exclusivos para él y para ella",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={exo2.variable}>{children}</body>
    </html>
  );
}
