"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { ProjectRole } from "../../types";

export async function getMemberRoleOfProject(
  projectId: string,
  userId: string,
): Promise<ProjectRole> {
  const supabase = createSupabaseBrowserClient();

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
