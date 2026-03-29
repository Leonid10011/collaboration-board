"use client";

import { useProject } from "@/context/ProjectContext";
import MemberInfo from "./homepage/MembersInfo";
import ProjectInfo from "./homepage/ProjectInfo";
import UserInfo from "./homepage/UserInfo";
import { useUser } from "@/context/UserContext";

export default function Header() {
  const { projectTitle, userRole } = useProject();
  const { user } = useUser();

  return (
    <div className="flex flex-row py-2 px-1 border-b-2 border-solid bg-main-2 gap-16">
      <div className="flex flex-row gap-16">
        <UserInfo
          userName={user ? user.userName : null}
          online={user ? user.online : null}
        />
        <ProjectInfo
          projectTitle={projectTitle ? projectTitle : null}
          role={userRole ? userRole : null}
        />
      </div>
      <MemberInfo />
    </div>
  );
}
