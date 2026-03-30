import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.uuid().optional(),
  title: z.string().min(1),
  ownerId: z.uuid(),
  description: z.string().optional(),
});
