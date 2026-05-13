# VEYLO Sneaker Store - Design Specification

**Date:** 2026-05-12
**Project:** VentaDeZapatos - E-commerce Landing Page
**Brand:** VEYLO
**WhatsApp:** +57 3105469406

---

## Overview

A production-ready e-commerce landing page for VEYLO sneaker store, built with Next.js 14, Tailwind CSS, and TypeScript. The site features a premium, minimalist aesthetic inspired by streetwear brands, with WhatsApp-based ordering.

---

## 1. Project Structure

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

## 2. Component Specifications

### 2.1 Navbar
- **Position:** Fixed, transparent with blur backdrop
- **Content:**
  - Logo "VEYLO" centered
  - "WALK YOUR STYLE" tagline below logo
  - Cart icon (decorative) on right
  - "Contáctanos" CTA button linking to WhatsApp
- **Responsive:** Hamburger menu on mobile

### 2.2 Hero
- **Background:** Black (#000000) with geometric diagonal patterns
- **Content:**
  - "VEYLO" logo centered, white
  - "WALK YOUR STYLE" tagline (uppercase, wide tracking)
  - "SNEAKERS COLLECTION" subtitle with horizontal lines
  - "PARA ÉL & PARA ELLA" badge (beige pill, rounded)
  - Scroll-to-catalog button with arrow icon
- **Height:** Full viewport height (min-h-screen)

### 2.3 CategoryFilter
- **Layout:** Horizontal scrollable pills
- **Categories:** Todos, Hombre, Mujer, Niños, Deportivo, Casual, Formal
- **States:**
  - Active: black background, white text
  - Inactive: gray background, black text
- **Behavior:** Instant filter without page reload

### 2.4 ProductCard
- **Background:** White, rounded corners, subtle shadow
- **Content:**
  - Product image (next/image, fill, object-cover)
  - Badge with product code (top-left, white pill)
  - Style description (uppercase, gray)
  - Price (bold, large, black)
  - Size selector (pill buttons, required before WhatsApp)
  - Color swatches (circles)
  - "Pedir por WhatsApp" button
- **Interactions:**
  - 3D tilt on hover (cult-ui)
  - Size selection visual feedback
  - WhatsApp button disabled until size selected

### 2.5 BenefitsSection
- **Background:** Black (#000000)
- **Layout:** 4 columns with vertical dividers
- **Content per column:**
  - Icon (white lineal)
  - Uppercase bold title
  - Small description
- **Columns:**
  1. DISEÑOS EXCLUSIVOS - "Estilo único para cada outfit."
  2. MÁXIMA COMODIDAD - "Materiales de alta calidad."
  3. RESISTENCIA PREMIUM - "Hechos para durar cada paso."
  4. PARA ÉL & PARA ELLA - "Modelos versátiles que combinan contigo."

### 2.6 Footer
- **Background:** Light beige (#EAEAEA)
- **Layout:** 4 blocks (stacked on mobile)
- **Blocks:**
  1. Black bag with VEYLO logo
  2. Brand tagline: "WALK YOUR STYLE / OWN EVERY STEP / BE DIFFERENT"
  3. WhatsApp info with icon and number
  4. Social icons (Instagram, TikTok) with @veylo.sneakers
- **QR Code:** Bottom-right corner with "ESCANEA PARA VER MÁS MODELOS"

---

## 3. Data & State Management

### 3.1 Product Data Structure

```typescript
interface Product {
  id: string;           // slug from filename
  name: string;        // descriptive name
  price: number;       // in COP
  category: "hombre" | "mujer" | "niños" | "deportivo" | "casual" | "formal";
  sizes: number[];     // available sizes
  image: string;       // /shoes/[filename]
  featured: boolean;
  code?: string;       // product badge code
  style?: string;      // style description
  colors?: string[];   // color names
}
```

### 3.2 State Management

| Component | State | Type | Purpose |
|-----------|-------|------|---------|
| ProductGrid | category | string | Current filter selection |
| ProductCard | selectedSize | number \| null | Selected size for WhatsApp |
| Navbar | mobileMenuOpen | boolean | Mobile menu toggle |

### 3.3 WhatsApp Integration

**Single source of truth:** `WHATSAPP_NUMBER = '573105469406'` in `/lib/whatsapp.ts`

**Message template:**
```
"Hola, me interesa el [product.name] en talla [size || 'a consultar'], precio $[product.price]. ¿Está disponible?"
```

**Behavior:** Opens in new tab with `target="_blank"`

---

## 4. Styling & Theming

### 4.1 Color Palette

```typescript
colors: {
  black: '#000000',
  white: '#FFFFFF',
  beige: '#D8C19A',
  'gray-light': '#EAEAEA',
  'gray-text': '#666666',
}
```

### 4.2 Typography

- **Primary:** Exo 2 (geometric sans-serif)
- **Fallback:** system sans-serif
- **Weights:** 400, 500, 700
- **Usage:**
  - Headings: Uppercase, tracking-wide
  - Body: Normal case
  - Prices: Bold, large

### 4.3 Tailwind Config Extensions

```typescript
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
  },
}
```

### 4.4 Responsive Breakpoints

| Device | Width | Grid Columns |
|--------|-------|--------------|
| Mobile | 375px+ | 1 column |
| Tablet | 768px+ | 2 columns |
| Desktop | 1280px+ | 3-4 columns |

---

## 5. Interactivity & Animations

### 5.1 User Interactions

| Interaction | Behavior |
|-------------|----------|
| Category filtering | Instant filter without page reload |
| Size selection | Click to select, visual feedback (black background) |
| WhatsApp button | Disabled with tooltip "Selecciona una talla" until size selected |
| Scroll to catalog | Smooth scroll to product section |

### 5.2 Animation Strategy

**From cult-ui:**
- Stagger reveal on product cards
- 3D tilt hover effects on cards
- Smooth transitions for filtering

**CSS animations:**
- Fade-in on page load
- Scroll-to-catalog button pulse

### 5.3 Accessibility

- Alt text on all images
- Aria-labels on buttons
- Keyboard navigation for size selector
- Focus states on interactive elements

---

## 6. Technical Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript (strict mode)
- **UI Components:** shadcn/ui base + cult-ui (copy-paste)
- **Images:** next/image with WebP optimization
- **Deployment:** Vercel

---

## 7. Constraints & Requirements

### MUST
- Single repository ready for `git push` + `vercel deploy`
- Images served with next/image (no `<img>` tags)
- WhatsApp number as constant in `/lib/whatsapp.ts` (single source)
- TypeScript strict mode on all components
- No backend, no database — static from `/data/products.ts`
- Accessibility: alt text, aria-labels

### NEVER
- Install cult-ui as npm package — only copy-paste source code
- Use `<img>` directly — always next/image
- Hardcode WhatsApp number in multiple places
- Block WhatsApp button without clear visual feedback
- Use generic fonts (Inter, Roboto, Arial)

---

## 8. Deployment Instructions

1. `npm install` — Install dependencies
2. Edit `/lib/whatsapp.ts` — Replace WhatsApp number if needed
3. `vercel deploy` or push to main branch

---

## 9. Success Criteria

- [ ] All 10 product images display correctly
- [ ] Category filtering works without page reload
- [ ] Size selection required before WhatsApp button
- [ ] WhatsApp opens with correct message format
- [ ] Responsive on mobile (375px), tablet (768px), desktop (1280px+)
- [ ] Animations and hover effects match reference design
- [ ] Accessibility standards met
- [ ] Deployable to Vercel without errors
