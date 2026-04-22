"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function removeMemberFromProject(
  projectId: string,
  userId: string,
) {
  const supabase = await createSupabaseServerClient();

  const { error, count } = await supabase
    .from("project_memberships")
    .delete({ count: "exact" })
    .eq("project_id", projectId)
    .eq("user_id", userId);

  if (count === 0) {
    throw new Error(
      "Cannot remove self if admin is the only member of the project",
    );
  }
  if (error) {
    throw new Error("Failed to remove member from project");
  }
}
