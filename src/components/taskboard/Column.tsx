import { Task } from "@/domain/tasks";
import { Circle, SquarePlus } from "lucide-react";

type ColumnProp = {
  statusColor: string;
  name: string;
  tasks: Task[];
};

export default function Column({ statusColor, name, tasks }: ColumnProp) {
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
          onClick={() => {
            console.log("Add Task onClick");
          }}
          className="hover:cursor-pointer"
        />
      </div>
      <div className="">
        {/* Tasks */}
        {tasks.map((t) => (
          <div
            key={t.id}
            className="flex flex-col rounded px-2 py-4 bg-background mt-4 hover:cursor-pointer"
            onClick={() => {
              console.log("Task " + t.id + " onClick");
            }}
          >
            <h3>{t.title}</h3>
            <p>{t.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
