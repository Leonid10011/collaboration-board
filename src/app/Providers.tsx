"use client";

import { ProjectProvider } from "@/context/ProjectContext";
import { TaskProvider } from "@/context/TaskContext";
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserProvider>
        <ProjectProvider>
          <TaskProvider>{children}</TaskProvider>
        </ProjectProvider>
      </UserProvider>
      <Toaster />
    </>
  );
}
