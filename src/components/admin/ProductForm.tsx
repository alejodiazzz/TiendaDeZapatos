"use client";

import { useState } from "react";
import { saveProduct } from "@/app/admin/actions";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

interface ProductFormProps {
  product?: any;
}

export default function ProductForm({ product }: ProductFormProps) {
  const [imageUrl, setImageUrl] = useState(product?.image || "");
  const [selectedSizes, setSelectedSizes] = useState<number[]>(product?.sizes || []);
  const [selectedColors, setSelectedColors] = useState<string[]>(product?.colors || []);

  const categories = ["hombre", "mujer", "niños", "deportivo", "casual", "formal"];
  const allSizes = Array.from({ length: 11 }, (_, i) => i + 35);
  const allColors = ["BLANCO", "NEGRO", "GRIS", "ROJO", "AZUL", "VERDE", "DORADO", "PLATA", "CREMA", "MORADO"];

  const toggleSize = (size: number) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  return (
    <form action={saveProduct} className="space-y-8 bg-[#0a0a0a] p-8 rounded-3xl border border-white/10 shadow-2xl">
      <input type="hidden" name="id" value={product?.id || ""} />
      <input type="hidden" name="image" value={imageUrl} />
      <input type="hidden" name="sizes" value={selectedSizes.join(",")} />
      <input type="hidden" name="colors" value={selectedColors.join(",")} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Lado Izquierdo: Datos Básicos */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2 uppercase tracking-widest">Nombre del Producto</label>
            <input 
              name="name" 
              defaultValue={product?.name} 
              required 
              className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-white/50 transition-all outline-none"
              placeholder="Ej: Sneaker Urbana Premium"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2 uppercase tracking-widest">Precio (COP)</label>
              <input 
                name="price" 
                type="number" 
                defaultValue={product?.price} 
                required 
                className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white outline-none"
                placeholder="200000"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2 uppercase tracking-widest">Categoría</label>
              <select 
                name="category" 
                defaultValue={product?.category} 
                className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white outline-none appearance-none"
              >
                {categories.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2 uppercase tracking-widest">Código</label>
              <input 
                name="code" 
                defaultValue={product?.code} 
                className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white outline-none"
                placeholder="Ej: 3155/DH"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2 uppercase tracking-widest">Estilo</label>
              <input 
                name="style" 
                defaultValue={product?.style} 
                className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white outline-none"
                placeholder="Ej: URBANO PREMIUM"
              />
            </div>
          </div>
        </div>

        {/* Lado Derecho: Imagen y Extras */}
        <div className="space-y-6">
          <label className="block text-sm text-gray-400 mb-2 uppercase tracking-widest">Imagen del Producto</label>
          <div className="relative aspect-square rounded-2xl border-2 border-dashed border-white/20 bg-black flex items-center justify-center overflow-hidden group">
            {imageUrl ? (
              <>
                <Image src={imageUrl} alt="Preview" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <p className="text-white text-xs">Cambiar Imagen</p>
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-sm">No hay imagen seleccionada</p>
            )}
            <CldUploadWidget 
              uploadPreset="veylo_presets" // El usuario deberá crear esto
              onSuccess={(result: any) => {
                setImageUrl(result.info.secure_url);
              }}
            >
              {({ open }) => (
                <button 
                  type="button" 
                  onClick={() => open()} 
                  className="absolute inset-0 w-full h-full"
                />
              )}
            </CldUploadWidget>
          </div>
          
          <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
            <input type="checkbox" name="featured" id="featured" defaultChecked={product?.featured} className="w-5 h-5 accent-white" />
            <label htmlFor="featured" className="text-sm font-medium">Marcar como Producto Destacado</label>
          </div>
        </div>
      </div>

      <hr className="border-white/10" />

      {/* Tallas y Colores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm text-gray-400 mb-4 uppercase tracking-widest">Tallas Disponibles</label>
          <div className="flex flex-wrap gap-2">
            {allSizes.map(size => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`w-10 h-10 rounded-lg border text-sm font-bold transition-all ${
                  selectedSizes.includes(size) 
                    ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
                    : "bg-black text-gray-500 border-white/20 hover:border-white/50"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-4 uppercase tracking-widest">Colores Disponibles</label>
          <div className="flex flex-wrap gap-2">
            {allColors.map(color => (
              <button
                key={color}
                type="button"
                onClick={() => toggleColor(color)}
                className={`px-3 py-1.5 rounded-full border text-[10px] font-bold transition-all ${
                  selectedColors.includes(color) 
                    ? "bg-white text-black border-white" 
                    : "bg-black text-gray-500 border-white/20 hover:border-white/50"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button 
          type="submit" 
          className="flex-grow bg-white text-black font-black py-4 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all tracking-[0.2em] shadow-xl shadow-white/10"
        >
          {product ? "GUARDAR CAMBIOS" : "PUBLICAR PRODUCTO"}
        </button>
      </div>
    </form>
  );
}
