"use client";

import { ProjectProvider } from "@/context/ProjectContext";
import { TaskProvider } from "@/context/TaskContext";
import { UserProvider } from "@/context/UserContext";
import { SelectedProjectProvider } from "@/features/dashboard/context/SelectedProjectContext";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserProvider>
        <ProjectProvider>
          <SelectedProjectProvider>
            <TaskProvider>{children}</TaskProvider>
          </SelectedProjectProvider>
        </ProjectProvider>
      </UserProvider>
      <Toaster />
    </>
  );
}
