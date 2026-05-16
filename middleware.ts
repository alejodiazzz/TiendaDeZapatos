import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnAdmin = req.nextUrl.pathname.startsWith("/admin");

  if (isOnAdmin && !isLoggedIn) {
    // Forzamos la URL de redirección usando el host de la petición actual
    const loginUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
