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
  userId: string;
}

export default function DashboardScreen({
  initialTasks,
  userRole,
  projectMembers,
  projectId,
  userId,
}: HomePageProps) {
  const { projectsState } = useProjects();

  const project = projectId ? projectsState.byId[projectId] : null;

  return (
    <div className="flex h-full flex-col flex-1 overflow-auto">
      <Header
        userRole={userRole}
        projectMembers={projectMembers}
        selectedProjectTitle={project ? project.title : null}
        project={project}
      />
      <div className="flex flex-row flex-1 h-full overflow-auto">
        <TaskBoard
          userRole={userRole}
          projectMembers={projectMembers}
          initialTasks={initialTasks}
          project={project}
          userId={userId}
        />
      </div>
    </div>
  );
}
