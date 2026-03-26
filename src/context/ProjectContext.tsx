import { Project } from "@/domain/projects";
import { listProjects } from "@/repository/repository-projects";
import { createContext, useEffect, useMemo, useState } from "react";

type ProjectContextType = {
  title: string | null;
  changeSelectedProject: (id: string) => void;
};

const ProjectContext = createContext<ProjectContextType | null>(null);

type ProjectContextProviderType = {
  children: React.ReactNode;
};
export function ProjectContextProvider({
  children,
}: ProjectContextProviderType) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await listProjects();
        setProjects(result);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const changeSelectedProject = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const currentProject = useMemo(() => {
    if (!projects) return null;
    const currentProjectTmp = projects.find((p) => p.id === selectedProjectId);
    if (!currentProjectTmp) return null;
    return currentProjectTmp;
  }, [projects, selectedProjectId]);

  return (
    <ProjectContext.Provider
      value={{
        title: currentProject ? currentProject.title : null,
        changeSelectedProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
