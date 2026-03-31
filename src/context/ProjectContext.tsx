import { Project } from "@/domain/projects";
import { listProjects } from "@/repository/repository-projects";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useUser } from "./UserContext";
import {
  getMemberRoleOfProject,
  getMembershipsByProjectId,
  getMembershipsByUserId,
} from "@/repository/repository-project-memberships";
import { Membership } from "@/domain/memberships";
import { Task } from "@/domain/tasks";
import { getTasksByProjectId, insertTask } from "@/repository/repository-tasks";
import { showError } from "@/lib/toast";
import { Member, User } from "@/domain/users";

type ProjectContextType = {
  projectTitle: string | null;
  selectedProject: Project | null;
  projectTasks: Task[] | null;
  changeSelectedProject: (id: string) => void;
  projectMembers: User[] | null;
  userRole: string | null;
  projects: Project[];
  userProjects: Project[];
  addTask: (t: Omit<Task, "id">) => void;
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
  const [selectedProjectTasks, setSelectedProjectTasks] = useState<Task[]>([]);
  const [selectedProjectMemberships, setSelectedProjectMemberships] = useState<
    Member[]
  >([]);

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

  const fetchTasks = useCallback(async () => {
    if (!selectedProjectId) return;

    try {
      const result = await getTasksByProjectId(selectedProjectId);
      setTimeout(() => setSelectedProjectTasks(result), 0);
      console.log("finidhed fetching tasks: ", result);
    } catch (error) {
      if (error instanceof Error) showError(error.message);
      else showError("Unknown Error occured.");
    }
  }, [selectedProjectId]);

  useEffect(() => {
    void fetchTasks().catch(console.error);
  }, [fetchTasks]);

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
        console.error("Error");
      }
    };

    fetchMemberships();
  }, [selectedProjectId]);

  /* Selected Project */
  const changeSelectedProject = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const selectedProject = useMemo(() => {
    if (!projects) return null;
    const currentProjectTmp = projects.find((p) => p.id === selectedProjectId);
    if (!currentProjectTmp) return null;
    return currentProjectTmp;
  }, [projects, selectedProjectId]);

  /* User Projects */
  const userProjects = useMemo(() => {
    if (!user) return [];

    const tmp = projects.filter((project) =>
      userMemberships.some((membership) => membership.projectId === project.id),
    );

    return tmp;
  }, [projects, userMemberships, user]);

  const addTask = async (task: Omit<Task, "id">) => {
    if (!selectedProject || !user) return;

    const dataToSend: Omit<Task, "id"> = {
      projectId: task.projectId,
      creatorId: task.creatorId,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
    };

    try {
      const result = await insertTask(dataToSend);
      if (!result) return;

      fetchTasks();
    } catch (error) {
      showError("Error: " + error);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        userProjects,
        selectedProject,
        projectMembers: selectedProjectMemberships,
        projectTasks: selectedProjectTasks,
        projects,
        projectTitle: selectedProject ? selectedProject.title : null,
        changeSelectedProject,
        userRole,
        addTask,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
