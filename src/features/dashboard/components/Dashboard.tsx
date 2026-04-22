//src/features/dashboard/components/Dashboard.tsx
"use server";

import { getSessionUser } from "@/features/auth/queries/get-session-user-server";
import { getMemberRoleOfProject } from "@/features/memberships/queries/server/get-member-role-of-project";
import { getMembershipsByProjectId } from "@/features/memberships/queries/server/get-members-by-project-id";

import { getTasksByProjectId } from "@/features/tasks/queries/get-tasks-by-project-id-server";
import DashboardScreen from "./DashboardScreen";

type Props = {
  projectId: string | null;
};

export default async function Dashboard({ projectId }: Props) {
  const viewer = await getSessionUser();
  const tasks = projectId ? await getTasksByProjectId(projectId) : [];

  const userRole = projectId
    ? await getMemberRoleOfProject(projectId, viewer.id)
    : null;

  const projectMembers = projectId
    ? await getMembershipsByProjectId(projectId)
    : [];

  return (
    <DashboardScreen
      initialTasks={tasks}
      userRole={userRole}
      projectMembers={projectMembers}
      projectId={projectId}
    />
  );
}
