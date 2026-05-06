import { getSessionUser } from "@/features/auth/queries/get-session-user-server";
import Sidebar from "@/features/dashboard/components/Sidebar";

export default async function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const viewer = await getSessionUser();

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <Sidebar userId={viewer.id} userName={viewer.username} />
      {children}
    </div>
  );
}
