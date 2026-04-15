"use server";

import { IdSchema } from "@/global-schema";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { updateTaskRepo } from "../data/update-task";
import { revalidatePath } from "next/cache";
import { getTaskProjectId } from "../queries/get-task-project-id";

export async function unassignTaskAction(taskId: string) {
  const parsed = IdSchema.safeParse(taskId);
  if (!parsed.success) throw new Error(parsed.error.message);

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const updatedTask = await updateTaskRepo(parsed.data, {
    assignee_id: null,
  });

  const projectId = await getTaskProjectId(taskId);

  revalidatePath(`/projects/${projectId}`);

  return updatedTask;
}
