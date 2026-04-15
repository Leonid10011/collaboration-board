"use client";

import { TaskProvider } from "@/context/TaskContext";
import { AuthProvider } from "@/features/auth/AuthContext";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
      <Toaster />
    </>
  );
}
