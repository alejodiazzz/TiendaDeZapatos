import { Product } from "@/lib/whatsapp";

/**
 * EJEMPLO DE PRODUCTO NUEVO
 *
 * Este es un ejemplo de cómo agregar un nuevo producto.
 * Copia este objeto y pégalo en el array de products en data/products.ts
 */

export const ejemploProductoNuevo: Product = {
  id: "sneaker-ejemplo-1234",
  name: "Sneaker Ejemplo",
  price: 220000,
  category: "deportivo",
  sizes: [36, 37, 38, 39, 40, 41, 42, 43],
  image: "/shoes/1.jpeg", // Asegúrate de que esta imagen exista en public/shoes/
  featured: true,
  code: "EJEMPLO",
  style: "EJEMPLO STYLE",
  colors: ["ROJO", "BLANCO"],
};
