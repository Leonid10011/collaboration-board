"use client";

import { ProjectProvider } from "@/context/ProjectContext";
import { UserProvider } from "@/context/UserContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <ProjectProvider>{children}</ProjectProvider>
    </UserProvider>
  );
}
