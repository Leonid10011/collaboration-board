import { Project } from "@/domain/projects";
import ProjectItem from "./projectList/ProjectItem";
import { useProject } from "@/context/ProjectContext";

type ProjectListType = {
  projects: Project[];
};

export default function ProjectList({ projects }: ProjectListType) {
  const { changeSelectedProject } = useProject();

  return (
    <div className="flex flex-col gap-1">
      {projects.map((p) => (
        <ProjectItem
          key={p.id}
          title={p.title}
          description={p.description}
          onClick={() => changeSelectedProject(p.id)}
        />
      ))}
    </div>
  );
}
