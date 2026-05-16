import { PrismaClient } from '@prisma/client';

// Copiamos los datos directamente para evitar problemas de resolución de alias @/ en el script de seed
const products = [
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
  {
    id: "sneaker-nuevo-1",
    name: "Sneaker Nueva",
    price: 220000,
    category: "deportivo",
    sizes: [36, 37, 38, 39, 40, 41, 42, 43],
    image: "/shoes/1.jpeg",
    featured: true,
    code: "NEW-001",
    style: "NEW STYLE",
    colors: ["BLANCO", "NEGRO"],
  },
];

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando migración de productos...');
  for (const p of products) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id,
        name: p.name,
        price: p.price,
        category: p.category,
        sizes: p.sizes,
        image: p.image,
        featured: p.featured,
        code: p.code,
        style: p.style,
        colors: p.colors,
      },
    });
  }
  console.log('Migración completada con éxito.');
}

main()
  .catch((e) => {
    console.error('Error durante la migración:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
