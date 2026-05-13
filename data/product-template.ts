import { Product } from "@/lib/whatsapp";

/**
 * TEMPLATE PARA AGREGAR NUEVOS PRODUCTOS
 *
 * Copia este objeto y agrégalo al array de productos en products.ts
 *
 * INSTRUCCIONES:
 * 1. Agrega la imagen a public/shoes/ con un nombre único (ej: 13.jpeg)
 * 2. Copia este template y rellena los datos
 * 3. Pégalo en el array de products en data/products.ts
 */

export const newProductTemplate: Product = {
  id: "sneaker-nuevo", // ID único (sin espacios, usa guiones)
  name: "Nombre del Zapato", // Nombre visible
  price: 200000, // Precio en COP
  category: "deportivo", // "hombre" | "mujer" | "niños" | "deportivo" | "casual" | "formal"
  sizes: [36, 37, 38, 39, 40, 41, 42, 43], // Tallas disponibles
  image: "/shoes/13.jpeg", // Ruta de la imagen (debe existir en public/shoes/)
  featured: true, // true para mostrar en destacados, false para normal
  code: "CÓDIGO", // Código del producto (opcional)
  style: "ESTILO", // Estilo del producto (opcional)
  colors: ["COLOR1", "COLOR2"], // Colores disponibles (opcional)
};

/**
 * COLORES DISPONIBLES PARA EL MAPA DE COLORES
 *
 * Estos colores ya tienen un color visual asignado en ProductCard.tsx
 *
 * Colores disponibles:
 * - GRIS, NEGRO, PLATA
 * - CREMA, BORDADOS
 * - BLANCO, ROJO, AZUL, VERDE
 * - DORADO, MORADO
 *
 * Si necesitas un nuevo color, agrégalo al colorMap en components/ProductCard.tsx
 */
