"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { User } from "../types";
import { mapUserBtoDomain } from "../mapper";

export const getUsers = async (): Promise<User[]> => {
  const supabase = createSupabaseBrowserClient();

  const { data, error } = await supabase.from("profiles").select("*");

  if (error) {
    throw new Error(
      `Error fetching profiles: ${"message" in error ? error.message : String(error)}`,
    );
  }

  return data.map(mapUserBtoDomain);
};
