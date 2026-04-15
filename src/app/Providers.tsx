"use client";

import { TaskProvider } from "@/context/TaskContext";
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserProvider>
        <TaskProvider>{children}</TaskProvider>
      </UserProvider>
      <Toaster />
    </>
  );
}
