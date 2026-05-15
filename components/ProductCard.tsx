"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { StaggerIn } from "./ui/animations";
import { buildWhatsAppURL, type Product } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const colorMap: Record<string, string> = {
  "GRIS": "#808080",
  "NEGRO": "#000000",
  "PLATA": "#C0C0C0",
  "CREMA": "#FFFDD0",
  "BORDADOS": "#D2B48C",
  "BLANCO": "#FFFFFF",
  "ROJO": "#FF0000",
  "AZUL": "#0000FF",
  "VERDE": "#008000",
  "DORADO": "#FFD700",
  "MORADO": "#800080",
};

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  const handleWhatsAppClick = () => {
    if (selectedSize) {
      const url = buildWhatsAppURL(product, selectedSize);
      window.open(url, "_blank");
    }
  };

  return (
    <StaggerIn delay={index * 100}>
      <Card className="overflow-hidden group">
        <CardContent className="p-0">
          <div className="relative aspect-[3/4] overflow-hidden bg-dailux-charcoal">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {product.code && (
              <div className="absolute top-3 left-3 bg-dailux-black/90 backdrop-blur-sm px-3 py-1 rounded-md">
                <span className="text-xs font-medium text-dailux-sand">{product.code}</span>
              </div>
            )}
          </div>

          <div className="p-4 space-y-3">
            {product.style && (
              <p className="text-xs text-dailux-gunmetal uppercase tracking-wider">
                Estilo: <span className="font-semibold text-dailux-sand">{product.style}</span>
              </p>
            )}

            <h3 className="font-semibold text-dailux-sand">{product.name}</h3>

            <div>
              <p className="text-xs text-dailux-gunmetal uppercase">Precio</p>
              <p className="text-xl font-bold text-dailux-sand">
                ${product.price.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-xs text-dailux-gunmetal uppercase mb-2">Tallas Disponibles</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "w-10 h-10 rounded-md border text-sm font-medium transition-colors",
                      selectedSize === size
                        ? "bg-dailux-gold text-dailux-black border-dailux-gold"
                        : "bg-dailux-charcoal text-dailux-sand border-dailux-gunmetal hover:border-dailux-gold"
                    )}
                    aria-label={`Talla ${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-2">
                {product.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full border border-dailux-gunmetal"
                    style={{ backgroundColor: colorMap[color] || "#CCCCCC" }}
                    title={color}
                  />
                ))}
                <span className="text-xs text-dailux-gunmetal uppercase">
                  {product.colors.join(" / ")}
                </span>
              </div>
            )}

            <button
              onClick={handleWhatsAppClick}
              disabled={!selectedSize}
              className={cn(
                "w-full flex items-center justify-center gap-2 py-3 rounded-full font-medium transition-colors",
                selectedSize
                  ? "bg-dailux-gold text-dailux-black hover:bg-dailux-gold/80"
                  : "bg-dailux-charcoal text-dailux-gunmetal cursor-not-allowed"
              )}
              aria-label={selectedSize ? "Pedir por WhatsApp" : "Selecciona una talla"}
            >
              <MessageCircle className="w-4 h-4" />
              {selectedSize ? "Pedir por WhatsApp" : "Selecciona una talla"}
            </button>
          </div>
        </CardContent>
      </Card>
    </StaggerIn>
  );
}
