import { AuthProvider } from "@/features/auth/AuthContext";
import { getSessionUser } from "@/features/auth/queries/get-session-user-server";
import Sidebar from "@/features/dashboard/components/Sidebar";
import { listProjects } from "@/features/projects/queries/get-projects-server";
import { normalizeProjects } from "@/features/projects/utils";

export default async function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [viewer, projects] = await Promise.all([
    getSessionUser(),
    listProjects(),
  ]);

  const projectsState = normalizeProjects(projects);

  return (
    <AuthProvider>
      <div className="flex flex-row">
        <Sidebar
          userId={viewer.id}
          userName={viewer.username}
          projectState={projectsState}
        />
        {children}
      </div>
      ;
    </AuthProvider>
  );
}
