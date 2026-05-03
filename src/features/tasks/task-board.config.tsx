import { User, Users } from "lucide-react";
import { TaskStatus } from "./types";

export const FILTER_MODES = ["all", "owner"] as const;

export type FilterMode = (typeof FILTER_MODES)[number];

export const FILTER_CONFIG: Record<
  FilterMode,
  { icon: React.ReactNode; label: string }
> = {
  all: { icon: <Users size={16} strokeWidth={1.25} />, label: "All Tasks" },
  owner: { icon: <User size={16} strokeWidth={1.25} />, label: "My Tasks" },
};

export const statusMap: Record<TaskStatus, string> = {
  backlog: "Backlog",
  in_progress: "In Progress",
  done: "Done",
};
