"use client";

import ProjectItem from "./ProjectItem";
import { useRouter } from "next/navigation";
import { Membership } from "@/features/memberships/types";
import { useProjects } from "../context/ProjectContext";
import InfoBlock from "@/components/ui/composed/InfoBlock";

type ProjectListType = {
  memberships: Membership[];
};

export default function ProjectList({ memberships }: ProjectListType) {
  const router = useRouter();

  const { projectsState } = useProjects();

  const userProjectsIds = projectsState.allIds.filter((id) =>
    memberships.some((membership) => membership.projectId === id),
  );

  const projects = userProjectsIds.map((id) => projectsState.byId[id]);

  return (
    <InfoBlock title="Projects">
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
    </InfoBlock>
  );
}
