import { createSupabaseBrowserClient } from "@/db/supabase/supabase-client";
import { TaskDB } from "@/db/supabase/task-db";
import { mapTaskDBToTask } from "@/db/supabase/task-mapper";
import { CreateTaskInput, Task, UpdateTaskInput } from "@/domain/tasks";

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

export const insertTaskRepo = async (task: CreateTaskInput): Promise<Task> => {
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

export const deleteTaskRepo = async (taskId: string): Promise<void> => {
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);

  if (error) {
    throw new Error(
      `Error deleting task: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

export const updateTaskRepo = async (
  taskId: string,
  updates: UpdateTaskInput,
): Promise<Task> => {
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
    throw new Error(
      `Error updating task: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
  return mapTaskDBToTask(data);
};
