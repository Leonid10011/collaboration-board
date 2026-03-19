"use client";

import { createSupabaseBrowserClient } from "@/db/supabase/supabase-client";

const supabase = createSupabaseBrowserClient();

export const listTasks = async () => {
  const { data, error } = await supabase.from("tasks").select("*");
  if (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }

  console.log("Fetched tasks:", data);
  return data;
};

const exampleTask = {
  id: "b1a2c3d4-e5f6-7890-abcd-1234567890ef",
  project_id: "11111111-1111-1111-1111-111111111111",
  creator_id: "22222222-2222-2222-2222-222222222222",
  assignee_id: "33333333-3333-3333-3333-333333333333",
  title: "Frontend-Login bauen",
  description: "Implementiere das Login-Formular für die Web-App.",
  status: "in_progress",
  priority: "high",
};

export const insertTask = async (title: string) => {
  const dataToSend = {
    ...exampleTask,
    title,
  };

  const { data, error } = await supabase
    .from("tasks")
    .insert({ title })
    .select("*")
    .single();
  if (error) {
    console.error("Error inserting task:", error);
    return null;
  }
  console.log("Inserted task:", data);
  return data;
};

/** PROJECTS */

export const listProjects = async () => {
  const { data, error } = await supabase.from("projects").select("*");
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
  slug: "collaboration-board1234567890",
};
export const insertProject = async (title: string, userId: string) => {
  console.log("User id in insertProject:", userId);
  const dataToSend = {
    ...exampleProject,
    owner_id: userId,
    title,
  };

  console.log("Data to send for inserting project:", dataToSend);

  const { data, error } = await supabase.from("projects").insert([dataToSend]);

  if (error) {
    console.error("Error inserting project:", error);
    return null;
  }
  console.log("Inserted project:", data);
  return data;
};
