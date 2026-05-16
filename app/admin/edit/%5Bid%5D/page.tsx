import ProductForm from "@/components/admin/ProductForm";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id }
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin" className="text-gray-500 hover:text-white transition-colors">← Volver</Link>
        <h1 className="text-3xl font-bold font-[family-name:var(--font-cinzel)]">Editar Producto</h1>
      </div>
      
      <ProductForm product={product} />
    </div>
  );
}
