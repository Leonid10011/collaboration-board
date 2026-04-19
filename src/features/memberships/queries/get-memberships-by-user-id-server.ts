"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { mapMembershipDBToDomain } from "../mapper";
import { Membership } from "../types";

export async function getMembershipsByUserId(
  userId: string,
): Promise<Membership[]> {
  if (!userId) return [];

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("project_memberships")
    .select("*")
    .eq("user_id", userId);

  if (!data) throw new Error(`Error getting memberships by user id: ${error}`);

  const memberships =
    data.map((membership) => ({
      ...membership,
    })) || [];

  return memberships.map(mapMembershipDBToDomain);
}
