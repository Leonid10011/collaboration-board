"use server";

import HomePage from "@/features/dashboard/components/HomePage";
import { getSessionUser } from "../features/auth/queries/get-session-user";
import { listProjects } from "@/features/projects/queries/get-projects";

export default async function Home() {
  const [viewer, projects] = await Promise.all([
    getSessionUser(),
    listProjects(),
  ]);

  return <HomePage viewer={viewer} projects={projects} />;
}
