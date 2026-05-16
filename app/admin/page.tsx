export const dynamic = 'force-dynamic';
import prisma from "@/lib/prisma";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminDashboard() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-cinzel)]">Gestión de Inventario</h1>
          <p className="text-gray-500 mt-2">Tienes {products.length} productos publicados.</p>
        </div>
        <Link 
          href="/admin/new" 
          className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all flex items-center gap-2"
        >
          <span>+</span> AGREGAR PRODUCTO
        </Link>
      </div>

      <div className="grid gap-4">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-[#111] border border-white/10 rounded-2xl p-4 flex items-center gap-6 hover:border-white/30 transition-all group"
          >
            <div className="relative h-20 w-20 rounded-xl overflow-hidden bg-black flex-shrink-0">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                className="object-cover"
              />
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-400 uppercase tracking-widest">
                  {product.code || 'SIN CÓDIGO'}
                </span>
              </div>
              <p className="text-gray-500 text-sm">{product.category} • {product.style}</p>
            </div>
            <div className="text-right flex-shrink-0 px-6">
              <p className="text-xl font-bold text-white">${product.price.toLocaleString()}</p>
              <p className="text-xs text-gray-600">{product.colors.join(', ')}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <Link 
                href={`/admin/edit/${product.id}`}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-blue-400"
              >
                Editar
              </Link>
              <DeleteButton id={product.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
