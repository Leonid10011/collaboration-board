"use server";

import { Project, ProjectDB } from "../types";
import { mapProjectDBToDomain } from "../mapper";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/** PROJECTS */
/**
 * Fetches all projects from the database and returns them.
 * @returns An array of projects. Returns an empty array if there was an error fetching the projects.
 */
export const listProjects = async (): Promise<Project[]> => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .returns<ProjectDB[]>()
    .limit(10);

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data.map(mapProjectDBToDomain);
};
