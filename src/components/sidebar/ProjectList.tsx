import { Project } from "@/domain/projects";
import ProjectItem from "./projectList/ProjectItem";

type ProjectListType = {
  projects: Project[];
};

export default function ProjectList({ projects }: ProjectListType) {
  return (
    <div className="flex flex-col gap-4">
      {projects.map((p) => (
        <ProjectItem
          key={p.id}
          id={p.id}
          title={p.title}
          description={p.description}
        />
      ))}
    </div>
  );
}
