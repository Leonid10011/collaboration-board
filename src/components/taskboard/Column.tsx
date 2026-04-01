import { Task, TaskStatus } from "@/domain/tasks";
import { User } from "@/domain/users";
import { Circle, SquarePlus } from "lucide-react";
import TaskItem from "./column/TaskItem";
import { showError, showSuccess } from "@/lib/toast";
import { useTask } from "@/context/TaskContext";

type ColumnProp = {
  statusColor: string;
  status: TaskStatus;
  tasks: Task[];
  userMap: Map<string, User> | null;
  onModalOpen: () => void;
  onAdd: (s: TaskStatus) => void;
};

export default function Column({
  statusColor,
  status,
  tasks,
  userMap,
  onModalOpen,
  onAdd,
}: ColumnProp) {
  const handleClick = () => {
    onAdd(status);
    onModalOpen();
  };

  const { takeTask } = useTask();

  const handleTakeTask = (taskId: string) => {
    try {
      takeTask(taskId);
    } catch (error) {
      showError(`Error ${error}`);
    }
  };

  return (
    <div className="flex flex-col bg-main-2 h-full min-w-[220px] sm:min-w-[260x] md:min-w-[300px] flex-1 rounded px-4 py-2">
      {/* Column Header*/}
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2 justify-start items-center">
          <Circle width={24} height={24} color={statusColor} />
          <span className="text-lg">{status}</span>
          <span className="text-sm">{"(" + tasks.length + ")"}</span>
        </div>
        <SquarePlus
          width={32}
          height={32}
          onClick={handleClick}
          className="hover:cursor-pointer"
        />
      </div>
      <div className="flex flex-col gap-4">
        {/* Tasks */}
        {tasks.map((t) => (
          <TaskItem
            key={t.id}
            title={t.title}
            priority={t.priority}
            user={
              t.assgineeId && userMap
                ? (userMap.get(t.assgineeId) ?? null)
                : null
            }
            onAction={() => handleTakeTask(t.id)}
          />
        ))}
      </div>
    </div>
  );
}
