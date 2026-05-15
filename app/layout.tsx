import type { Metadata } from "next";
import { Exo_2, Cinzel } from "next/font/google";
import "./globals.css";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-exo",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  title: "DAILUX - Walk Your Style",
  description: "Sneakers Collection - Diseños exclusivos para él y para ella",
  icons: {
    icon: "/Favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${exo2.variable} ${cinzel.variable}`}>{children}</body>
    </html>
  );
}
