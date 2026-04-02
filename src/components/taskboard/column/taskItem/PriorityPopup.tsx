import { TaskPriority } from "@/domain/tasks";

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
      className="absolute top-10 left-0 z-20 w-48 rounded-md border border-white/10 bg-main-2 p-2 shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="max-h-44 overflow-y-auto">
        {priorityOptions.map((p) => (
          <button
            key={p}
            type="button"
            className="w-full rounded px-2 py-1 text-left text-sm hover:bg-main-1"
            onClick={() => onPriority(p)}
          >
            {p.substring(0, 1).toUpperCase() + p.substring(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
