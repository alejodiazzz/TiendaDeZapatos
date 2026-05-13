"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { StaggerIn } from "./ui/animations";
import { buildWhatsAppURL, type Product } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

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
          <div className="relative aspect-[3/4] overflow-hidden bg-veylo-gray-light">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {product.code && (
              <div className="absolute top-3 left-3 bg-veylo-white/90 backdrop-blur-sm px-3 py-1 rounded-md">
                <span className="text-xs font-medium text-veylo-black">{product.code}</span>
              </div>
            )}
          </div>

          <div className="p-4 space-y-3">
            {product.style && (
              <p className="text-xs text-veylo-gray-text uppercase tracking-wider">
                Estilo: <span className="font-semibold text-veylo-black">{product.style}</span>
              </p>
            )}

            <h3 className="font-semibold text-veylo-black">{product.name}</h3>

            <div>
              <p className="text-xs text-veylo-gray-text uppercase">Precio</p>
              <p className="text-xl font-bold text-veylo-black">
                ${product.price.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-xs text-veylo-gray-text uppercase mb-2">Tallas Disponibles</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "w-10 h-10 rounded-md border text-sm font-medium transition-colors",
                      selectedSize === size
                        ? "bg-veylo-black text-veylo-white border-veylo-black"
                        : "bg-veylo-white text-veylo-black border-veylo-gray-light hover:border-veylo-black"
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
                    className="w-4 h-4 rounded-full border border-veylo-gray-light"
                    title={color}
                  />
                ))}
                <span className="text-xs text-veylo-gray-text uppercase">
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
                  ? "bg-veylo-black text-veylo-white hover:bg-veylo-gray-text"
                  : "bg-veylo-gray-light text-veylo-gray-text cursor-not-allowed"
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
