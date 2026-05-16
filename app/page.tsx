import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { BenefitsSection } from "@/components/BenefitsSection";
import { Footer } from "@/components/Footer";
import prisma from "@/lib/prisma";

export const revalidate = 0; // Forzar regeneración en cada visita para pruebas

export default async function Home() {
  let products = [];
  let errorMsg = "";

  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (e: any) {
    console.error(e);
    errorMsg = "Error conectando a la base de datos: " + e.message;
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      {errorMsg && (
        <div className="bg-red-500 text-white p-4 text-center font-bold">
          {errorMsg}
        </div>
      )}
      <div className="bg-dailux-gold text-dailux-black p-2 text-center text-xs">
        PRODUCTOS DETECTADOS: {products.length}
      </div>
      <Hero />
      <ProductGrid products={products} />
      <BenefitsSection />
      <Footer />
    </main>
  );
}
