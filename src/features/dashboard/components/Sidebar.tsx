"use server";

import InfoBlock from "../../../components/ui/composed/InfoBlock";
import ProjectList from "../../projects/components/ProjectList";
import { ProjectsState } from "@/features/projects/types";
import { getMembershipsByUserId } from "@/features/memberships/get-memberships-by-user-id-server";
import CreateProject from "@/features/projects/components/CreateProject";

type SidebarProps = {
  userId: string;
  projectState: ProjectsState;
};

export default async function Sidebar({ userId, projectState }: SidebarProps) {
  const memberships = await getMembershipsByUserId(userId);

  const userProjectsIds = projectState.allIds.filter((id) =>
    memberships.some((membership) => membership.projectId === id),
  );

  return (
    <div className="flex flex-col px-page-inline py-4 w-sidebar gap-4 bg-main-2">
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
