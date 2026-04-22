"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { SessionUser } from "../types";
import { mapProfileDBtoDomain } from "../mapper";

export const getSessionUser = async (): Promise<SessionUser> => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error("An error occured while getting User.");
  }

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (profileError) {
    throw new Error(
      `Error fetching profile by id: ${"message" in profileError ? profileError.message : String(error)}`,
    );
  }

  return mapProfileDBtoDomain(profileData);
};
