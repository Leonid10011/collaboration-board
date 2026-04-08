import { TaskPriority } from "@/domain/tasks";
import PriorityBadge from "./PriorityBadge";
import { SurfaceItem, SurfaceRow } from "@/components/ui/surface/SurfaceItem";

type PriorityPopupProps = {
  priorityOptions: readonly TaskPriority[];
  onPriority: (p: TaskPriority) => void;
};

export default function PriorityPopup({
  priorityOptions,
  onPriority,
}: PriorityPopupProps) {
  return (
    <div
      className="absolute top-10 left-0 z-20 w-48 rounded-md border border-border bg-main-1 p-2 shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col gap-2 max-h-44 overflow-y-auto">
        {priorityOptions.map((p) => (
          <SurfaceRow
            className="flex flex-row items-center gap-2"
            key={p + "xyz"}
            onClick={() => onPriority(p)}
          >
            <PriorityBadge key={p} type={p} />{" "}
            {p.substring(0, 1).toUpperCase() + p.substring(1)}
          </SurfaceRow>
        ))}
      </div>
    </div>
  );
}
