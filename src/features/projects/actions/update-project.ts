"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Project, ProjectDB } from "../types";
import { mapProjectDBToDomain } from "../mapper";

const supabase = await createSupabaseServerClient();

/**
 *
 * @param projectId
 * @param updates
 * @returns The updated project with updated data
 */

export const updateProject = async (
  projectId: string,
  updates: Partial<Project>,
): Promise<Project> => {
  console.log("Updating project with ID:", projectId, "and updates:", updates);

  const { data, error } = await supabase
    .from("projects")
    .update(updates)
    .eq("id", projectId)
    .select()
    .returns<ProjectDB>()
    .single();

  if (error) {
    throw new Error(
      `Error updating project: ${"message" in error ? error.message : String(error)}`,
    );
  }
  return mapProjectDBToDomain(data);
};
