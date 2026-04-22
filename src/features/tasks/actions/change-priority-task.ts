"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { UpdateTaskSchema } from "../schema";
import { TaskPriority } from "../types";
import { updateTaskRepo } from "../data/update-task";
import { revalidatePath } from "next/cache";
import { getTaskProjectId } from "../queries/get-task-project-id";

export async function changeTaskPriorityAction(
  taskId: string,
  priority: TaskPriority,
) {
  const parsed = UpdateTaskSchema.safeParse({ priority });
  if (!parsed.success) throw new Error(parsed.error.message);

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const result = await updateTaskRepo(taskId, parsed.data);

  const projectId = await getTaskProjectId(taskId);

  revalidatePath(`/projects/${projectId}`);

  return result;
}
