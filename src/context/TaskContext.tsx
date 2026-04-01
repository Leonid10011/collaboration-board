import { CreateTaskInput, Task, UpdateTaskInput } from "@/domain/tasks";
import {
  deleteTaskRepo,
  getTasksByProjectId,
  insertTaskRepo,
  updateTaskRepo,
} from "@/repository/repository-tasks";
import { TaskSchema, UpdateTaskSchema } from "@/validation/task-schema";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useProject } from "./ProjectContext";
import { showError } from "@/lib/toast";
import { IdSchema } from "@/validation/global-schema";
import { useUser } from "./UserContext";

type TaskContextType = {
  // For current project
  projectTasks: Task[];
  selectedTask: Task | null;

  //Actions
  selectTask: (task: Task | null) => void;
  saveTask: (task: CreateTaskInput) => void;
  patchTask: (taskId: string, task: UpdateTaskInput) => void;
  takeTask: (taskId: string) => void;
  removeTask: (taskId: string) => void;
};

export const TaskContext = createContext<TaskContextType | null>(null);

export function useTask() {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error(`useTask must be used within a context provider.`);

  return context;
}

type TaskProviderProps = {
  children: React.ReactNode;
};

export function TaskProvider({ children }: TaskProviderProps) {
  const { selectedProject } = useProject();

  const [projectTasks, setProjectTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { user } = useUser();

  const fetchTasks = useCallback(async () => {
    if (!selectedProject) return;

    try {
      const response = await getTasksByProjectId(selectedProject.id);
      setTimeout(() => setProjectTasks(response), 0);
    } catch (error) {
      showError(`Error loading Tasks. ${error}`);
    }
  }, [selectedProject]);

  useEffect(() => {
    void fetchTasks().catch(console.error);
  }, [fetchTasks]);

  const handleSetSelectedTask = (task: Task | null) => {
    setSelectedTask(task);
  };

  const saveTask = async (task: CreateTaskInput): Promise<void> => {
    //validation
    const validated = TaskSchema.safeParse(task);

    if (!validated.success)
      throw new Error(`Error: ${validated.error.message}`);

    try {
      await insertTaskRepo(validated.data);
      fetchTasks();
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  const removeTask = async (taskId: string) => {
    const validated = IdSchema.safeParse(taskId);
    if (!validated.success)
      throw new Error(`Error validating taskId: ${validated.error.message}`);

    try {
      deleteTaskRepo(taskId);
      fetchTasks();
    } catch (error) {
      throw new Error(`Error deleting task for taskId ${taskId}: ${error}`);
    }
  };

  const patchTask = async (taskId: string, update: UpdateTaskInput) => {
    const validated = UpdateTaskSchema.safeParse(update);

    if (!validated.success)
      throw new Error(
        `Error validating data for task with id ${taskId}. ${validated.error.message}`,
      );

    try {
      await updateTaskRepo(taskId, validated.data);
      fetchTasks();
    } catch (error) {
      throw new Error(`Error updating task: ${error}`);
    }
  };

  const takeTask = async (taskId: string) => {
    const validated = IdSchema.safeParse(taskId);
    if (!validated.success) throw new Error(validated.error.message);

    try {
      await updateTaskRepo(taskId, { assgineeId: user?.id });
      await fetchTasks();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An error occurred";
      showError(message);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        projectTasks,
        selectedTask,
        selectTask: handleSetSelectedTask,
        saveTask,
        patchTask,
        takeTask,
        removeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
