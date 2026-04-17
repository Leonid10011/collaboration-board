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

  const projects = userProjectsIds.map((id) => projectsState.byId[id]);

  return (
    <div className="flex flex-col gap-1">
      {projects.map((p) => (
        <ProjectItem
          key={p.id}
          title={p.title}
          id={p.id}
          description={p.description}
          onMouseEnter={() => router.prefetch(`/projects/${p.id}`)}
        />
      ))}
    </div>
  );
}
