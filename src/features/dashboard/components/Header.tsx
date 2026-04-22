"use client";

import { showError, showSuccess } from "@/lib/toast";
import ProjectInfo from "../../projects/components/ProjectInfo";
import MemberInfo from "../../memberships/components/MembersInfo";
import { ProjectMember, ProjectRole } from "@/features/memberships/types";
import { updateProject } from "@/features/projects/actions/update-project";
import { Project } from "@/domain/projects";
import { useProjects } from "@/features/projects/context/ProjectContext";

interface HeaderProps {
  userRole: ProjectRole | null;
  selectedProjectTitle: string | null;
  projectMembers: ProjectMember[];
  project: Project | null;
}

export default function Header({
  userRole,
  projectMembers,
  project,
}: HeaderProps) {
  const { handleChangeTitle } = useProjects();

  const handleOnTitleChange = (title: string) => {
    if (!project) return;
    handleChangeTitle(project.id, title);
  };

  const handleProjectTitle = async () => {
    if (!project) return;
    try {
      await updateProject(project?.id, {
        title: project.title ? project.title : undefined,
      });
      showSuccess("Project Title updated");
    } catch (error) {
      showError(`Error updating ProjectTitle: ${error}`);
    }
  };

  return (
    <div className="flex flex-row py-2 px-page-inline bg-main-2">
      <div className="flex flex-row gap-4 px-board-inline">
        <ProjectInfo
          projectTitle={project ? project.title : null}
          role={userRole ? userRole : null}
          onTitleChange={handleOnTitleChange}
          onBlur={handleProjectTitle}
        />
        <MemberInfo members={projectMembers} />
      </div>
    </div>
  );
}
