"use server";

import { CreateTaskPayload } from "../types";
import { TaskSchema } from "../schema";
import { insertTaskRepo } from "../data/insert-task";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function createTaskAction(input: CreateTaskPayload) {
  //1. validate
  const validated = TaskSchema.safeParse(input);
  if (!validated.success) {
    throw new Error(validated.error.message);
  }
  //2. get auth user id
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

  revalidatePath("/");

  return task;
}
