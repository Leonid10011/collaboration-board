import { AuthProvider } from "@/features/auth/AuthContext";
import { getSessionUser } from "@/features/auth/queries/get-session-user-server";
import Sidebar from "@/features/dashboard/components/Sidebar";
import { ProjectProvider } from "@/features/projects/context/ProjectContext";
import { listProjects } from "@/features/projects/queries/get-projects-server";

export default async function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const viewer = await getSessionUser();

  return (
    <div className="flex flex-row">
      <Sidebar userId={viewer.id} userName={viewer.username} />
      {children}
    </div>
  );
}
