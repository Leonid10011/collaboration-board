import { Task } from "@/domain/tasks";
import { User } from "@/domain/users";
import { Circle, SquarePlus } from "lucide-react";
import TaskItem from "./column/TaskItem";
import { showSuccess } from "@/lib/toast";

type ColumnProp = {
  statusColor: string;
  name: string;
  tasks: Task[];
  userMap: Map<string, User> | null;
  onModalOpen: () => void;
};

export default function Column({
  statusColor,
  name,
  tasks,
  userMap,
  onModalOpen,
}: ColumnProp) {
  const handleClick = (name: string) => {
    onModalOpen();
  };

  return (
    <div className="flex flex-col bg-main-2 h-full min-w-[220px] sm:min-w-[260x] md:min-w-[300px] flex-1 rounded px-4 py-2">
      {/* Column Header*/}
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2 justify-start items-center">
          <Circle width={24} height={24} color={statusColor} />
          <span className="text-lg">{name}</span>
          <span className="text-sm">{"(" + tasks.length + ")"}</span>
        </div>
        <SquarePlus
          width={32}
          height={32}
          onClick={() => handleClick(name)}
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
            onAction={() => {
              showSuccess("Took Task (WIP)");
            }}
          />
        ))}
      </div>
    </div>
  );
}
