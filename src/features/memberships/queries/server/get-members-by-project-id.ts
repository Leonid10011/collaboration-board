//src/features/memberships/queries/server/get-members-by-project-id.ts
"use server";

import { mapMemberhsipWithProfileDBToDomain } from "../../mapper";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getMembershipsByProjectId(projectId: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("project_memberships")
    .select("*, profiles (id, user_name, last_active, img_url)")
    .eq("project_id", projectId);

  if (error) {
    throw new Error("Error getting membership with profile.");
  }

  return data.map(mapMemberhsipWithProfileDBToDomain);
}
