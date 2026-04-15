"use server";

import { CreateTaskPayload } from "../types";
import { TaskSchema } from "../schema";
import { insertTaskRepo } from "../data/insert-task";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getTaskProjectId } from "../queries/get-task-project-id";

export async function createTaskAction(input: CreateTaskPayload) {
  //1. validate
  const validated = TaskSchema.safeParse(input);
  if (!validated.success) {
    throw new Error(validated.error.message);
  }
  //2. get auth user id and check auth
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  //3. call insert repo
  const task = await insertTaskRepo({
    ...validated.data,
    creatorId: user.id,
  });

  const projectId = await getTaskProjectId(task.projectId);

  revalidatePath(`/projects/${projectId}`);

  return task;
}
