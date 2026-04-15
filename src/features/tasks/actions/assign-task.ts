"use server";

import { IdSchema } from "@/global-schema";
import { updateTaskRepo } from "../data/update-task";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function assignTaskAction(taskId: string, assigneeId: string) {
  const parsedTaskId = IdSchema.safeParse(taskId);
  if (!parsedTaskId.success) throw new Error(parsedTaskId.error.message);

  const parsedAssigneeId = IdSchema.safeParse(assigneeId);
  if (!parsedAssigneeId.success)
    throw new Error(parsedAssigneeId.error.message);

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const updatedTask = await updateTaskRepo(parsedTaskId.data, {
    assignee_id: parsedAssigneeId.data,
  });

  revalidatePath("/");

  return updatedTask;
}
