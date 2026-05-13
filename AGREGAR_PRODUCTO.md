# Guía Rápida: Agregar Nuevos Productos

## Pasos para agregar un nuevo zapato

### 1. Preparar la imagen
- Coloca la imagen en `public/shoes/`
- Usa un nombre único (ej: `13.jpeg`, `14.jpeg`, etc.)
- Formatos recomendados: JPEG, PNG, WebP

### 2. Usar el script (método fácil)

```powershell
.\add-product.ps1 -Nombre "Sneaker Azul" -Precio 195000 -Categoria "deportivo" -Imagen "13.jpeg"
```

El script generará el código listo para copiar y pegar.

### 3. Agregar manualmente (método manual)

Abre `data/products.ts` y agrega este objeto al array:

```typescript
{
  id: "sneaker-azul-navy",
  name: "Sneaker Azul Navy",
  price: 195000,
  category: "deportivo",
  sizes: [36, 37, 38, 39, 40, 41, 42],
  image: "/shoes/13.jpeg",
  featured: false,
  code: "667B🔵",
  style: "NAVY BLUE",
  colors: ["AZUL", "BLANCO"],
},
```

### 4. Ver los cambios

```bash
npm run dev
```

## Campos del producto

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | ID único (usa guiones, sin espacios) |
| `name` | string | Nombre visible del producto |
| `price` | number | Precio en COP |
| `category` | string | Categoría: hombre, mujer, niños, deportivo, casual, formal |
| `sizes` | number[] | Array de tallas disponibles |
| `image` | string | Ruta de la imagen (debe empezar con `/shoes/`) |
| `featured` | boolean | true para destacados, false para normal |
| `code` | string (opcional) | Código del producto |
| `style` | string (opcional) | Estilo del producto |
| `colors` | string[] (opcional) | Array de colores disponibles |

## Colores disponibles

Los siguientes colores ya tienen un color visual asignado:

- **Neutros:** GRIS, NEGRO, PLATA, CREMA, BLANCO
- **Vibrantes:** ROJO, AZUL, VERDE, DORADO, MORADO
- **Especiales:** BORDADOS

Para agregar un nuevo color, edita `components/ProductCard.tsx`:

```typescript
const colorMap: Record<string, string> = {
  // ... colores existentes ...
  "NUEVO_COLOR": "#HEXCOLOR", // Agrega aquí
};
```

## Ejemplos de uso

### Zapato deportivo destacado
```typescript
{
  id: "sneaker-deportivo",
  name: "Sneaker Deportivo Pro",
  price: 250000,
  category: "deportivo",
  sizes: [36, 37, 38, 39, 40, 41, 42, 43],
  image: "/shoes/14.jpeg",
  featured: true,
  code: "PRO-001",
  style: "DEPORTIVO PRO",
  colors: ["NEGRO", "ROJO"],
}
```

### Zapato casual simple
```typescript
{
  id: "sneaker-casual",
  name: "Sneaker Casual",
  price: 180000,
  category: "casual",
  sizes: [36, 37, 38, 39, 40, 41],
  image: "/shoes/15.jpeg",
  featured: false,
}
```

## Tips

- Usa IDs descriptivos pero cortos
- El precio debe ser en números (sin formato)
- Las tallas deben ser números, no strings
- La ruta de la imagen debe empezar con `/shoes/`
- Usa `featured: true` solo para productos destacados
