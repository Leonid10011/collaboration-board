import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Project, ProjectDB } from "../types";
import { mapProjectDBToDomain } from "../mapper";

/** PROJECTS */
/**
 * Fetches all projects from the database and returns them.
 * @returns An array of projects. Returns an empty array if there was an error fetching the projects.
 */
export const listProjects = async (): Promise<Project[]> => {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .returns<ProjectDB[]>()
    .limit(10);

  console.log("list Projects ", data?.map(mapProjectDBToDomain));

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data.map(mapProjectDBToDomain);
};
