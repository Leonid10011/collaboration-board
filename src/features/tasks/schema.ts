import { z } from "zod";
import { TASK_PRIORITIES, TASK_STATUSES } from "./types";

const DateSchema = z.preprocess(
  (val) => (typeof val === "string" ? new Date(val) : val),
  z.date(),
);

export const TaskSchemaDB = z.object({
  id: z.uuid(),
  project_id: z.uuid(),
  creator_id: z.uuid(),
  assignee_id: z.uuid().nullable(),
  title: z.string().min(1),
  description: z.string().nullable(),
  status: z.enum(TASK_STATUSES),
  priority: z.enum(TASK_PRIORITIES),
  created_at: DateSchema,
  updated_at: DateSchema,
});

export const TaskSchema = z.object({
  projectId: z.uuid(),
  creatorId: z.uuid(),
  assigneeId: z.uuid().nullable(),
  title: z.string().min(1),
  description: z.string().nullable(),
  status: z.enum(TASK_STATUSES),
  priority: z.enum(TASK_PRIORITIES),
});

export const UpdateTaskSchema = TaskSchema.partial();
