"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Task, TaskDB } from "../types";
import { formatSupabaseError } from "@/lib/supabase-error";
import { mapTaskDBToTask } from "../mapper";

const supabase = createSupabaseBrowserClient();

export const getTasksByProjectId = async (
  projectId: string,
): Promise<Task[]> => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: true })
    .order("id", { ascending: true })
    .limit(30)
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
