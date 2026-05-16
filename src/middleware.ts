export { auth as middleware } from "@/auth";

export const config = {
  // Coincidir con todas las rutas excepto las que empiezan con /api, /_next, o archivos estáticos
  matcher: ["/admin/:path*"],
};
