"use server";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { CreateTaskInput, Task, TaskDB } from "../types";
import { formatSupabaseError } from "@/lib/supabase-error";
import { mapTaskDBToTask } from "../mapper";

const supabase = createSupabaseBrowserClient();

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
