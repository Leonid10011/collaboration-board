"use client";

import { useProject } from "@/context/ProjectContext";

import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { SurfaceRow } from "./ui/surface/SurfaceItem";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { showError, showSuccess } from "@/lib/toast";
import UserInfo from "./header/UserInfo";
import ProjectInfo from "./header/ProjectInfo";
import MemberInfo from "./header/MembersInfo";

export default function Header() {
  const { userRole, projectMembers, selectedProject, patchProject } =
    useProject();
  const { user, signout } = useUser();

  const [isUserOpen, setIsUserOpen] = useState<boolean>(false);
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

  const [projectTitle, setProjectTitle] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    setProjectTitle(selectedProject ? selectedProject.title : "");
  }, [selectedProject]);

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
      await patchProject(selectedProject?.id, { title: projectTitle });
      showSuccess("Project Title updated");
    } catch (error) {
      showError("Error updating ProjectTitle");
    }
  };

  return (
    <div className="flex flex-row py-2 px-page-inline border-b-2 border-solid bg-main-2">
      <div className="flex flex-row gap-16">
        <UserInfo
          userName={user ? user.userName : null}
          online={true}
          isUserOpen={isUserOpen}
          onUserClick={handleUserOpen}
        >
          {isUserOpen && (
            <div
              className="absolute top-15 left-0 z-20 w-48 rounded-md border border-white/10 bg-main-1 p-1"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`max-h-44 overflow-y-auto ${isSigningOut ? "disabled" : ""}`}
              >
                <SurfaceRow className="text-sm" onClick={handleSignOut}>
                  <LogOutIcon size={16} /> Logout
                </SurfaceRow>
              </div>
            </div>
          )}
        </UserInfo>
      </div>
      <div className="flex flex-row gap-4">
        <ProjectInfo
          projectTitle={projectTitle ? projectTitle : null}
          role={userRole ? userRole : null}
          onTitleChange={setProjectTitle}
          onBlur={handleProjectTitle}
        />
        <MemberInfo members={projectMembers} />
      </div>
    </div>
  );
}
