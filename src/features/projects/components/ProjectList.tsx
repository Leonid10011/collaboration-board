import { Project } from "@/domain/projects";
import ProjectItem from "../../../components/sidebar/projectList/ProjectItem";
import { useProject } from "@/context/ProjectContext";

type ProjectListType = {
  projects: Project[];
};

export default function ProjectList({ projects }: ProjectListType) {
  const { changeSelectedProject, removeProject, userRole } = useProject();

  const handleDelete = async (id: string) => {
    if (userRole !== "admin") return;
    await removeProject(id);
  };

  return (
    <div className="flex flex-col gap-1">
      {projects.map((p) => (
        <ProjectItem
          key={p.id}
          title={p.title}
          description={p.description}
          onClick={() => changeSelectedProject(p.id)}
          onDelete={() => handleDelete(p.id)}
        />
      ))}
    </div>
  );
}
