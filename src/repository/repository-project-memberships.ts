"use client";

import { MembershipDB } from "@/db/supabase/membership-db";
import {
  mapMembershipDBToMembership,
  mapMemberWithProfileDBToMember,
} from "@/db/supabase/membership-mapper";

import { Membership } from "@/domain/memberships";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

import { QueryData } from "@supabase/supabase-js";

const supabase = createSupabaseBrowserClient();

export async function getMembershipsByProjectId(projectId: string) {
  const supabase2 = createSupabaseBrowserClient();

  const query = supabase2
    .from("project_memberships")
    .select("*, profiles (id, user_name, last_active, img_url)")
    .eq("project_id", projectId);

  return query.data.map(mapMemberWithProfileDBToMember);
}

export async function getMembershipsByUserId(
  userId: string,
): Promise<Membership[]> {
  if (!userId) return [];

  const { data, error } = await supabase
    .from("project_memberships")
    .select("*")
    .eq("user_id", userId)
    .returns<MembershipDB[]>();

  if (!data) throw new Error(`Error getting memberships by user id: ${error}`);

  const memberships =
    data.map((membership) => ({
      ...membership,
    })) || [];

  return memberships.map(mapMembershipDBToMembership);
}

export async function getMemberRoleOfProject(
  projectId: string,
  userId: string,
) {
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

export async function addMemberToProject(
  projectId: string,
  userId: string,
  role: string,
) {
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

export async function removeMemberFromProject(
  projectId: string,
  userId: string,
) {
  const { error, count } = await supabase
    .from("project_memberships")
    .delete({ count: "exact" })
    .eq("project_id", projectId)
    .eq("user_id", userId);

  console.log(
    "Attempted to remove member from project. Count of deleted rows:",
    count,
    "Error:",
    error,
  );

  if (count === 0) {
    throw new Error(
      "Cannot remove self if admin is the only member of the project",
    );
  }
  if (error) {
    throw new Error("Failed to remove member from project");
  }
}
