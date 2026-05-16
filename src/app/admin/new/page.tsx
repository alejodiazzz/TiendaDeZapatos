import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";

export default function NewProductPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin" className="text-gray-500 hover:text-white transition-colors">← Volver</Link>
        <h1 className="text-3xl font-bold font-[family-name:var(--font-cinzel)]">Nuevo Zapato</h1>
      </div>
      
      <ProductForm />
    </div>
  );
}
