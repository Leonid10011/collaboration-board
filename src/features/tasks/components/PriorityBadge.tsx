import {
  SignalHigh,
  SignalLow,
  SignalMedium,
  type LucideIcon,
} from "lucide-react";
import { TaskPriority } from "../types";

type PriorityBadgeProps = {
  type: TaskPriority;
};

const PRIORITY_CONFIG: Record<
  TaskPriority,
  { Icon: LucideIcon; className: string; label: string }
> = {
  low: {
    Icon: SignalLow,
    className: "border-sky-200 bg-sky-50 text-sky-600",
    label: "Low priority",
  },
  medium: {
    Icon: SignalMedium,
    className: "border-amber-200 bg-amber-50 text-amber-600",
    label: "Medium priority",
  },
  high: {
    Icon: SignalHigh,
    className: "border-rose-200 bg-rose-50 text-rose-600",
    label: "High priority",
  },
};

export default function PriorityBadge({ type }: PriorityBadgeProps) {
  const { Icon, className, label } = PRIORITY_CONFIG[type];

  return (
    <span
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center rounded-full border p-1 hover:bg-meta/10 ${className}`}
    >
      <Icon size={18} />
    </span>
  );
}
