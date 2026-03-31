"use client";

import { useMemo, useState } from "react";
import Column from "./taskboard/Column";
import { useProject } from "@/context/ProjectContext";
import { Task, TASK_STATUSES, TaskStatus } from "@/domain/tasks";
import CreateTaskModal from "./taskboard/CreateTaskModal";

export default function TaskBoard() {
  const STATUS_COLORS = ["gray", "yellow", "green"] as const;

  const { projectTasks: tasks, projectMembers: members } = useProject();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus>("backlog");

  const handleNewTaskStatus = (status: TaskStatus) => {
    setNewTaskStatus(status);
  };

  const handleModalOpen = (val: boolean) => {
    setIsModalOpen(val);
  };

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
            status={c}
            tasks={TaskByStatus[c]}
            userMap={memberMap}
            onModalOpen={() => handleModalOpen(true)}
            onAdd={handleNewTaskStatus}
          />
        ))}
      </div>
      {isModalOpen && (
        <CreateTaskModal
          onModalClose={() => handleModalOpen(false)}
          newStatus={newTaskStatus}
          onStatus={handleNewTaskStatus}
        />
      )}
    </div>
  );
}
