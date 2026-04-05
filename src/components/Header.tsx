"use client";

import { useProject } from "@/context/ProjectContext";
import MemberInfo from "./homepage/MembersInfo";
import ProjectInfo from "./homepage/ProjectInfo";
import UserInfo from "./homepage/UserInfo";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { SurfaceRow } from "./ui/surface/SurfaceItem";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { projectTitle, userRole, projectMembers } = useProject();
  const { user, signout } = useUser();

  const [isUserOpen, setIsUserOpen] = useState<boolean>(false);
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

  const router = useRouter();

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

  return (
    <div className="flex flex-row py-2 px-1 border-b-2 border-solid bg-main-2 gap-16">
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

        <ProjectInfo
          projectTitle={projectTitle ? projectTitle : null}
          role={userRole ? userRole : null}
        />
      </div>
      <MemberInfo members={projectMembers} />
    </div>
  );
}
