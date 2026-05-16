import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Admin Login",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // En un entorno real, usarías una DB y bcrypt. 
        // Para simplicidad y siguiendo el plan gratuito sin gestión de usuarios compleja:
        if (credentials?.password === process.env.ADMIN_PASSWORD) {
          return { id: "1", name: "Admin VEYLO" };
        }
        return null;
      },
    }),
  ],
  /* pages: {
    signIn: "/login",
  }, */
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      
      if (isOnAdmin) {
        if (isLoggedIn) return true;
        return false; // Redirigir a login
      }
      return true;
    },
  },
});
