# VEYLO Sneaker Store Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready e-commerce landing page for VEYLO sneaker store with Next.js 14, Tailwind CSS, and cult-ui components.

**Architecture:** Next.js 14 App Router with client-side filtering, static product data, and WhatsApp-based ordering. No backend or database.

**Tech Stack:** Next.js 14, Tailwind CSS, TypeScript, shadcn/ui base, cult-ui components (copy-paste), next/image

---

## File Structure

```
VentaDeZapatos/
├── app/
│   ├── layout.tsx          # Root layout with fonts, metadata
│   ├── page.tsx            # Main landing page
│   └── globals.css        # Global styles, Tailwind directives
├── components/
│   ├── ui/                 # cult-ui components (copy-paste)
│   │   ├── card.tsx        # 3D tilt card with hover effects
│   │   ├── grid.tsx        # Masonry/responsive grid
│   │   └── animations.tsx # Stagger reveal, transitions
│   ├── Navbar.tsx          # Logo, cart icon, CTA
│   ├── Hero.tsx            # Full-width banner with scroll CTA
│   ├── ProductGrid.tsx     # Filtered product grid
│   ├── ProductCard.tsx     # Individual product card with size selector
│   ├── CategoryFilter.tsx  # Horizontal category pills
│   ├── BenefitsSection.tsx # 4-column benefits band
│   └── Footer.tsx          # Contact info, social links
├── data/
│   └── products.ts         # Product data array
├── lib/
│   ├── whatsapp.ts         # WhatsApp URL builder
│   └── utils.ts            # Utility functions
├── public/
│   └── shoes/              # Product images (2-12.jpeg)
├── next.config.ts          # Next.js config with image optimization
├── tailwind.config.ts      # Tailwind config with custom colors
├── tsconfig.json           # TypeScript config
└── package.json            # Dependencies
```

---

## Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "veylo-sneaker-store",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.3.0",
    "lucide-react": "^0.378.0"
  },
  "devDependencies": {
    "@types/node": "^20.12.12",
    "@types/react": "^18.3.2",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.4.5",
    "tailwindcss": "^3.4.3",
    "postcss": "^8.4.38",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-config-next": "14.2.3"
  }
}
```

- [ ] **Step 2: Create next.config.ts**

```typescript
const nextConfig = {
  images: {
    unoptimized: false,
    formats: ['image/webp'],
    remotePatterns: [],
  },
};

