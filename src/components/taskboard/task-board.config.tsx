import { User, Users } from "lucide-react";

export const FILTER_MODES = ["all", "owner"] as const;

export type FilterMode = (typeof FILTER_MODES)[number];

export const FILTER_CONFIG: Record<
  FilterMode,
  { icon: React.ReactNode; label: string }
> = {
  all: { icon: <Users size={16} />, label: "All Tasks" },
  owner: { icon: <User size={16} />, label: "My Tasks" },
};
