import { auth, signOut } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-[family-name:var(--font-exo)]">
      <nav className="border-b border-white/10 bg-[#0a0a0a] px-6 py-4 flex justify-between items-center">
        <Link href="/admin" className="text-xl font-[family-name:var(--font-cinzel)] tracking-tighter">
          DAILUX <span className="text-xs text-gray-500 uppercase tracking-widest ml-2">Panel Admin</span>
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">Ver Tienda</Link>
          <form action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}>
            <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-1.5 rounded-full transition-all">
              Cerrar Sesión
            </button>
          </form>
        </div>
      </nav>
      <main className="p-6 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
