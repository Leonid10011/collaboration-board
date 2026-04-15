import { createSupabaseServerClient } from "@/lib/supabase/server";
import { formatSupabaseError } from "@/lib/supabase-error";

export async function getTaskProjectId(taskId: string): Promise<string> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("tasks")
    .select("project_id")
    .eq("id", taskId)
    .single();

  if (error) {
    throw new Error(
      `Error fetching task project id: ${formatSupabaseError(error)}`,
    );
  }

  if (!data?.project_id) {
    throw new Error("Task project id not found.");
  }

  return data.project_id;
}
