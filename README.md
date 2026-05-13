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
