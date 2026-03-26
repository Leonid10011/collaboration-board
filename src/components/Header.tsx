"use client";

import { useProject } from "@/context/ProjectContext";
import MemberInfo from "./homepage/MembersInfo";
import ProjectInfo from "./homepage/ProjectInfo";
import UserInfo from "./homepage/UserInfo";

export default function Header() {
  const { projectTitle } = useProject();
  return (
    <div className="flex flex-row py-2 px-1 border-b-2 border-solid bg-background gap-16">
      <div className="flex flex-row gap-16">
        <UserInfo />
        <ProjectInfo />
      </div>
      <MemberInfo />
    </div>
  );
}
