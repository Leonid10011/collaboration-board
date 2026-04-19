"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { mapMemberhsipWithProfileDBToDomain } from "../mapper";

export async function getMembershipsByProjectId(projectId: string) {
  const supabase = createSupabaseBrowserClient();

  const { data, error } = await supabase
    .from("project_memberships")
    .select("*, profiles (id, user_name, last_active, img_url)")
    .eq("project_id", projectId);

  if (error) {
    throw new Error("Error getting membership with profile.");
  }

  return data.map(mapMemberhsipWithProfileDBToDomain);
}
