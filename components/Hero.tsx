"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { FadeIn } from "./ui/animations";

export function Hero() {
  const scrollToCatalog = () => {
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen bg-veylo-black relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-veylo-white/20 to-transparent" />
        <div className="absolute top-20 right-20 text-veylo-white/5 text-[200px] font-bold tracking-wider -rotate-90">
          VEYLO
        </div>
        <div className="absolute top-10 right-10 text-veylo-white/30 text-2xl">
          ///
        </div>
      </div>

      <div className="relative z-10 text-center px-4">
        <FadeIn>
          <div className="mb-8">
            <div className="inline-block">
              <h1 className="text-6xl md:text-8xl font-bold text-veylo-white tracking-wider">
                VEYLO
              </h1>
              <p className="text-veylo-white/80 text-sm md:text-base tracking-[0.3em] uppercase mt-2">
                Walk Your Style
              </p>
            </div>
          </div>

          <div className="inline-block bg-veylo-beige text-veylo-black px-6 py-2 rounded-full mb-8">
            <span className="font-bold text-sm md:text-base">PARA ÉL & PARA ELLA</span>
          </div>

          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-12 bg-veylo-white/50" />
            <p className="text-veylo-white/70 text-xs tracking-[0.2em] uppercase">
              Sneakers Collection
            </p>
            <div className="h-px w-12 bg-veylo-white/50" />
          </div>

          <button
            onClick={scrollToCatalog}
            className="animate-pulse-slow text-veylo-white hover:text-veylo-beige transition-colors"
            aria-label="Ver catálogo"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </FadeIn>
      </div>
    </section>
  );
}
