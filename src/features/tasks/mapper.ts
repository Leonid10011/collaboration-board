import { TaskSchemaDB } from "@/validation/task-schema";
import { Task, TaskDB } from "./types";

export function mapTaskDBToTask(task: TaskDB): Task {
  const result = TaskSchemaDB.safeParse(task);

  if (!result.success) {
    console.log(result);
    throw new Error("Invalid task data from db.");
  }

  return {
    id: result.data.id,
    projectId: result.data.project_id,
    creatorId: result.data.creator_id,
    assgineeId: result.data.assignee_id,
    title: result.data.title,
    description: result.data.description,
    status: result.data.status,
    priority: result.data.priority,
  };
}
