"use server";

import HomePage from "@/features/dashboard/components/HomePage";
import { getSessionUser } from "../features/auth/queries/get-session-user-server";

import { normalizeProjects } from "@/features/projects/utils";
import { SelectedProjectProvider } from "@/features/dashboard/context/SelectedProjectContext";
import { listProjects } from "@/features/projects/queries/get-projects-server";
import { TaskProvider } from "@/context/TaskContext";

export default async function Home() {
  const [viewer, projects] = await Promise.all([
    getSessionUser(),
    listProjects(),
  ]);

  const projectsState = normalizeProjects(projects);

  return (
    <SelectedProjectProvider projectState={projectsState}>
      <TaskProvider>
        <HomePage viewer={viewer} />;
      </TaskProvider>
    </SelectedProjectProvider>
  );
}
