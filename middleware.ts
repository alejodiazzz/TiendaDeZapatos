import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnAdmin = req.nextUrl.pathname.startsWith("/admin");

  if (isOnAdmin && !isLoggedIn) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    // Eliminamos los parámetros de búsqueda del callback para evitar loops si los hubiera
    url.search = `?callbackUrl=${encodeURIComponent(req.nextUrl.pathname)}`;
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
