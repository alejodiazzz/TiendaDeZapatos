import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { BenefitsSection } from "@/components/BenefitsSection";
import { Footer } from "@/components/Footer";
import prisma from "@/lib/prisma";

export const revalidate = 3600; // Revalidar cada hora por defecto, pero las Server Actions forzarán revalidación

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ProductGrid products={products} />
      <BenefitsSection />
      <Footer />
    </main>
  );
}
