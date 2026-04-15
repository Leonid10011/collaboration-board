"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { UpdateTaskSchema } from "../schema";
import { TaskStatus } from "../types";
import { updateTaskRepo } from "../data/update-task";
import { revalidatePath } from "next/cache";

export async function changeTaskStatusAction(
  taskId: string,
  status: TaskStatus,
) {
  const parsed = UpdateTaskSchema.safeParse({ status });
  if (!parsed.success) throw new Error(parsed.error.message);

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const result = await updateTaskRepo(taskId, parsed.data);

  revalidatePath("/");

  return result;
}
