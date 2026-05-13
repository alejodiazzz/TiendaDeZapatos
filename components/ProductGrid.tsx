"use client";

import React, { useState } from "react";
import { Grid } from "./ui/grid";
import { CategoryFilter } from "./CategoryFilter";
import { ProductCard } from "./ProductCard";
import { products, type Category } from "@/data/products";

export function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("todos");

  const filteredProducts =
    selectedCategory === "todos"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section id="catalog" className="py-12 px-4 bg-veylo-gray-light">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-veylo-black mb-8 text-center">
          Nuestra Colección
        </h2>

        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }} gap="gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </Grid>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-veylo-gray-text">No hay productos en esta categoría.</p>
          </div>
        )}
      </div>
    </section>
  );
}
