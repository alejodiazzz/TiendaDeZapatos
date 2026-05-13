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

## Agregar Nuevos Productos

### Opción 1: Usar el script (Recomendado)

```powershell
.\add-product.ps1 -Nombre "Sneaker Roja" -Precio 200000 -Categoria "deportivo" -Imagen "13.jpeg"
```

Parámetros:
- `-Nombre`: Nombre del zapato (obligatorio)
- `-Precio`: Precio en COP (obligatorio)
- `-Categoria`: Categoría: hombre, mujer, niños, deportivo, casual, formal (obligatorio)
- `-Imagen`: Nombre del archivo de imagen (obligatorio)
- `-Codigo`: Código del producto (opcional)
- `-Estilo`: Estilo del producto (opcional)
- `-Colores`: Colores separados por coma (opcional)
- `-Destacado`: Marcar como destacado (opcional)

### Opción 2: Manual

1. **Agrega la imagen** a `public/shoes/` con un nombre único (ej: `13.jpeg`)

2. **Copia el template** de `data/product-template.ts`

3. **Edita los datos** del producto:
```typescript
{
  id: "sneaker-nuevo",
  name: "Nombre del Zapato",
  price: 200000,
  category: "deportivo",
  sizes: [36, 37, 38, 39, 40, 41, 42, 43],
  image: "/shoes/13.jpeg",
  featured: true,
  code: "CÓDIGO",
  style: "ESTILO",
  colors: ["COLOR1", "COLOR2"],
}
```

4. **Pégalo** en el array de `data/products.ts`

5. **Guarda** y ejecuta `npm run dev`

### Colores Disponibles

Los siguientes colores ya tienen un color visual asignado:
- GRIS, NEGRO, PLATA
- CREMA, BORDADOS
- BLANCO, ROJO, AZUL, VERDE
- DORADO, MORADO

Para agregar nuevos colores, edítalos en `components/ProductCard.tsx` en el `colorMap`.
