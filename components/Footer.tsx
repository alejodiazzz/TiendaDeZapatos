import React from "react";
import Image from "next/image";
import { MessageCircle, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-dailux-charcoal py-12 px-4 border-t border-dailux-gold/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center justify-center">
            <Image
              src="/Isotipo.svg"
              alt="DAILUX isotipo"
              width={80}
              height={80}
              className="w-16 h-16 object-contain"
            />
          </div>

          <div className="text-center">
            <h3 className="text-dailux-gold font-brand text-lg mb-2 tracking-widest">DAILUX</h3>
            <div className="space-y-1 text-dailux-sand/70 text-sm uppercase tracking-wider">
              <p>Walk Your Style</p>
              <p>Own Every Step</p>
              <p>Be Different</p>
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MessageCircle className="w-5 h-5 text-dailux-gold" />
              <span className="font-bold text-dailux-sand">PEDIDOS</span>
            </div>
            <p className="text-dailux-sand/70">310 546 9406</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-2">
              <Instagram className="w-5 h-5 text-dailux-sand" />
              <Youtube className="w-5 h-5 text-dailux-sand" />
            </div>
            <p className="text-dailux-sand/70 text-sm">@dailux.sneakers</p>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <div className="bg-dailux-black p-4 rounded-lg border border-dailux-gold/20">
            <div className="w-24 h-24 bg-dailux-charcoal rounded flex items-center justify-center">
              <span className="text-dailux-sand text-xs">QR CODE</span>
            </div>
            <p className="text-xs text-dailux-sand/70 text-center mt-2 uppercase">
              Escanea para ver más modelos
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-dailux-gold/20 text-center">
          <p className="text-dailux-sand/50 text-sm">
            © {new Date().getFullYear()} DAILUX. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
