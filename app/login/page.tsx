import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export default function LoginPage() {
  async function action(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        password: formData.get("password"),
        redirectTo: "/admin",
      });
    } catch (error) {
      // Auth.js lanza un error para redirecciones, así que debemos manejarlo o dejarlo pasar
      if ((error as any).type === "CredentialsSignin") {
        return redirect("/login?error=Invalid credentials");
      }
      throw error;
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] font-[family-name:var(--font-exo)]">
      <div className="w-full max-w-md p-8 bg-[#111] rounded-2xl border border-white/10 shadow-2xl">
        <h1 className="text-3xl font-[family-name:var(--font-cinzel)] text-white text-center mb-8 tracking-wider">
          DAILUX ADMIN
        </h1>
        <form action={action} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Contraseña de Acceso</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-3 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors tracking-widest"
          >
            INGRESAR
          </button>
        </form>
      </div>
    </div>
  );
}
