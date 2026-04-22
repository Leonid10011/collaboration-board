import { InsertTaskInput, Task } from "../types";
import { formatSupabaseError } from "@/lib/supabase-error";
import { mapTaskDBToTask } from "../mapper";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const insertTaskRepo = async (task: InsertTaskInput): Promise<Task> => {
  const supabase = await createSupabaseServerClient();

  const dataToSend = {
    project_id: task.projectId,
    creator_id: task.creatorId,
    assignee_id: task.assigneeId ?? null,
    title: task.title,
    description: task.description ?? null,
    status: task.status,
    priority: task.priority,
  };

  const { data, error } = await supabase
    .from("tasks")
    .insert(dataToSend)
    .select()
    .single();

  if (error) {
    throw new Error(`Error inserting task: ${formatSupabaseError(error)}`);
  }

  return mapTaskDBToTask(data);
};
