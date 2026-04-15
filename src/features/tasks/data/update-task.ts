import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Task, TaskDB, TaskSupabaseUpdate } from "../types";
import { mapTaskDBToTask } from "../mapper";
import { formatSupabaseError } from "@/lib/supabase-error";

export const updateTaskRepo = async (
  taskId: string,
  updates: TaskSupabaseUpdate,
): Promise<Task> => {
  const supabase = await createSupabaseServerClient();

  const dataToSend: TaskSupabaseUpdate = {};

  if (updates.project_id !== undefined)
    dataToSend.project_id = updates.project_id;
  if (updates.creator_id !== undefined)
    dataToSend.creator_id = updates.creator_id;
  if (updates.assignee_id !== undefined)
    dataToSend.assignee_id = updates.assignee_id; //
  if (updates.title !== undefined) dataToSend.title = updates.title;
  if (updates.description !== undefined)
    dataToSend.description = updates.description; //
  if (updates.status !== undefined) dataToSend.status = updates.status;
  if (updates.priority !== undefined) dataToSend.priority = updates.priority;

  const { data, error } = await supabase
    .from("tasks")
    .update(dataToSend)
    .eq("id", taskId)
    .select()
    .single();

  if (error) {
    throw new Error(`Error updating task: ${formatSupabaseError(error)}`);
  }
  return mapTaskDBToTask(data);
};
