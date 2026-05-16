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
