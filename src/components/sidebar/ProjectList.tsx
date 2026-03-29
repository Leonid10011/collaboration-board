import { Project } from "@/domain/projects";

type ProjectListType = {
  projects: Project[];
};

export default function ProjectList({ projects }: ProjectListType) {
  return (
    <div className="flex flex-col gap-4">
      {projects.map((p) => (
        <div
          className="flex flex-col rounded px-2 py-4 bg-main-1 hover:cursor-pointer"
          key={p.id}
        >
          <h3>{p.title}</h3>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
}
