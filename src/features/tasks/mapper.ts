import { TaskSchemaDB } from "@/validation/task-schema";
import { Task, TaskSupabaseRow, TaskSupabaseUpdate } from "./types";

export function mapTaskDBToTask(task: TaskSupabaseRow): Task {
  const result = TaskSchemaDB.safeParse(task);

  if (!result.success) {
    console.log(result);
    throw new Error("Invalid task data from db.");
  }

  return {
    id: result.data.id,
    projectId: result.data.project_id,
    creatorId: result.data.creator_id,
    assigneeId: result.data.assignee_id,
    title: result.data.title,
    description: result.data.description,
    status: result.data.status,
    priority: result.data.priority,
  };
}
