export const TASK_STATUSES = ["backlog", "in_progress", "done"] as const;
export const TASK_PRIORITIES = ["low", "medium", "high"] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export type Task = {
  id: string;
  projectId: string;
  creatorId: string;
  assgineeId: string | null;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
};

export type CreateTaskInput = Omit<Task, "id">;
export type UpdateTaskInput = Partial<CreateTaskInput>;
