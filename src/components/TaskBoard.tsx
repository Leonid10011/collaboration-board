import { useMemo } from "react";
import Column from "./taskboard/Column";
import { useProject } from "@/context/ProjectContext";
import { Task, TASK_STATUSES, TaskStatus } from "@/domain/tasks";

export default function TaskBoard() {
  const STATUS_COLORS = ["gray", "yellow", "green"] as const;

  const { projectTasks: tasks, projectMembers: members } = useProject();

  const memberMap = useMemo(() => {
    if (!members) return null;
    return new Map(members.map((m) => [m.id, m]));
  }, [members]);

  const TaskByStatus = useMemo(() => {
    const map: Record<TaskStatus, Task[]> = {
      backlog: [],
      in_progress: [],
      done: [],
    };

    tasks?.forEach((t) => {
      map[t.status].push(t);
    });

    return map;
  }, [tasks]);

  return (
    <div className="flex flex-col flex-1 gap-4 px-4 py-2">
      <h1>Task Board</h1>
      <div className="flex flex-row gap-x-8 h-full">
        {TASK_STATUSES.map((c, i) => (
          <Column
            key={i}
            statusColor={STATUS_COLORS[i]}
            name={c}
            tasks={TaskByStatus[c]}
          />
        ))}
      </div>
    </div>
  );
}
