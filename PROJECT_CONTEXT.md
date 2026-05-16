# DAILUX / VEYLO Sneaker Store - Project Context & Debugging Log

## 1. Descripción General
Este proyecto es una tienda de sneakers construida con **Next.js 14 (App Router)**. Ha sido migrado de una versión 100% estática a una aplicación dinámica con panel de administración completo.

### Stack Tecnológico:
- **Framework:** Next.js 14.2.3 (App Router)
- **Lenguaje:** TypeScript (Strict)
- **Base de Datos:** Supabase (PostgreSQL) vía Prisma ORM (v7.8.0)
- **Autenticación:** NextAuth.js v5 (Auth.js Beta) con Credentials Provider.
- **Imágenes:** Cloudinary (Free Tier) con `next-cloudinary`.
- **Estilos:** Tailwind CSS.

---

## 2. Configuración de Base de Datos
Se utiliza **Prisma 7**. Debido a cambios en esta versión, la configuración se divide en:
- `prisma/schema.prisma`: Define los modelos sin la URL directa.
- `prisma.config.ts`: Gestiona las conexiones usando `SUPABASE_DATABASE_URL` (Pooler) y `DIRECT_URL` (Migraciones).
- **Variable Crítica:** Se renombró la variable de conexión a `SUPABASE_DATABASE_URL` para evitar conflictos con variables de entorno globales de Windows (como `DATABASE_URL` de Neon) que estaban sobrescribiendo el `.env`.

---

## 3. Problema Actual: 404 NOT_FOUND en Vercel
A pesar de que el proyecto funciona correctamente en el entorno de desarrollo local (`npm run dev`), al desplegar en Vercel, todas las rutas nuevas devuelven un error **404 NOT_FOUND**.

### Rutas Afectadas:
- `/admin`
- `/login`
- `/api/auth/*` (NextAuth endpoints)

### Observaciones:
- El build en Vercel termina con éxito (`Compiled successfully`).
- Las carpetas existen en el repositorio remoto (`app/admin`, `app/login`, `app/api/auth`).
- Localmente, las rutas responden correctamente (HTTP 200).

---

## 4. Soluciones Intentadas (Historial de Debugging)
Para intentar solucionar el 404 en Vercel, se realizaron las siguientes acciones:

1.  **Corrección de nombres de carpetas:** Se renombró la carpeta de rutas dinámicas de `%5Bid%5D` (error de codificación) a `[id]`.
2.  **Generación de Prisma en Build:** Se actualizó el script de build a `prisma generate && next build`.
3.  **Configuración de Vercel:** Se eliminó `vercel.json` para permitir que Vercel use la detección automática de Next.js.
4.  **Migración de Carpeta `src/`:** Se movió todo el código a una carpeta `src/` y luego se regresó a la raíz para intentar forzar una limpieza de caché en Vercel.
5.  **Pruebas de Autenticación:** 
    - Se desactivó la página de login personalizada para usar la de defecto de NextAuth (siguió dando 404).
    - Se eliminó temporalmente el `middleware.ts` para descartar bloqueos por seguridad (siguió dando 404).
6.  **Variables de Entorno en Vercel:** Se configuraron todas las variables necesarias, incluyendo `NEXTAUTH_URL` apuntando al dominio de producción y `AUTH_TRUST_HOST=true`.

---

## 5. Arquitectura de Archivos (Estado Actual)
```text
/
├── app/
│   ├── admin/          # Panel de administración (Protegido)
│   ├── api/auth/       # Endpoints de NextAuth
│   ├── login/          # Página de login personalizada
│   ├── layout.tsx
│   └── page.tsx        # Home (ahora consume de Prisma)
├── components/         # Componentes UI y Admin
├── lib/
│   ├── prisma.ts       # Singleton del cliente Prisma con adaptador PG
│   └── utils.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts         # Script para migrar datos de productos
├── auth.ts             # Configuración central de NextAuth v5
├── middleware.ts       # Protección de rutas /admin
├── prisma.config.ts    # Configuración de Prisma 7
└── tsconfig.json       # Path alias configurado: @/* -> ./*
```

---

## 6. Pendientes y Recomendaciones para Futura IA
El problema parece ser una desconexión entre el **Build Output** de Vercel y el servidor de funciones. 
- **Hipótesis 1:** La versión de Next.js (14.2.3) tiene algún bug de ruteo con el App Router en despliegues específicos de Vercel.
- **Hipótesis 2:** Hay un conflicto de caché persistente en Vercel que no se limpia con nuevos despliegues.
- **Hipótesis 3:** El uso de Prisma 7 (muy reciente) requiere una configuración de despliegue específica que no estamos aplicando (como el uso de `output: 'standalone'` en `next.config.mjs`).

**Instrucción para el siguiente paso:** Revisar los logs de ejecución de Vercel (Runtime Logs) para ver si hay errores al intentar resolver las rutas `/api/auth`.
