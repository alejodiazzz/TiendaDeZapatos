import React from "react";
import { Footprints, Layers, Shield, Users } from "lucide-react";
import { FadeIn } from "./ui/animations";

const benefits = [
  {
    icon: Footprints,
    title: "DISEÑOS EXCLUSIVOS",
    description: "Estilo único para cada outfit.",
  },
  {
    icon: Layers,
    title: "MÁXIMA COMODIDAD",
    description: "Materiales de alta calidad.",
  },
  {
    icon: Shield,
    title: "RESISTENCIA PREMIUM",
    description: "Hechos para durar cada paso.",
  },
  {
    icon: Users,
    title: "PARA ÉL & PARA ELLA",
    description: "Modelos versátiles que combinan contigo.",
  },
];

export function BenefitsSection() {
  return (
    <section className="bg-veylo-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <FadeIn key={index} delay={index * 100}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-veylo-white/10 mb-4">
                  <benefit.icon className="w-8 h-8 text-veylo-white" />
                </div>
                <h3 className="text-veylo-white font-bold uppercase tracking-wider mb-2">
                  {benefit.title}
                </h3>
                <p className="text-veylo-white/70 text-sm">{benefit.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
