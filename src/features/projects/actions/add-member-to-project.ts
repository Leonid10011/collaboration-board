"use server";

import { ProjectRole } from "@/features/memberships/types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function addMemberToProject(
  projectId: string,
  userId: string,
  role: ProjectRole,
) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("project_memberships")
    .insert({
      project_id: projectId,
      user_id: userId,
      role,
    })
    .select("*, profiles (id, user_name)")
    .single();

  if (error) {
    throw new Error("Failed to add member to project");
  }

  console.log("Added member to project:", data);
  return data;
}
