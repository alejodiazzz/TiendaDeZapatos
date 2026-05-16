import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // Coincidir con todas las rutas excepto las que empiezan con /api, /_next, o archivos estáticos
  matcher: ["/admin/:path*"],
};
