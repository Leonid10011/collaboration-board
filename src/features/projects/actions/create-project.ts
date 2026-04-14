"use server";

import "server-only";
import { Project } from "../types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Creating project requires the creation of ProjectMemberships in order to assign the project to the user. This is handled in the API route, so we only need to insert the project here.
 *
 * @returns project_id of the inserted Project.
 */
export const insertProject = async (project: Omit<Project, "id">) => {
  const supabase = await createSupabaseServerClient();

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
