"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Project, UpdateProjectInput } from "../types";
import { mapProjectDBToDomain } from "../mapper";

function removeUndefinedFields<T extends Record<string, unknown>>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined),
  ) as Partial<T>;
}

/**
 *
 * @param projectId
 * @param updates
 * @returns The updated project with updated data
 */

export const updateProject = async (
  projectId: string,
  updates: UpdateProjectInput,
): Promise<Project> => {
  const supabase = await createSupabaseServerClient();

  const cleanUpdates = removeUndefinedFields(updates);

  const { data, error } = await supabase
    .from("projects")
    .update(cleanUpdates)
    .eq("id", projectId)
    .select()
    .single();

  if (error) {
    throw new Error(
      `Error updating project: ${"message" in error ? error.message : String(error)}`,
    );
  }
  return mapProjectDBToDomain(data);
};
