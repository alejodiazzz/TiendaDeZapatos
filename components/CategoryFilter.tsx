"use client";

import React from "react";
import { categories, type Category } from "@/data/products";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex overflow-x-auto gap-2 pb-4 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
            selectedCategory === category.id
              ? "bg-dailux-gold text-dailux-black"
              : "bg-dailux-charcoal text-dailux-sand hover:bg-dailux-gunmetal/40"
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
