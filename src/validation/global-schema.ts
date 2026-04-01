import { z } from "zod";

export const IdSchema = z.uuid({ error: "Invalid Id Format." });