export default nextConfig;
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create tailwind.config.ts**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-exo)', 'sans-serif'],
      },
      colors: {
        veylo: {
          black: '#000000',
          white: '#FFFFFF',
          beige: '#D8C19A',
          gray: {
            light: '#EAEAEA',
            text: '#666666',
          },
        },
      },
      animation: {
        'stagger-in': 'staggerIn 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        staggerIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 5: Create postcss.config.mjs**

```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```

- [ ] **Step 6: Create app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --font-exo: 'Exo 2', system-ui, sans-serif;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-veylo-white text-veylo-black;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

- [ ] **Step 7: Create app/layout.tsx**

```typescript
import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-exo",
});

export const metadata: Metadata = {
  title: "VEYLO - Walk Your Style",
  description: "Sneakers Collection - Diseños exclusivos para él y para ella",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={exo2.variable}>{children}</body>
    </html>
  );
}
```

- [ ] **Step 8: Create app/page.tsx (placeholder)**

```typescript
export default function Home() {
  return (
    <main className="min-h-screen">
      <h1 className="text-4xl font-bold text-center pt-20">VEYLO</h1>
    </main>
  );
}
```

- [ ] **Step 9: Install dependencies**

Run: `npm install`

Expected: All dependencies installed successfully

- [ ] **Step 10: Verify Next.js runs**

Run: `npm run dev`

Expected: Server starts on http://localhost:3000, page displays "VEYLO"

- [ ] **Step 11: Commit**

```bash
git add .
git commit -m "feat: initialize Next.js 14 project with Tailwind CSS and TypeScript"
```

---

## Task 2: Create Utility Functions

**Files:**
- Create: `lib/utils.ts`

- [ ] **Step 1: Create lib/utils.ts**

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/utils.ts
git commit -m "feat: add utility function for className merging"
```

---

## Task 3: Create WhatsApp Helper

**Files:**
- Create: `lib/whatsapp.ts`

- [ ] **Step 1: Create lib/whatsapp.ts**

```typescript
export interface Product {
  id: string;
  name: string;
  price: number;
  category: "hombre" | "mujer" | "niños" | "deportivo" | "casual" | "formal";
  sizes: number[];
  image: string;
  featured: boolean;
  code?: string;
  style?: string;
  colors?: string[];
}

const WHATSAPP_NUMBER = "573105469406";

export function buildWhatsAppURL(product: Product, size?: number): string {
  const sizeText = size ? `talla ${size}` : "a consultar";
  const message = `Hola, me interesa el ${product.name} en ${sizeText}, precio $${product.price.toLocaleString()}. ¿Está disponible?`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/whatsapp.ts
git commit -m "feat: add WhatsApp URL builder helper"
```

---

## Task 4: Create Product Data

**Files:**
- Create: `data/products.ts`

- [ ] **Step 1: Create data/products.ts**

```typescript
import { Product } from "@/lib/whatsapp";

export const products: Product[] = [
  {
    id: "sneaker-gris-negro",
    name: "Sneaker Urbana Premium",
    price: 200000,
    category: "deportivo",
    sizes: [36, 37, 38, 39, 40, 41, 42, 43],
    image: "/shoes/2.jpeg",
    featured: true,
    code: "3155/3154 DH🌐",
    style: "URBANO PREMIUM",
    colors: ["GRIS", "NEGRO", "PLATA"],
  },
  {
    id: "converse-bordadas",
    name: "Converse Aesthetic Bordadas",
    price: 190000,
    category: "casual",
    sizes: [36, 37, 38, 39, 40, 41, 42, 43],
    image: "/shoes/3.jpeg",
    featured: true,
    code: "368D🦅",
    style: "CASUAL AESTHETIC",
    colors: ["CREMA", "BORDADOS"],
  },
  {
    id: "converse-negra",
    name: "Converse Street Classic",
    price: 190000,
    category: "casual",
    sizes: [36, 37, 38, 39, 40, 41, 42, 43],
    image: "/shoes/4.jpeg",
    featured: true,
    code: "332D🦅",
    style: "STREET CLASSIC",
    colors: ["NEGRO", "BLANCO"],
  },
  {
    id: "sneaker-blanca",
    name: "Sneaker Blanca Minimal",
    price: 180000,
    category: "casual",
    sizes: [36, 37, 38, 39, 40, 41, 42],
    image: "/shoes/5.jpeg",
    featured: false,
    code: "445W⚪",
    style: "MINIMAL WHITE",
    colors: ["BLANCO"],
  },
  {
    id: "sneaker-roja",
    name: "Sneaker Roja Sport",
    price: 210000,
    category: "deportivo",
    sizes: [37, 38, 39, 40, 41, 42, 43],
    image: "/shoes/6.jpeg",
    featured: false,
    code: "556R🔴",
    style: "SPORT RED",
    colors: ["ROJO", "BLANCO"],
  },
  {
    id: "sneaker-azul",
    name: "Sneaker Azul Navy",
    price: 195000,
    category: "deportivo",
    sizes: [36, 37, 38, 39, 40, 41, 42],
    image: "/shoes/7.jpeg",
    featured: false,
    code: "667B🔵",
    style: "NAVY BLUE",
    colors: ["AZUL", "BLANCO"],
  },
  {
    id: "sneaker-verde",
    name: "Sneaker Verde Army",
    price: 185000,
    category: "casual",
    sizes: [37, 38, 39, 40, 41, 42],
    image: "/shoes/8.jpeg",
    featured: false,
    code: "778G🟢",
    style: "ARMY GREEN",
    colors: ["VERDE", "NEGRO"],
  },
  {
    id: "sneaker-dorada",
    name: "Sneaker Dorada Luxe",
    price: 250000,
    category: "formal",
    sizes: [36, 37, 38, 39, 40, 41],
    image: "/shoes/9.jpeg",
    featured: true,
    code: "889G✨",
    style: "LUXE GOLD",
    colors: ["DORADO", "NEGRO"],
  },
  {
    id: "sneaker-plata",
    name: "Sneaker Plata Chrome",
    price: 230000,
    category: "formal",
    sizes: [37, 38, 39, 40, 41, 42],
    image: "/shoes/10.jpeg",
    featured: false,
    code: "990S🪙",
    style: "CHROME SILVER",
    colors: ["PLATA", "NEGRO"],
  },
  {
    id: "sneaker-morada",
    name: "Sneaker Morada Neon",
    price: 200000,
    category: "deportivo",
    sizes: [36, 37, 38, 39, 40, 41, 42, 43],
    image: "/shoes/11.jpeg",
    featured: false,
    code: "001P💜",
    style: "NEON PURPLE",
    colors: ["MORADO", "BLANCO"],
  },
];

export const categories = [
  { id: "todos", label: "Todos" },
  { id: "hombre", label: "Hombre" },
  { id: "mujer", label: "Mujer" },
  { id: "niños", label: "Niños" },
  { id: "deportivo", label: "Deportivo" },
  { id: "casual", label: "Casual" },
  { id: "formal", label: "Formal" },
] as const;

export type Category = (typeof categories)[number]["id"];
```

- [ ] **Step 2: Commit**

```bash
git add data/products.ts
git commit -m "feat: add product data with 10 sneakers"
```

---

## Task 5: Copy cult-ui Card Component

**Files:**
- Create: `components/ui/card.tsx`

- [ ] **Step 1: Create components/ui/card.tsx (3D tilt card)**

```typescript
"use client";

import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  tilt?: boolean;
  tiltMax?: number;
}

export function Card({ children, className, tilt = true, tiltMax = 10, ...props }: CardProps) {
  const [transform, setTransform] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -tiltMax;
    const rotateY = ((x - centerX) / centerX) * tiltMax;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform("");
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "rounded-lg bg-white shadow-sm transition-all duration-300 ease-out",
        className
      )}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/card.tsx
