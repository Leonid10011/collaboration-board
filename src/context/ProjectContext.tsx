import { Project } from "@/domain/projects";
import { deleteProject, listProjects } from "@/repository/repository-projects";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useUser } from "./UserContext";
import {
  getMemberRoleOfProject,
  getMembershipsByProjectId,
  getMembershipsByUserId,
} from "@/repository/repository-project-memberships";
import { Membership } from "@/domain/memberships";
import { Member, User } from "@/domain/users";
import { showSuccess } from "@/lib/toast";

type ProjectContextType = {
  projectTitle: string | null;
  selectedProject: Project | null;
  changeSelectedProject: (id: string) => void;
  projectMembers: User[] | null;
  userRole: string | null;
  projects: Project[];
  userProjects: Project[];
  removeProject: (id: string) => Promise<void>;
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
  const [userMemberships, setUserMemberships] = useState<Membership[]>([]);
  const [selectedProjectMemberships, setSelectedProjectMemberships] = useState<
    Member[]
  >([]);

  const { user } = useUser();

  const selectedProject = useMemo(() => {
    if (!projects) return null;
    const currentProjectTmp = projects.find((p) => p.id === selectedProjectId);
    if (!currentProjectTmp) return null;
    return currentProjectTmp;
  }, [projects, selectedProjectId]);

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

  useEffect(() => {
    const fetchUserMemberships = async () => {
      if (!user) return;
      try {
        const memberships = await getMembershipsByUserId(user.id);
        setUserMemberships(memberships);
      } catch (error) {
        console.error("Error fetching user memberships:", error);
      }
    };

    fetchUserMemberships();
  }, [user]);

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

  useEffect(() => {
    if (!selectedProjectId) return;
    const fetchMemberships = async () => {
      try {
        const result = await getMembershipsByProjectId(selectedProjectId);

        if (!result) return;

        setSelectedProjectMemberships(result);
      } catch (error) {
        throw new Error(`Error: ${error}`);
      }
    };

    fetchMemberships();
  }, [selectedProjectId]);

  /* Selected Project */
  const changeSelectedProject = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  /* User Projects */
  const userProjects = useMemo(() => {
    if (!user) return [];

    const tmp = projects.filter((project) =>
      userMemberships.some((membership) => membership.projectId === project.id),
    );

    return tmp;
  }, [projects, userMemberships, user]);

  const removeProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);

      const fetchProjects = async () => {
        try {
          const result = await listProjects();
          setProjects(result);
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
      };

      fetchProjects();

      showSuccess("Project deleted.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        userProjects,
        selectedProject,
        projectMembers: selectedProjectMemberships,
        projects,
        projectTitle: selectedProject ? selectedProject.title : null,
        changeSelectedProject,
        userRole,
        removeProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
