import { Task, TasksState } from "./types";

export function normalizeTasks(tasks: Task[]): TasksState {
  const byId: Record<string, Task> = {};
  const allIds: string[] = [];

  for (const task of tasks) {
    byId[task.id] = task;
    allIds.push(task.id);
  }

  return { byId, allIds };
}
