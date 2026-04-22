"use server";

import { IdSchema } from "@/global-schema";
import { deleteTaskRepo } from "../data/delete-task";
import { createSupabaseServerClient } from "@/db/supabase/supabase-server";
import { revalidatePath } from "next/cache";
import { getTaskProjectId } from "../queries/get-task-project-id";

export const deleteTaskAction = async (taskId: string): Promise<void> => {
  const validated = IdSchema.safeParse(taskId);

  if (!validated.success) {
    throw new Error(validated.error.message);
  }

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  await deleteTaskRepo(taskId);

  const projectId = await getTaskProjectId(taskId);

  revalidatePath(`/projects/${projectId}`);
};
