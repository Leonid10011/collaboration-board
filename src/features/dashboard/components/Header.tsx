"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { showError, showSuccess } from "@/lib/toast";
import ProjectInfo from "../../projects/components/ProjectInfo";
import MemberInfo from "../../memberships/components/MembersInfo";
import { ProjectMember, ProjectRole } from "@/features/memberships/types";
import { updateProject } from "@/features/projects/actions/update-project";
import { useAuth } from "@/features/auth/AuthContext";
import { Project } from "@/domain/projects";

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
  const { user, signout } = useAuth();

  const [isUserOpen, setIsUserOpen] = useState<boolean>(false);
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

  const [projectTitle, setProjectTitle] = useState<string | null>(null);

  const userMenuRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  useEffect(() => {
    setProjectTitle(project ? project.title : "");
  }, [project]);

  const handleOnTitleChange = (title: string) => {
    setProjectTitle(title);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!userMenuRef.current) return;

      if (!userMenuRef.current.contains(event.target as Node)) {
        setIsUserOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleUserOpen = () => {
    setIsUserOpen((prev) => !prev);
  };

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signout();
      router.replace("/login");
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleProjectTitle = async () => {
    if (!project) return;
    try {
      await updateProject(project?.id, {
        title: projectTitle ? projectTitle : undefined,
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
          projectTitle={projectTitle ? projectTitle : null}
          role={userRole ? userRole : null}
          onTitleChange={handleOnTitleChange}
          onBlur={handleProjectTitle}
        />
        <MemberInfo members={projectMembers} />
      </div>
    </div>
  );
}
