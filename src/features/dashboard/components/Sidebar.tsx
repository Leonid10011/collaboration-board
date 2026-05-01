"use server";

import ProjectList from "../../projects/components/ProjectList";
import { getMembershipsByUserId } from "@/features/memberships/queries/server/get-memberships-by-user-id";
import CreateProject from "@/features/projects/components/CreateProject";
import UserInfo from "@/features/users/components/UserInfo";

type SidebarProps = {
  userId: string;
  userName: string;
};

export default async function Sidebar({ userId, userName }: SidebarProps) {
  const memberships = await getMembershipsByUserId(userId);

  return (
    <div className="flex flex-col px-page-inline py-4 w-sidebar gap-4 bg-main-2">
      <UserInfo userName={userName} />
      <CreateProject />
      <ProjectList memberships={memberships} />
    </div>
  );
}
