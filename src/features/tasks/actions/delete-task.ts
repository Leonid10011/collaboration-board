import { formatSupabaseError } from "@/lib/supabase-error";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const supabase = await createSupabaseServerClient();

export const deleteTaskRepo = async (taskId: string): Promise<void> => {
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);

  if (error) {
    throw new Error(`Error deleting task: ${formatSupabaseError(error)}`);
  }
};
