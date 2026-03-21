"use client";

import { createSupabaseBrowserClient } from "@/db/supabase/supabase-client";

const supabase = createSupabaseBrowserClient();

export const listTasks = async () => {
  const { data, error } = await supabase.from("tasks").select("*").limit(5);
  if (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }

  console.log("Fetched tasks:", data);
  return data;
};

const exampleTask = {
  creator_id: "e34f5728-e98b-4a14-9e1e-18b43e9d803c",
  assignee_id: "e34f5728-e98b-4a14-9e1e-18b43e9d803c",
  title: "Frontend-Login bauen",
  description: "Implementiere das Login-Formular für die Web-App.",
  status: "in_progress",
  priority: "high",
};

export const insertTask = async (
  title: string,
  id: string,
  projectId: string | null,
) => {
  const dataToSend = {
    ...exampleTask,
    creator_id: id,
    title,
    project_id: projectId,
  };

  const { data, error } = await supabase
    .from("tasks")
    .insert([dataToSend])
    .select()
    .single();

  if (error) {
    console.error("Error inserting task:", error);
    return null;
  }
  console.log("Inserted task:", data);
  return data;
};

export const deleteTask = async (taskId: string) => {
  const { data, error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId);
  if (error) {
    console.error("Error deleting task:", error);
    return null;
  }
  console.log("Deleted task:", data);
  return data;
};

type Task = {
  id: string;
  creator_id: string;
  assignee_id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  project_id: string;
};

export const updateTask = async (taskId: string, updates: Partial<Task>) => {
  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", taskId)
    .select()
    .single();
  if (error) {
    console.log("Error updating task:", error);
    return null;
  }
  console.log("Updated task:", data);
  return data;
};

/** PROJECTS */

export const listProjects = async () => {
  const { data, error } = await supabase.from("projects").select("*").limit(3);
  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
  console.log("Fetched projects:", data);
  return data;
};

const exampleProject = {
  title: "Collaboration Board",
  description: "Ein Tool zur Zusammenarbeit und Aufgabenverwaltung.",
  slug: "collaboration-board12345678901",
};

/**
 * Creating project requires the creation of ProjectMemberships in order to assign the project to the user. This is handled in the API route, so we only need to insert the project here.
 */
export const insertProject = async (title: string, userId: string) => {
  console.log("User id in insertProject:", userId);
  const dataToSend = {
    ...exampleProject,
    owner_id: userId,
    title,
  };

  console.log("Data to send for inserting project:", dataToSend);

  const { data, error } = await supabase.rpc("create_project_with_membership", {
    p_user_id: userId,
    p_project_title: dataToSend.title,
    p_project_description: dataToSend.description,
    p_project_slug: dataToSend.slug,
    p_project_role: "admin",
  });

  if (error) {
    console.error("Error inserting project:", error);
    return null;
  }
  console.log("Inserted project:", data);
  return data;
};
