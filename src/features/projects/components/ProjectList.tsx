import { Project } from "@/domain/projects";
import ProjectItem from "./ProjectItem";
import { ProjectRole } from "@/features/memberships/types";
import { deleteProject } from "../actions/delete-project";
import { useSelectedProject } from "@/features/dashboard/context/SelectedProjectContext";
import { useRouter } from "next/navigation";

type ProjectListType = {
  projects: Project[];
  userRole: ProjectRole | null;
};

export default function ProjectList({ projects, userRole }: ProjectListType) {
  //const { changeSelectedProject, removeProject, userRole } = useProject();

  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (userRole !== "admin") return;
    await deleteProject(id);
  };

  const handleClick = (id: string) => {
    router.push(`/projects/${id}`);
  };

  return (
    <div className="flex flex-col gap-1">
      {projects.map((p) => (
        <ProjectItem
          key={p.id}
          title={p.title}
          description={p.description}
          onClick={() => handleClick(p.id)}
          onDelete={() => handleDelete(p.id)}
          onMouseEnter={() => router.prefetch(`/projects/${p.id}`)}
        />
      ))}
    </div>
  );
}
