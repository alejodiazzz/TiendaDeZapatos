import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { BenefitsSection } from "@/components/BenefitsSection";
import { Footer } from "@/components/Footer";
import prisma from "@/lib/prisma";

export const revalidate = 0;

export default async function Home() {
  let products: any[] = [];
  let errorMsg = "";

  try {
    // Intento de conexión simple
    products = await prisma.product.findMany({
      take: 50,
      orderBy: { createdAt: 'desc' }
    });
  } catch (e: any) {
    console.error("DEBUG PRISMA ERROR:", e);
    errorMsg = e.message || "Error desconocido en Prisma";
  }

  return (
    <main className="min-h-screen">
      {/* BARRA DE DIAGNÓSTICO EN LA PARTE SUPERIOR ABSOLUTA */}
      <div className="fixed top-0 left-0 right-0 z-[9999] bg-red-600 text-white text-center py-1 font-mono text-[10px]">
        DEBUG: DB_STATUS={errorMsg ? "ERROR" : "OK"} | COUNT={products.length} {errorMsg && `| MSG=${errorMsg.substring(0, 50)}...`}
      </div>

      <div className="pt-6"> {/* Espacio para la barra de arriba */}
        <Navbar />
        <Hero />
        <ProductGrid products={products} />
        <BenefitsSection />
        <Footer />
      </div>
    </main>
  );
}
