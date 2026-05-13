"use client";

import React, { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappUrl = "https://wa.me/573105469406";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-veylo-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-white text-2xl font-bold tracking-wider">VEYLO</h1>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <span className="text-veylo-white/70 text-sm tracking-widest uppercase">
              Walk Your Style
            </span>
            <button
              onClick={() => window.open(whatsappUrl, "_blank")}
              className="bg-veylo-white text-veylo-black px-4 py-2 rounded-full text-sm font-medium hover:bg-veylo-beige transition-colors"
            >
              Contáctanos
            </button>
            <button className="text-veylo-white hover:text-veylo-beige transition-colors" aria-label="Carrito">
              <ShoppingCart className="w-6 h-6" />
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-veylo-white"
              aria-label="Menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden bg-veylo-black border-t border-veylo-white/10",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="px-4 py-4 space-y-3">
          <span className="text-veylo-white/70 text-sm tracking-widest uppercase block">
            Walk Your Style
          </span>
          <button
            onClick={() => window.open(whatsappUrl, "_blank")}
            className="w-full bg-veylo-white text-veylo-black px-4 py-2 rounded-full text-sm font-medium"
          >
            Contáctanos
          </button>
        </div>
      </div>
    </nav>
  );
}
