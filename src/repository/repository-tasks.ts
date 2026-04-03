import { createSupabaseBrowserClient } from "@/db/supabase/supabase-client";
import { TaskDB } from "@/db/supabase/task-db";
import { mapTaskDBToTask } from "@/db/supabase/task-mapper";
import { CreateTaskInput, Task, UpdateTaskInput } from "@/domain/tasks";

const supabase = createSupabaseBrowserClient();

type SupabaseErrorLike = {
  code?: string;
  message?: string;
  details?: string;
  hint?: string;
};

const formatSupabaseError = (error: unknown): string => {
  if (!error || typeof error !== "object") {
    return String(error);
  }

  const e = error as SupabaseErrorLike;
  return [
    e.code ? `code=${e.code}` : null,
    e.message ? `message=${e.message}` : null,
    e.details ? `details=${e.details}` : null,
    e.hint ? `hint=${e.hint}` : null,
  ]
    .filter(Boolean)
    .join(" | ");
};

export const getTasksByProjectId = async (
  projectId: string,
): Promise<Task[]> => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: true })
    .order("id", { ascending: true })
    .limit(10)
    .returns<TaskDB[]>();

  if (error) {
    throw new Error(
      `Error fetching task data from db: ${formatSupabaseError(error)}`,
    );
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
    throw new Error(`Error inserting task: ${formatSupabaseError(error)}`);
  }

  return mapTaskDBToTask(data);
};

export const deleteTaskRepo = async (taskId: string): Promise<void> => {
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);

  if (error) {
    throw new Error(`Error deleting task: ${formatSupabaseError(error)}`);
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
    throw new Error(`Error updating task: ${formatSupabaseError(error)}`);
  }
  return mapTaskDBToTask(data);
};
