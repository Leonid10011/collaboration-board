import { Project, ProjectsState } from "./types";

export function normalizeProjects(projects: Project[]): ProjectsState {
  const byId: Record<string, Project> = {};
  const allIds: string[] = [];

  for (const project of projects) {
    byId[project.id] = project;
    allIds.push(project.id);
  }

  return { byId, allIds };
}
