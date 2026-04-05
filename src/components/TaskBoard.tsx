"use client";

import { useMemo, useState } from "react";
import Column from "./taskboard/Column";
import { useProject } from "@/context/ProjectContext";
import { Task, TASK_STATUSES, TaskStatus } from "@/domain/tasks";
import CreateTaskModal from "./taskboard/CreateTaskModal";
import { useTask } from "@/context/TaskContext";
import UpdateTaskModal from "./taskboard/UpdateTaskModal";
import { useUser } from "@/context/UserContext";
import { FilterItem } from "./taskboard/FilterItem";
import {
  FILTER_CONFIG,
  FILTER_MODES,
  FilterMode,
} from "./taskboard/task-board.config";

export default function TaskBoard() {
  const STATUS_COLORS = ["gray", "yellow", "green"] as const;

  const { projectTasks: tasks } = useTask();
  const { projectMembers: members } = useProject();
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus>("backlog");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filterMode, setFilterMode] = useState<FilterMode>("all");

  const handleNewTaskStatus = (status: TaskStatus) => {
    setNewTaskStatus(status);
  };

  const handleModalOpen = (val: boolean) => {
    setIsModalOpen(val);
  };

  const handleUpdateModalOpen = (val: boolean) => {
    setIsUpdateModalOpen(val);
  };

  const handleUpdateModalClose = () => {
    setSelectedTask(null);
    setIsUpdateModalOpen(false);
  };

  const handleSelectedTask = (taskId: string) => {
    const tmp = tasks.find((t) => t.id === taskId);
    if (!tmp) return;
    setSelectedTask(tmp);
  };

  const handleFilterMode = (mode: FilterMode) => {
    setFilterMode(mode);
  };

  const memberMap = useMemo(() => {
    if (!members) return null;
    return new Map(members.map((member) => [member.id, member]));
  }, [members]);

  const filteredTasks = useMemo(() => {
    if (filterMode === "all") return tasks ?? [];

    return (tasks ?? []).filter((task) => task.assgineeId === user?.id);
  }, [tasks, filterMode, user]);

  const tasksByStatus = useMemo(() => {
    const map: Record<TaskStatus, Task[]> = {
      backlog: [],
      in_progress: [],
      done: [],
    };

    filteredTasks?.forEach((task) => {
      map[task.status].push(task);
    });

    return map;
  }, [filteredTasks]);

  return (
    <div className="flex flex-col flex-1 gap-4 px-4 py-2">
      <div className="flex flex-row gap-2">
        {FILTER_MODES.map((mode, i) => (
          <div key={mode}>
            <FilterItem
              key={mode}
              icon={FILTER_CONFIG[mode].icon}
              label={FILTER_CONFIG[mode].label}
              onFilter={() => handleFilterMode(mode)}
            />
            {i < FILTER_MODES.length - 1 ? (
              <div className="w-px bg-main-2" />
            ) : null}
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-x-8 h-full">
        {TASK_STATUSES.map((status, i) => (
          <Column
            key={status}
            statusColor={STATUS_COLORS[i]}
            status={status}
            tasks={tasksByStatus[status]}
            userMap={memberMap}
            onModalOpen={() => handleModalOpen(true)}
            onUpdateModalOpen={() => handleUpdateModalOpen(true)}
            onAdd={handleNewTaskStatus}
            onSelectedTask={handleSelectedTask}
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
      {isUpdateModalOpen && selectedTask && (
        <UpdateTaskModal
          onModalClose={handleUpdateModalClose}
          selectedTask={selectedTask}
        />
      )}
    </div>
  );
}
