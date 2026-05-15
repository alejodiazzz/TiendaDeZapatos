"use client";

import React from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { FadeIn } from "./ui/animations";

export function Hero() {
  const scrollToCatalog = () => {
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen bg-dailux-black relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-dailux-gold/20 to-transparent" />
        <div className="absolute top-20 right-20 text-dailux-sand/5 text-[200px] font-bold tracking-wider -rotate-90">
          DAILUX
        </div>
        <div className="absolute top-10 right-10 text-dailux-sand/30 text-2xl">
          ///
        </div>
      </div>

      <div className="relative z-10 text-center px-4">
        <FadeIn>
          <div className="mb-8">
            <div className="inline-block">
              <Image
                src="/Logo.svg"
                alt="DAILUX"
                width={320}
                height={120}
                className="h-24 md:h-36 w-auto object-contain mx-auto"
                priority
              />
              <p className="text-dailux-sand/80 text-sm md:text-base tracking-[0.3em] uppercase mt-4 font-brand">
                Walk Your Style
              </p>
            </div>
          </div>

          <div className="inline-block bg-dailux-gold text-dailux-black px-6 py-2 rounded-full mb-8">
            <span className="font-bold text-sm md:text-base">PARA ÉL &amp; PARA ELLA</span>
          </div>

          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-12 bg-dailux-sand/50" />
            <p className="text-dailux-sand/70 text-xs tracking-[0.2em] uppercase">
              Sneakers Collection
            </p>
            <div className="h-px w-12 bg-dailux-sand/50" />
          </div>

          <button
            onClick={scrollToCatalog}
            className="animate-pulse-slow text-dailux-sand hover:text-dailux-gold transition-colors"
            aria-label="Ver catálogo"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </FadeIn>
      </div>
    </section>
  );
}
