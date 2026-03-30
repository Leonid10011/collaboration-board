"use client";

import { UserDB } from "@/db/supabase/user-db";
import { createSupabaseBrowserClient } from "../db/supabase/supabase-client";
import { User } from "@/domain/users";
import { mapUserDBToUser } from "@/db/supabase/user-mapper";

const supabase = createSupabaseBrowserClient();

/** PROFILES */
// The profiles table is used to store additional information about the user, such as their name.
// It is linked to the auth.users table via the id field, which is the same as the user_id in auth.users.
// This allows us to easily fetch the profile information for a user when we have their user_id from the authentication context.

const getUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .returns<UserDB[]>();
  if (error) {
    throw new Error(
      `Error fetching profiles: ${"message" in error ? error.message : String(error)}`,
    );
  }

  return data.map(mapUserDBToUser);
};

export const getUserById = async (id: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(
      `Error fetching profile by id: ${"message" in error ? error.message : String(error)}`,
    );
  }
  return data;
};

export { getUsers };
