"use client";

import { Project, ProjectsState } from "@/features/projects/types";
import { createContext, useContext, useMemo, useState } from "react";

type SelectedProjectContextType = {
  projects: ProjectsState;
  selectedProjectId: string | null;
  selectedProject: Project | null;
};

export const SelectedProjectContext =
  createContext<SelectedProjectContextType | null>(null);

type SelectedProjectProviderType = {
  children: React.ReactNode;
  projectState: ProjectsState;
  selectedProjectId: string;
};

export const useSelectedProject = () => {
  const context = useContext(SelectedProjectContext);

  if (!context) {
    throw new Error("useSelectedProject must be within a ProjectProvider.");
  }

  return context;
};

export function SelectedProjectProvider({
  children,
  projectState,
  selectedProjectId,
}: SelectedProjectProviderType) {
  const selectedProject = useMemo(() => {
    if (!selectedProjectId) return null;
    console.log("select project: ", projectState);
    return projectState.byId[selectedProjectId] ?? null;
  }, [projectState, selectedProjectId]);

  const value = useMemo(
    () => ({
      projects: projectState,
      selectedProjectId,
      selectedProject,
    }),
    [projectState, selectedProjectId, selectedProject],
  );

  return (
    <SelectedProjectContext.Provider value={value}>
      {children}
    </SelectedProjectContext.Provider>
  );
}
