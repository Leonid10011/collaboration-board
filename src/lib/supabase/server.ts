import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
// 1. Importiere das generierte Database-Interface
import { Database } from "@/lib/database.types";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  // 2. Übergib <Database> an die Funktion
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch (error) {
            console.error("Error setting cookies:", error);
          }
        },
      },
    },
  );
}
