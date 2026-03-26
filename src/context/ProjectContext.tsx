import { Project } from "@/domain/projects";
import { listProjects } from "@/repository/repository-projects";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useUser } from "./UserContext";
import { getMemberRoleOfProject } from "@/repository/repository-project-memberships";

type ProjectContextType = {
  projectTitle: string | null;
  changeSelectedProject: (id: string) => void;
  userRole: string | null;
};

const ProjectContext = createContext<ProjectContextType | null>(null);

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context)
    throw new Error("useProject must be used within a ProjectProvider.");

  return context;
}

type ProjectProviderType = {
  children: React.ReactNode;
};

export function ProjectProvider({ children }: ProjectProviderType) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );
  const [userRole, setUserRole] = useState<string | null>(null);

  const { user } = useUser();

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

  /* Selected Project */
  const changeSelectedProject = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  useEffect(() => {
    if (!selectedProjectId || !user) return;
    const fetchUserRole = async () => {
      try {
        const role = await getMemberRoleOfProject(selectedProjectId, user.id);
        setUserRole(role);
      } catch (error) {
        console.error("Error fetching user role for project:", error);
        setUserRole(null);
      }
    };

    fetchUserRole();
  }, [selectedProjectId, user]);
  const currentProject = useMemo(() => {
    if (!projects) return null;
    const currentProjectTmp = projects.find((p) => p.id === selectedProjectId);
    if (!currentProjectTmp) return null;
    return currentProjectTmp;
  }, [projects, selectedProjectId]);

  return (
    <ProjectContext.Provider
      value={{
        projectTitle: currentProject ? currentProject.title : null,
        changeSelectedProject,
        userRole,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
