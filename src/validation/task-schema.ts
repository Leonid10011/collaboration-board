import { TASK_PRIORITIES, TASK_STATUSES } from "@/domain/tasks";
import { z } from "zod";

const DateSchema = z.preprocess(
  (val) => (typeof val === "string" ? new Date(val) : val),
  z.date(),
);

export const TaskSchemaDB = z.object({
  id: z.uuid(),
  project_id: z.uuid(),
  creator_id: z.uuid(),
  assignee_id: z.uuid().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(TASK_STATUSES),
  priority: z.enum(TASK_PRIORITIES),
  created_at: DateSchema,
  updated_at: DateSchema,
});
