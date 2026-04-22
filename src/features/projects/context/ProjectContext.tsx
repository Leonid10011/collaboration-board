"use client";

import { createContext, useContext, useState } from "react";
import { Project, ProjectsState } from "../types";
import { normalizeProjects } from "../utils";

type ProjectContextType = {
  projectsState: ProjectsState;
  handleChangeTitle: (projectId: string, title: string) => void;
};

const ProjectContext = createContext<ProjectContextType | null>(null);

const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === null) {
    throw new Error("useProjectTitle must be used within a ProjectProvider");
  }
  return context;
};

type Props = {
  initialProjects: Project[];
  children: React.ReactNode;
};

function ProjectProvider({ initialProjects, children }: Props) {
  const [projectsState, setProjectsState] = useState(() =>
    normalizeProjects(initialProjects),
  );

  const handleChangeTitle = (projectId: string, title: string) => {
    setProjectsState((prev) => ({
      ...prev,
      byId: {
        ...prev.byId,
        [projectId]: {
          ...prev.byId[projectId],
          title,
        },
      },
    }));
  };

  return (
    <ProjectContext.Provider value={{ projectsState, handleChangeTitle }}>
      {children}
    </ProjectContext.Provider>
  );
}

export { useProjects, ProjectProvider, ProjectContext };
