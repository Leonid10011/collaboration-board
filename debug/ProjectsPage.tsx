import { createSupabaseServerClient } from "@/db/supabase/supabase-server";

export default async function ProjectsPage() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.from("projects").select("*");

  console.log({ data, error });
  return <pre>{JSON.stringify({ data, error }, null, 2)}</pre>;
}
