"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export const getUserById = async (id: string) => {
  const supabase = createSupabaseBrowserClient();

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
