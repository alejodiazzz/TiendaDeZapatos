"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappUrl = "https://wa.me/573105469406";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dailux-black/80 backdrop-blur-md border-b border-dailux-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Image
              src="/Logotipo.svg"
              alt="DAILUX"
              width={120}
              height={40}
              className="h-9 w-auto object-contain"
              priority
            />
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <span className="text-dailux-sand/70 text-sm tracking-widest uppercase">
              Walk Your Style
            </span>
            <button
              onClick={() => window.open(whatsappUrl, "_blank")}
              className="bg-dailux-gold text-dailux-black px-4 py-2 rounded-full text-sm font-medium hover:bg-dailux-gold/80 transition-colors"
            >
              Contáctanos
            </button>
            <button className="text-dailux-sand hover:text-dailux-gold transition-colors" aria-label="Carrito">
              <ShoppingCart className="w-6 h-6" />
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-dailux-sand"
              aria-label="Menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden bg-dailux-black border-t border-dailux-sand/10",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="px-4 py-4 space-y-3">
          <span className="text-dailux-sand/70 text-sm tracking-widest uppercase block">
            Walk Your Style
          </span>
          <button
            onClick={() => window.open(whatsappUrl, "_blank")}
            className="w-full bg-dailux-gold text-dailux-black px-4 py-2 rounded-full text-sm font-medium"
          >
            Contáctanos
          </button>
        </div>
      </div>
    </nav>
  );
}
