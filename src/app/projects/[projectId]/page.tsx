//src/app/projects/[projectId]/page.tsx
import Dashboard from "@/features/dashboard/components/Dashboard";

type Props = {
  params: Promise<{ projectId: string }>;
};

export default async function Page({ params }: Props) {
  const { projectId } = await params;
  return <Dashboard projectId={projectId} />;
}
