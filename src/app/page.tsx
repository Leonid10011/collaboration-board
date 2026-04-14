"use server";

import HomePage from "@/features/dashboard/components/HomePage";
import { getSessionUser } from "./auth/queries/get-session-user";
import { listProjects } from "@/features/projects/queries/get-projects";

export default async function Home() {
  const [viewer, project] = await Promise.all([
    getSessionUser(),
    listProjects(),
  ]);

  console.log("Viewer: ", viewer);

  return <HomePage />;
}
