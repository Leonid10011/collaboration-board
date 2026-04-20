"use server";

import InfoBlock from "../../../components/ui/composed/InfoBlock";
import ProjectList from "../../projects/components/ProjectList";
import { ProjectsState } from "@/features/projects/types";
import { getMembershipsByUserId } from "@/features/memberships/queries/server/get-memberships-by-user-id";
import CreateProject from "@/features/projects/components/CreateProject";
import UserInfo from "@/features/users/components/UserInfo";

type SidebarProps = {
  userId: string;
  userName: string;
  projectState: ProjectsState;
};

export default async function Sidebar({
  userId,
  userName,
  projectState,
}: SidebarProps) {
  const memberships = await getMembershipsByUserId(userId);

  const userProjectsIds = projectState.allIds.filter((id) =>
    memberships.some((membership) => membership.projectId === id),
  );

  return (
    <div className="flex flex-col px-page-inline py-4 w-sidebar gap-4 bg-main-2">
      <UserInfo userName={userName} />
      <CreateProject />
      {/* Project List Server component */}
      <InfoBlock title="Projects">
        <ProjectList
          projectsState={projectState}
          userProjectsIds={userProjectsIds}
        />
      </InfoBlock>
    </div>
  );
}
