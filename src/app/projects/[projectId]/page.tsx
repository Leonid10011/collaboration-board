"use server";

import { AuthProvider } from "@/features/auth/AuthContext";

import { getSessionUser } from "@/features/auth/queries/get-session-user-server";
import HomePage from "@/features/dashboard/components/HomePage";

import { SelectedProjectProvider } from "@/features/dashboard/context/SelectedProjectContext";

import { listProjects } from "@/features/projects/queries/get-projects-server";
import { normalizeProjects } from "@/features/projects/utils";
import { getTasksByProjectId } from "@/features/tasks/queries/get-tasks-by-project-id-server";
import { normalizeTasks } from "@/features/tasks/utils";

type Props = {
  params: Promise<{ projectId: string }>;
};

export default async function Page({ params }: Props) {
  const { projectId } = await params;

  const tasks = await getTasksByProjectId(projectId);

  const [viewer, projects] = await Promise.all([
    getSessionUser(),
    listProjects(),
  ]);

  const projectsState = normalizeProjects(projects);
  const tasksState = normalizeTasks(tasks);

  return (
    <AuthProvider>
      <SelectedProjectProvider
        projectState={projectsState}
        selectedProjectId={projectId}
      >
        <HomePage
          viewer={viewer}
          projectId={projectId}
          initialTasks={tasks}
          tasksState={tasksState}
        />
      </SelectedProjectProvider>
    </AuthProvider>
  );
}
