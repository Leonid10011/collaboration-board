"use server";

import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 *
 * @param projectId
 * @returns True for successfull delete. Throws error otherwise.
 */

export const deleteProject = async (projectId: string) => {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

  if (error) {
    throw new Error(
      `Error deleting project: ${"message" in error ? error.message : String(error)}`,
    );
  }
  return true;
};
