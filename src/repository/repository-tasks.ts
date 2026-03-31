import { createSupabaseBrowserClient } from "@/db/supabase/supabase-client";
import { TaskDB } from "@/db/supabase/task-db";
import { mapTaskDBToTask } from "@/db/supabase/task-mapper";
import { Task } from "@/domain/tasks";

const supabase = createSupabaseBrowserClient();

export const getTasksByProjectId = async (
  projectId: string,
): Promise<Task[]> => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("project_id", projectId)
    .limit(10)
    .returns<TaskDB[]>();

  if (error) {
    throw new Error("Error fetching task data from db.");
  }

  try {
    const validation = data.map((t) => mapTaskDBToTask(t));

    return validation;
  } catch (error) {
    if (error instanceof Error) throw error;
    else throw new Error("Unkown Error processing data from db.");
  }
};

export const insertTask = async (task: Task): Promise<Task> => {
  const dataToSend = {
    project_id: task.projectId,
    creator_id: task.creatorId,
    assignee_id: task.assgineeId || null,
    title: task.title,
    description: task.description || null,
    status: task.status,
    priority: task.priority,
  };

  const { data, error } = await supabase
    .from("tasks")
    .insert(dataToSend)
    .select()
    .returns<TaskDB>()
    .single();

  if (error) {
    throw new Error(
      `Error inserting task: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  return mapTaskDBToTask(data);
};
