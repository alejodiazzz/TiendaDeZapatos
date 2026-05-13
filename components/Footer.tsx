import React from "react";
import { ShoppingBag, MessageCircle, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-veylo-gray-light py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center justify-center">
            <div className="bg-veylo-black p-4 rounded-lg">
              <ShoppingBag className="w-12 h-12 text-veylo-white" />
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-veylo-black font-bold text-lg mb-2">VEYLO</h3>
            <div className="space-y-1 text-veylo-black/70 text-sm uppercase tracking-wider">
              <p>Walk Your Style</p>
              <p>Own Every Step</p>
              <p>Be Different</p>
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MessageCircle className="w-5 h-5 text-veylo-black" />
              <span className="font-bold text-veylo-black">PEDIDOS</span>
            </div>
            <p className="text-veylo-black/70">310 546 9406</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-2">
              <Instagram className="w-5 h-5 text-veylo-black" />
              <Youtube className="w-5 h-5 text-veylo-black" />
            </div>
            <p className="text-veylo-black/70 text-sm">@veylo.sneakers</p>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <div className="bg-veylo-white p-4 rounded-lg border border-veylo-gray-text/20">
            <div className="w-24 h-24 bg-veylo-black rounded flex items-center justify-center">
              <span className="text-veylo-white text-xs">QR CODE</span>
            </div>
            <p className="text-xs text-veylo-black/70 text-center mt-2 uppercase">
              Escanea para ver más modelos
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-veylo-gray-text/20 text-center">
          <p className="text-veylo-black/50 text-sm">
            © {new Date().getFullYear()} VEYLO. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
