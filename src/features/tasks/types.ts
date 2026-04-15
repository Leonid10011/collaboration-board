import { Database } from "@/lib/database.types";

export const TASK_STATUSES = ["backlog", "in_progress", "done"] as const;
export const TASK_PRIORITIES = ["low", "medium", "high"] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export type TaskDB = {
  id: string;
  project_id: string;
  creator_id: string;
  assignee_id: string | null;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  created_at: string;
  updated_at: string;
};

export type CreateTaskInput = Omit<Task, "id">;
export type UpdateTaskInput = Partial<CreateTaskInput>;

export type Task = {
  id: string;
  projectId: string;
  creatorId: string;
  assigneeId: string | null;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
};

export type TaskSupabaseRow = Database["public"]["Tables"]["tasks"]["Row"];
export type TaskSupabaseInsert =
  Database["public"]["Tables"]["tasks"]["Insert"];
export type TaskSupabaseUpdate =
  Database["public"]["Tables"]["tasks"]["Update"];

export type UpdateTaskPayload = {
  projectId?: string;
  creatorId?: string;
  assigneeId?: string | null;
  title?: string;
  description?: string | null;
  status?: TaskStatus;
  priority?: TaskPriority;
};

export type CreateTaskPayload = {
  projectId: string;
  assigneeId?: string | null;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
};

export type InsertTaskInput = {
  projectId: string;
  creatorId: string;
  assigneeId?: string | null;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
};

export type UpdateTaskDetailsPayload = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
};

export type TasksState = {
  byId: Record<string, Task>;
  allIds: string[];
};
