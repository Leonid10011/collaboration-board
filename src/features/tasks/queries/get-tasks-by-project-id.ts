"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Task } from "../types";
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
    .limit(30);

  if (error) {
    throw new Error(
      `Error fetching task data from db: ${formatSupabaseError(error)}`,
    );
  }

  return data.map((t) => mapTaskDBToTask(t));
};
