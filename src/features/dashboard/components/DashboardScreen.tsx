//src/features/dashboard/components/HomePage.tsx
"use client";

import { useProjects } from "@/features/projects/context/ProjectContext";
import Header from "./Header";
import TaskBoard from "./TaskBoard";
import { ProjectMember, ProjectRole } from "@/features/memberships/types";
import { Task } from "@/features/tasks/types";

interface HomePageProps {
  initialTasks: Task[];
  userRole: ProjectRole | null;
  projectMembers: ProjectMember[];
  projectId: string | null;
}

export default function DashboardScreen({
  initialTasks,
  userRole,
  projectMembers,
  projectId,
}: HomePageProps) {
  const { projectsState } = useProjects();

  const project = projectId ? projectsState.byId[projectId] : null;

  return (
    <div className="flex min-h-screen flex-col flex-1">
      <Header
        userRole={userRole}
        projectMembers={projectMembers}
        selectedProjectTitle={project ? project.title : null}
        project={project}
      />
      <div className="flex flex-row flex-1">
        <TaskBoard
          userRole={userRole}
          projectMembers={projectMembers}
          initialTasks={initialTasks}
          project={project}
        />
      </div>
    </div>
  );
}
