"use server";
import { formatSupabaseError } from "@/lib/supabase-error";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const deleteTaskRepo = async (taskId: string): Promise<void> => {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);

  if (error) {
    throw new Error(`Error deleting task: ${formatSupabaseError(error)}`);
  }
};
