"use client";

import {
  CreateTaskInput,
  Task,
  TaskPriority,
  TaskStatus,
  UpdateTaskInput,
} from "@/domain/tasks";
import { TaskSchema, UpdateTaskSchema } from "@/validation/task-schema";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { showError } from "@/lib/toast";
import { IdSchema } from "@/global-schema";

import { createSupabaseBrowserClient } from "@/db/supabase/supabase-client";

import { useSelectedProject } from "@/features/dashboard/context/SelectedProjectContext";
import { useAuth } from "@/features/auth/AuthContext";
import { getTasksByProjectId } from "@/features/tasks/queries/get-tasks-by-project-id";

type TaskContextType = {
  // For current project
  projectTasks: Task[];

  //Actions
  saveTask: (task: CreateTaskInput) => Promise<void>;
  patchTask: (taskId: string, task: UpdateTaskInput) => Promise<void>;
  takeTask: (taskId: string) => Promise<void>;
  assignTask: (taskId: string, userId: string) => Promise<void>;
  unassignTask: (taskId: string) => Promise<void>;
  removeTask: (taskId: string) => Promise<void>;
  changePriority: (taskId: string, priority: TaskPriority) => Promise<void>;
  optimistic_changeStatus: (taskId: string, status: TaskStatus) => void;
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
  const { selectedProject } = useSelectedProject();

  const [projectTasks, setProjectTasks] = useState<Task[]>([]);

  const { user } = useAuth();
  const supabase = createSupabaseBrowserClient();

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
    // realtime subscription

    if (!selectedProject?.id) return;

    const channel = supabase
      .channel("db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tasks",
          filter: `project_id=eq.${selectedProject.id}`,
        },
        async () => {
          console.log("UPDATE!");
          await fetchTasks();
        },
      )
      .subscribe();

    return () => {
      console.log("REMOVED");
      supabase.removeChannel(channel);
    };
  }, [selectedProject?.id, fetchTasks, supabase]);

  useEffect(() => {
    void fetchTasks().catch(console.error);
  }, [fetchTasks]);

  const saveTask = async (task: CreateTaskInput): Promise<void> => {
    //validation

    const validated = TaskSchema.safeParse(task);

    if (!validated.success)
      throw new Error(`Error: ${validated.error.message}`);

    try {
      await insertTaskRepo(validated.data);
      await fetchTasks();
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  const removeTask = async (taskId: string) => {
    const validated = IdSchema.safeParse(taskId);
    if (!validated.success)
      throw new Error(`Error validating taskId: ${validated.error.message}`);

    try {
      await deleteTaskRepo(taskId);
      await fetchTasks();
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
      //fetchTasks();
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

  const assignTask = async (taskId: string, userId: string) => {
    const validated = IdSchema.safeParse(taskId);
    if (!validated.success) throw new Error(validated.error.message);

    try {
      await updateTaskRepo(taskId, { assgineeId: userId });
      await fetchTasks();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An error occurred";
      showError(message);
    }
  };

  const unassignTask = async (taskId: string) => {
    const validated = IdSchema.safeParse(taskId);
    if (!validated.success) throw new Error(validated.error.message);

    try {
      await updateTaskRepo(taskId, { assgineeId: null });
      await fetchTasks();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An error occurred";
      showError(message);
    }
  };

  const changePriority = async (taskId: string, p: TaskPriority) => {
    try {
      await updateTaskRepo(taskId, { priority: p });
      await fetchTasks();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An error occured";
      throw new Error(message);
    }
  };

  const optimistic_changeStatus = async (
    taskId: string,
    status: TaskStatus,
  ) => {
    const previousTask = projectTasks.find((t) => t.id === taskId);
    if (!previousTask) return;
    if (previousTask.status === status) return;
    console.log("Previous Task: ", previousTask);
    const previousStatus = previousTask.status;

    // optimistic update
    setProjectTasks((prev) => {
      const taskExists = prev.some((task) => task.id === taskId);

      if (!taskExists) {
        return prev;
      }

      const nextTasks = prev.map((task) =>
        task.id === taskId ? { ...task, status } : task,
      );
      return nextTasks;
    });

    try {
      await updateTaskRepo(taskId, { status });
    } catch (error) {
      //rollbakc
      setProjectTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, status: previousStatus } : task,
        ),
      );

      throw new Error(`Error updating task status: ${error}`);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        projectTasks,
        saveTask,
        patchTask,
        takeTask,
        assignTask,
        unassignTask,
        removeTask,
        changePriority,
        optimistic_changeStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
