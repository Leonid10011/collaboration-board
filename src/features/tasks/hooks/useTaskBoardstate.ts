//src/features/tasks/hooks/useTaskBoardstate.ts
"use client";

import { useEffect, useState } from "react";
import { Task, TasksState } from "../types";
import { normalizeTasks } from "../utils";

type Props = {
  initialTasks: Task[];
};
export default function useTaskBoardState({ initialTasks }: Props) {
  // task related states
  const [tasks, setTasks] = useState<TasksState>(() =>
    normalizeTasks(initialTasks),
  );

  useEffect(() => {
    setTasks(normalizeTasks(initialTasks));
  }, [initialTasks]);

  return { tasks, setTasks };
}