git commit -m "feat: add cult-ui card component with 3D tilt effect"
```

---

## Task 6: Copy cult-ui Grid Component

**Files:**
- Create: `components/ui/grid.tsx`

- [ ] **Step 1: Create components/ui/grid.tsx**

```typescript
import React from "react";
import { cn } from "@/lib/utils";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: string;
}

export function Grid({
  children,
  className,
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = "gap-6",
  ...props
}: GridProps) {
  return (
    <div
      className={cn(
        "grid",
        `grid-cols-${cols.mobile}`,
        `md:grid-cols-${cols.tablet}`,
        `lg:grid-cols-${cols.desktop}`,
        gap,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function GridItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />;
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/grid.tsx
git commit -m "feat: add cult-ui responsive grid component"
```

---

## Task 7: Copy cult-ui Animation Components

**Files:**
- Create: `components/ui/animations.tsx`

- [ ] **Step 1: Create components/ui/animations.tsx**

```typescript
"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface StaggerInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function StaggerIn({ children, className, delay = 0, duration = 0.5 }: StaggerInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-500 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}s`,
      }}
    >
      {children}
    </div>
  );
}

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export function FadeIn({ children, className, direction = "up" }: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const transformClasses = {
    up: "translate-y-8",
    down: "-translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-500 ease-out",
        isVisible ? "opacity-100 translate-0" : `opacity-0 ${transformClasses[direction]}`,
        className
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/animations.tsx
git commit -m "feat: add cult-ui animation components (StaggerIn, FadeIn)"
```

---

## Task 8: Create Navbar Component

**Files:**
- Create: `components/Navbar.tsx`

- [ ] **Step 1: Create components/Navbar.tsx**

```typescript
"use client";

import React, { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { buildWhatsAppURL } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappUrl = "https://wa.me/573105469406";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-veylo-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-white text-2xl font-bold tracking-wider">VEYLO</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <span className="text-veylo-white/70 text-sm tracking-widest uppercase">
              Walk Your Style
            </span>
            <button
              onClick={() => window.open(whatsappUrl, "_blank")}
              className="bg-veylo-white text-veylo-black px-4 py-2 rounded-full text-sm font-medium hover:bg-veylo-beige transition-colors"
            >
              Contáctanos
            </button>
            <button className="text-veylo-white hover:text-veylo-beige transition-colors" aria-label="Carrito">
              <ShoppingCart className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-veylo-white"
              aria-label="Menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden bg-veylo-black border-t border-veylo-white/10",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="px-4 py-4 space-y-3">
          <span className="text-veylo-white/70 text-sm tracking-widest uppercase block">
            Walk Your Style
          </span>
          <button
            onClick={() => window.open(whatsappUrl, "_blank")}
            className="w-full bg-veylo-white text-veylo-black px-4 py-2 rounded-full text-sm font-medium"
          >
            Contáctanos
          </button>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Navbar.tsx
git commit -m "feat: add Navbar component with mobile menu"
```

---

## Task 9: Create Hero Component

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Create components/Hero.tsx**

```typescript
"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { FadeIn } from "./ui/animations";

export function Hero() {
  const scrollToCatalog = () => {
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen bg-veylo-black relative overflow-hidden flex items-center justify-center">
      {/* Geometric patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-veylo-white/20 to-transparent" />
        <div className="absolute top-20 right-20 text-veylo-white/5 text-[200px] font-bold tracking-wider -rotate-90">
          VEYLO
        </div>
        <div className="absolute top-10 right-10 text-veylo-white/30 text-2xl">
          ///
        </div>
      </div>

      <div className="relative z-10 text-center px-4">
        <FadeIn>
          {/* Logo */}
          <div className="mb-8">
            <div className="inline-block">
              <h1 className="text-6xl md:text-8xl font-bold text-veylo-white tracking-wider">
                VEYLO
              </h1>
              <p className="text-veylo-white/80 text-sm md:text-base tracking-[0.3em] uppercase mt-2">
                Walk Your Style
              </p>
            </div>
          </div>

          {/* Badge */}
          <div className="inline-block bg-veylo-beige text-veylo-black px-6 py-2 rounded-full mb-8">
            <span className="font-bold text-sm md:text-base">PARA ÉL & PARA ELLA</span>
          </div>

          {/* Subtitle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-12 bg-veylo-white/50" />
            <p className="text-veylo-white/70 text-xs tracking-[0.2em] uppercase">
              Sneakers Collection
            </p>
            <div className="h-px w-12 bg-veylo-white/50" />
          </div>

          {/* Scroll button */}
          <button
            onClick={scrollToCatalog}
            className="animate-pulse-slow text-veylo-white hover:text-veylo-beige transition-colors"
            aria-label="Ver catálogo"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </FadeIn>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: add Hero component with geometric patterns"
```

---

## Task 10: Create CategoryFilter Component

**Files:**
- Create: `components/CategoryFilter.tsx`

- [ ] **Step 1: Create components/CategoryFilter.tsx**

```typescript
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
              ? "bg-veylo-black text-veylo-white"
              : "bg-veylo-gray-light text-veylo-black hover:bg-veylo-gray-text/20"
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Add scrollbar-hide utility to globals.css**

Edit: `app/globals.css`

Add at the end:

```css
@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add components/CategoryFilter.tsx app/globals.css
git commit -m "feat: add CategoryFilter component with horizontal scroll"
```

---

## Task 11: Create ProductCard Component

**Files:**
- Create: `components/ProductCard.tsx`

- [ ] **Step 1: Create components/ProductCard.tsx**

```typescript
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { StaggerIn } from "./ui/animations";
import { buildWhatsAppURL, type Product } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  const handleWhatsAppClick = () => {
    if (selectedSize) {
      const url = buildWhatsAppURL(product, selectedSize);
      window.open(url, "_blank");
    }
  };

  return (
    <StaggerIn delay={index * 100}>
      <Card className="overflow-hidden group">
        <CardContent className="p-0">
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden bg-veylo-gray-light">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Badge */}
            {product.code && (
              <div className="absolute top-3 left-3 bg-veylo-white/90 backdrop-blur-sm px-3 py-1 rounded-md">
                <span className="text-xs font-medium text-veylo-black">{product.code}</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Style */}
            {product.style && (
              <p className="text-xs text-veylo-gray-text uppercase tracking-wider">
                Estilo: <span className="font-semibold text-veylo-black">{product.style}</span>
              </p>
            )}

            {/* Name */}
            <h3 className="font-semibold text-veylo-black">{product.name}</h3>

            {/* Price */}
            <div>
              <p className="text-xs text-veylo-gray-text uppercase">Precio</p>
              <p className="text-xl font-bold text-veylo-black">
                ${product.price.toLocaleString()}
              </p>
            </div>

            {/* Sizes */}
            <div>
              <p className="text-xs text-veylo-gray-text uppercase mb-2">Tallas Disponibles</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "w-10 h-10 rounded-md border text-sm font-medium transition-colors",
                      selectedSize === size
                        ? "bg-veylo-black text-veylo-white border-veylo-black"
                        : "bg-veylo-white text-veylo-black border-veylo-gray-light hover:border-veylo-black"
                    )}
                    aria-label={`Talla ${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-2">
                {product.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full border border-veylo-gray-light"
                    title={color}
                  />
                ))}
                <span className="text-xs text-veylo-gray-text uppercase">
                  {product.colors.join(" / ")}
                </span>
              </div>
            )}

            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsAppClick}
              disabled={!selectedSize}
              className={cn(
                "w-full flex items-center justify-center gap-2 py-3 rounded-full font-medium transition-colors",
                selectedSize
                  ? "bg-veylo-black text-veylo-white hover:bg-veylo-gray-text"
                  : "bg-veylo-gray-light text-veylo-gray-text cursor-not-allowed"
              )}
              aria-label={selectedSize ? "Pedir por WhatsApp" : "Selecciona una talla"}
            >
              <MessageCircle className="w-4 h-4" />
              {selectedSize ? "Pedir por WhatsApp" : "Selecciona una talla"}
            </button>
          </div>
        </CardContent>
      </Card>
    </StaggerIn>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ProductCard.tsx
git commit -m "feat: add ProductCard component with size selector and WhatsApp integration"
```

---

## Task 12: Create ProductGrid Component

**Files:**
- Create: `components/ProductGrid.tsx`

- [ ] **Step 1: Create components/ProductGrid.tsx**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add components/ProductGrid.tsx
git commit -m "feat: add ProductGrid component with category filtering"
```

---

## Task 13: Create BenefitsSection Component

**Files:**
- Create: `components/BenefitsSection.tsx`

- [ ] **Step 1: Create components/BenefitsSection.tsx**

```typescript
import React from "react";
import { Shoe, Layers, Shield, Users } from "lucide-react";
import { FadeIn } from "./ui/animations";

const benefits = [
  {
    icon: Shoe,
    title: "DISEÑOS EXCLUSIVOS",
    description: "Estilo único para cada outfit.",
  },
  {
    icon: Layers,
    title: "MÁXIMA COMODIDAD",
    description: "Materiales de alta calidad.",
  },
  {
    icon: Shield,
    title: "RESISTENCIA PREMIUM",
    description: "Hechos para durar cada paso.",
  },
  {
    icon: Users,
    title: "PARA ÉL & PARA ELLA",
    description: "Modelos versátiles que combinan contigo.",
  },
];

export function BenefitsSection() {
  return (
    <section className="bg-veylo-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <FadeIn key={index} delay={index * 100}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-veylo-white/10 mb-4">
                  <benefit.icon className="w-8 h-8 text-veylo-white" />
                </div>
                <h3 className="text-veylo-white font-bold uppercase tracking-wider mb-2">
                  {benefit.title}
                </h3>
                <p className="text-veylo-white/70 text-sm">{benefit.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/BenefitsSection.tsx
git commit -m "feat: add BenefitsSection component with 4 benefit columns"
```

---

## Task 14: Create Footer Component

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create components/Footer.tsx**

```typescript
import React from "react";
import { ShoppingBag, MessageCircle, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-veylo-gray-light py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Block 1: Bag with logo */}
          <div className="flex items-center justify-center">
            <div className="bg-veylo-black p-4 rounded-lg">
              <ShoppingBag className="w-12 h-12 text-veylo-white" />
            </div>
          </div>

          {/* Block 2: Brand tagline */}
          <div className="text-center">
            <h3 className="text-veylo-black font-bold text-lg mb-2">VEYLO</h3>
            <div className="space-y-1 text-veylo-black/70 text-sm uppercase tracking-wider">
              <p>Walk Your Style</p>
              <p>Own Every Step</p>
              <p>Be Different</p>
            </div>
          </div>

          {/* Block 3: WhatsApp */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MessageCircle className="w-5 h-5 text-veylo-black" />
              <span className="font-bold text-veylo-black">PEDIDOS</span>
            </div>
            <p className="text-veylo-black/70">310 546 9406</p>
          </div>

          {/* Block 4: Social */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-2">
              <Instagram className="w-5 h-5 text-veylo-black" />
              <Youtube className="w-5 h-5 text-veylo-black" />
            </div>
            <p className="text-veylo-black/70 text-sm">@veylo.sneakers</p>
          </div>
        </div>

        {/* QR Code */}
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

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-veylo-gray-text/20 text-center">
          <p className="text-veylo-black/50 text-sm">
            © {new Date().getFullYear()} VEYLO. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add Footer component with contact info and social links"
```

---

## Task 15: Assemble Main Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Update app/page.tsx**

```typescript
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { BenefitsSection } from "@/components/BenefitsSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ProductGrid />
      <BenefitsSection />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble main page with all components"
```

---

## Task 16: Create README and Vercel Config

**Files:**
- Create: `README.md`
- Create: `vercel.json`

- [ ] **Step 1: Create README.md**

```markdown
# VEYLO Sneaker Store

Tienda online de zapatos desplegable en Vercel.

## Stack

- Next.js 14 (App Router)
- Tailwind CSS
- TypeScript
- cult-ui components (copy-paste)

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar número de WhatsApp:
Edita `/lib/whatsapp.ts` y reemplaza el número si es necesario.

3. Ejecutar en desarrollo:
```bash
npm run dev
```

## Deploy en Vercel

1. Sube tu código a GitHub
2. Conecta tu repositorio a Vercel
3. Deploy automático

O usa CLI:
```bash
vercel deploy
```

## Estructura del proyecto

```
├── app/              # Next.js App Router
├── components/       # Componentes React
├── data/            # Datos de productos
├── lib/             # Utilidades y helpers
└── public/shoes/    # Imágenes de productos
```

## Personalización

- **Productos:** Edita `/data/products.ts`
- **Colores:** Edita `tailwind.config.ts`
- **WhatsApp:** Edita `/lib/whatsapp.ts`
```

- [ ] **Step 2: Create vercel.json**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```

- [ ] **Step 3: Commit**

```bash
git add README.md vercel.json
git commit -m "docs: add README and Vercel config"
```

---

## Task 17: Final Verification

**Files:**
- Test: All components

- [ ] **Step 1: Run development server**

Run: `npm run dev`

Expected: Server starts on http://localhost:3000

- [ ] **Step 2: Verify all images load**

Open: http://localhost:3000

Expected: All 10 product images display correctly

- [ ] **Step 3: Test category filtering**

Click on different category pills

Expected: Products filter instantly without page reload

- [ ] **Step 4: Test size selection**

Click on a size button in a product card

Expected: Size button turns black, WhatsApp button becomes enabled

- [ ] **Step 5: Test WhatsApp integration**

Click "Pedir por WhatsApp" with a size selected

Expected: Opens WhatsApp with correct message format

- [ ] **Step 6: Test responsive design**

Resize browser to 375px, 768px, 1280px+

Expected: Layout adapts correctly (1/2/3-4 columns)

- [ ] **Step 7: Test animations**

Scroll through the page

Expected: Stagger reveal animations on product cards, fade-in on sections

- [ ] **Step 8: Test accessibility**

Tab through interactive elements

Expected: All buttons have focus states, images have alt text

- [ ] **Step 9: Build for production**

Run: `npm run build`

Expected: Build completes without errors

- [ ] **Step 10: Final commit**

```bash
git add .
git commit -m "feat: complete VEYLO sneaker store implementation"
```

---

## Task 18: Git Initialization

**Files:**
- Create: `.gitignore`

- [ ] **Step 1: Create .gitignore**

```text
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

- [ ] **Step 2: Initialize git repository**

Run: `git init`

Expected: Git repository initialized

- [ ] **Step 3: Add all files**

Run: `git add .`

Expected: All files staged

- [ ] **Step 4: Initial commit**

Run: `git commit -m "chore: initial commit with .gitignore"`

Expected: Commit created

---

## Summary

This implementation plan creates a complete, production-ready e-commerce landing page for VEYLO sneaker store with:

- ✅ Next.js 14 with App Router
- ✅ Tailwind CSS with custom VEYLO color palette
- ✅ TypeScript strict mode
- ✅ cult-ui components (card, grid, animations)
- ✅ 10 products with placeholder data
- ✅ Category filtering without page reload
- ✅ Size selection required before WhatsApp
- ✅ WhatsApp integration with pre-filled messages
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Animations and hover effects
- ✅ Accessibility features
- ✅ Ready for Vercel deployment

Total tasks: 18
Estimated time: 2-3 hours
