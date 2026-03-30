"use client";

import { ProjectDB } from "@/db/supabase/project-db";
import { mapProjectDBToDomain } from "@/db/supabase/project-mapper";
import { createSupabaseBrowserClient } from "@/db/supabase/supabase-client";
import { Project } from "@/domain/projects";

const supabase = createSupabaseBrowserClient();

/** PROJECTS */
/**
 * Fetches all projects from the database and returns them.
 * @returns An array of projects. Returns an empty array if there was an error fetching the projects.
 */
export const listProjects = async (): Promise<Project[]> => {
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

/**
 * Creating project requires the creation of ProjectMemberships in order to assign the project to the user. This is handled in the API route, so we only need to insert the project here.
 *
 * @returns project_id of the inserted Project.
 */
export const insertProject = async (project: Omit<Project, "id">) => {
  const dataToSend = {
    title: project.title,
    owner_id: project.ownerId,
    description: project.description || "",
    slug: `${project.title.toLowerCase().replace(/\s+/g, "-")}-${Math.random()
      .toString(36)
      .substring(2, 10)}`,
  };

  const { data, error } = await supabase
    .rpc("create_project_with_membership", {
      p_user_id: project.ownerId,
      p_project_title: dataToSend.title,
      p_project_description: dataToSend.description,
      p_project_slug: dataToSend.slug,
      p_project_role: "admin", // Creating user is always admin of the project
    })
    .single()
    .returns<string>();

  if (error) {
    throw new Error(
      `Error inserting project: ${"message" in error ? error.message : String(error)}`,
    );
  }
  console.log("Inserted project:", data);
  return data;
};

/**
 *
 * @param projectId
 * @param updates
 * @returns The updated project with updated data
 */

export const updateProject = async (
  projectId: string,
  updates: Partial<Project>,
): Promise<Project> => {
  console.log("Updating project with ID:", projectId, "and updates:", updates);

  const { data, error } = await supabase
    .from("projects")
    .update(updates)
    .eq("id", projectId)
    .select()
    .returns<ProjectDB>()
    .single();

  if (error) {
    throw new Error(
      `Error updating project: ${"message" in error ? error.message : String(error)}`,
    );
  }
  return mapProjectDBToDomain(data);
};

/**
 *
 * @param projectId
 * @returns True for successfull delete. Throws error otherwise.
 */

export const deleteProject = async (projectId: string) => {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

  if (error) {
    throw new Error(
      `Error deleting project: ${"message" in error ? error.message : String(error)}`,
    );
  }
  return true;
};
