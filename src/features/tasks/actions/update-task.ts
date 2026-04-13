import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Task, TaskDB, UpdateTaskInput } from "../types";
import { mapTaskDBToTask } from "../mapper";
import { formatSupabaseError } from "@/lib/supabase-error";

export const updateTaskRepo = async (
  taskId: string,
  updates: UpdateTaskInput,
): Promise<Task> => {
  const supabase = await createSupabaseServerClient();

  const dataToSend: Partial<TaskDB> = {};

  if (updates.projectId !== undefined)
    dataToSend.project_id = updates.projectId;
  if (updates.creatorId !== undefined)
    dataToSend.creator_id = updates.creatorId;
  if (updates.assgineeId !== undefined)
    dataToSend.assignee_id = updates.assgineeId; //
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
    .returns<TaskDB>()
    .single();

  if (error) {
    throw new Error(`Error updating task: ${formatSupabaseError(error)}`);
  }
  return mapTaskDBToTask(data);
};
