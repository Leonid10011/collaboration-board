import { formatSupabaseError } from "@/lib/supabase-error";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const deleteTaskRepo = async (id: string): Promise<void> => {
  const supabase = await createSupabaseServerClient();

  const { error, count } = await supabase
    .from("tasks")
    .delete({ count: "exact" })
    .eq("id", id);

  if (error) {
    throw new Error(`Error deleting task: ${formatSupabaseError(error)}`);
  }

  if (count === 0) {
    throw new Error("Task not found");
  }
};
