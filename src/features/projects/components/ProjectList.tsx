import { Project } from "@/domain/projects";
import ProjectItem from "./ProjectItem";
import { ProjectRole } from "@/features/memberships/types";
import { deleteProject } from "../actions/delete-project";
import { useSelectedProject } from "@/features/dashboard/context/SelectedProjectContext";

type ProjectListType = {
  projects: Project[];
  userRole: ProjectRole | null;
};

export default function ProjectList({ projects, userRole }: ProjectListType) {
  //const { changeSelectedProject, removeProject, userRole } = useProject();
  const { selectProject } = useSelectedProject();

  const handleDelete = async (id: string) => {
    if (userRole !== "admin") return;
    await deleteProject(id);
  };

  return (
    <div className="flex flex-col gap-1">
      {projects.map((p) => (
        <ProjectItem
          key={p.id}
          title={p.title}
          description={p.description}
          onClick={() => selectProject(p.id)}
          onDelete={() => handleDelete(p.id)}
        />
      ))}
    </div>
  );
}
