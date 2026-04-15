import { createSupabaseServerClient } from "@/lib/supabase/server";
import { TaskSchema } from "../schema";
import { TaskSupabaseUpdate, UpdateTaskDetailsPayload } from "../types";
import { updateTaskRepo } from "../data/update-task";
import { revalidatePath } from "next/cache";

export async function updateTaskAction(
  taskId: string,
  input: UpdateTaskDetailsPayload,
) {
  const parsed = TaskSchema.safeParse(input);

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const supabaseUpdate: TaskSupabaseUpdate = {
    title: parsed.data.title,
    description: parsed.data.description,
    status: parsed.data.status,
    priority: parsed.data.priority,
  };

  const result = await updateTaskRepo(taskId, supabaseUpdate);

  revalidatePath("/");

  return result;
}
