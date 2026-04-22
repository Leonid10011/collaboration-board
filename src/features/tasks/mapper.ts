import { TaskSchemaDB } from "./schema";
import { Task, TaskSupabaseRow } from "./types";

export function mapTaskDBToTask(task: TaskSupabaseRow): Task {
  const parsed = TaskSchemaDB.safeParse(task);

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return {
    id: parsed.data.id,
    projectId: parsed.data.project_id,
    creatorId: parsed.data.creator_id,
    assigneeId: parsed.data.assignee_id,
    title: parsed.data.title,
    description: parsed.data.description,
    status: parsed.data.status,
    priority: parsed.data.priority,
  };
}
