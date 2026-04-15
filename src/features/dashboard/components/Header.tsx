"use client";

import { useEffect, useRef, useState } from "react";
import { SurfaceRow } from "../../../components/ui/surface/SurfaceItem";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { showError, showSuccess } from "@/lib/toast";
import UserInfo from "../../users/components/UserInfo";
import ProjectInfo from "../../projects/components/ProjectInfo";
import MemberInfo from "../../memberships/components/MembersInfo";
import { ProjectMember, ProjectRole } from "@/features/memberships/types";
import { useSelectedProject } from "../context/SelectedProjectContext";
import { updateProject } from "@/features/projects/actions/update-project";
import { useAuth } from "@/features/auth/AuthContext";

interface HeaderProps {
  userRole: ProjectRole | null;
  selectedProjectTitle: string | null;
  projectMembers: ProjectMember[];
}

export default function Header({ userRole, projectMembers }: HeaderProps) {
  const { selectedProject } = useSelectedProject();

  const { user, signout } = useAuth();

  const [isUserOpen, setIsUserOpen] = useState<boolean>(false);
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

  const [projectTitle, setProjectTitle] = useState<string | null>(null);

  const userMenuRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  useEffect(() => {
    setProjectTitle(selectedProject ? selectedProject.title : "");
  }, [selectedProject]);

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
    if (!selectedProject) return;
    try {
      await updateProject(selectedProject?.id, {
        title: projectTitle ? projectTitle : undefined,
      });
      showSuccess("Project Title updated");
    } catch (error) {
      showError(`Error updating ProjectTitle: ${error}`);
    }
  };

  return (
    <div className="flex flex-row py-2 px-page-inline bg-main-2">
      <div className="flex flex-row gap-16" ref={userMenuRef}>
        <UserInfo
          userName={user ? user.userName : null}
          online={true}
          isUserOpen={isUserOpen}
          onUserClick={handleUserOpen}
        >
          {isUserOpen && (
            <div className="absolute top-15 left-0 z-20 w-[calc(var(--sidebar-width)-var(--page-padding-inline))] rounded-md shadow bg-main-1 p-1">
              <div
                className={`max-h-44 overflow-y-auto ${isSigningOut ? "disabled" : ""}`}
              >
                <SurfaceRow
                  className="text-sm font-regular"
                  onClick={handleSignOut}
                >
                  <LogOutIcon strokeWidth={1.25} size={16} /> Logout
                </SurfaceRow>
              </div>
            </div>
          )}
        </UserInfo>
      </div>
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
