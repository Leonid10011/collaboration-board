//src/features/dashboard/components/HomePage.tsx
"use client";

import { SessionUser } from "@/features/auth/types";
import Header from "./Header";
import TaskBoard from "./TaskBoard";
import { ProjectMember, ProjectRole } from "@/features/memberships/types";
import { Task } from "@/features/tasks/types";
import { Project } from "@/features/projects/types";

interface HomePageProps {
  initialTasks: Task[];
  project: Project | null;
  userRole: ProjectRole | null;
  projectMembers: ProjectMember[];
}

export default function DashboardScreen({
  initialTasks,
  project,
  userRole,
  projectMembers,
}: HomePageProps) {
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
