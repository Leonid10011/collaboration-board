//src/features/memberships/queries/server/get-member-role-of-project.ts
"use server";

import { ProjectRole } from "../../types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getMemberRoleOfProject(
  projectId: string,
  userId: string,
): Promise<ProjectRole> {
  const supabase = await createSupabaseServerClient();

  const result = await supabase
    .from("project_memberships")
    .select("role")
    .eq("project_id", projectId)
    .eq("user_id", userId)
    .single();

  if (result.error) {
    throw new Error(
      `Error fetching member role: ${result.error instanceof Error ? result.error.message : String(result.error)}`,
    );
  }
  return result.data?.role || null;
}
