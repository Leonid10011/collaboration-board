"use client";

import ProjectItem from "./ProjectItem";
import { useRouter } from "next/navigation";
import { ProjectsState } from "../types";

type ProjectListType = {
  projectsState: ProjectsState;
  userProjectsIds: string[];
};

export default function ProjectList({
  projectsState,
  userProjectsIds,
}: ProjectListType) {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/projects/${id}`);
  };

  const projects = userProjectsIds.map((id) => projectsState.byId[id]);

  return (
    <div className="flex flex-col gap-1">
      {projects.map((p) => (
        <ProjectItem
          key={p.id}
          title={p.title}
          description={p.description}
          onClick={() => handleClick(p.id)}
          onMouseEnter={() => router.prefetch(`/projects/${p.id}`)}
        />
      ))}
    </div>
  );
}
