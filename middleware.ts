import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnAdmin = req.nextUrl.pathname.startsWith("/admin");

  if (isOnAdmin && !isLoggedIn) {
    // Redirigir al login usando el host dinámico de la petición
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
