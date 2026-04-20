//src/features/tasks/components/TaskBoardBasic.tsx
"use client";

import { useMemo, useState } from "react";
import Column from "./Column";
import CreateTaskModal from "./CreateTaskModal";
import UpdateTaskModal from "./UpdateTaskModal";
import { FilterItem } from "./FilterItem";
import { FILTER_CONFIG, FILTER_MODES, FilterMode } from "../task-board.config";
import { ProjectMember, ProjectRole } from "@/features/memberships/types";
import { useAuth } from "@/features/auth/AuthContext";
import { Task, TASK_STATUSES, TasksState, TaskStatus } from "../types";
import { Project } from "@/features/projects/types";

type TaskBoardBasicProps = {
  members: ProjectMember[];
  userRole: ProjectRole | null;
  tasksState: TasksState;
  project: Project | null;
};

export default function TaskBoardBasic({
  members,
  userRole,
  tasksState,
  project,
}: TaskBoardBasicProps) {
  const STATUS_COLORS = ["gray", "yellow", "green"] as const;

  //const { projectTasks: tasks } = useTask();
  //const { projectMembers: members } = useProject();
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus>("backlog");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const tasks = tasksState;

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
    if (!tasksState) return null;
    const tmp = tasksState.byId[taskId];

    setSelectedTask(tmp);
  };

  const handleFilterMode = (mode: FilterMode) => {
    setFilterMode(mode);
  };

  const memberMap = useMemo(() => {
    if (!members) return null;
    return new Map(members.map((member) => [member.id, member]));
  }, [members]);

  const filteredTasksId = useMemo(() => {
    if (!tasks) return [];

    if (filterMode === "all") return tasks.allIds;

    const taskIdByStatus = tasks.allIds.filter(
      (id) => tasks.byId[id].assigneeId === user?.id,
    );

    return taskIdByStatus;
  }, [tasks, filterMode, user?.id]);

  const tasksByStatus = useMemo(() => {
    const map: Record<TaskStatus, string[]> = {
      backlog: [],
      in_progress: [],
      done: [],
    };

    if (!tasks) return map;

    filteredTasksId.forEach((id) => {
      map[tasks.byId[id].status].push(id);
    });

    return map;
  }, [filteredTasksId, tasks]);

  return (
    <div className="flex flex-col flex-1 gap-4 px-board-inline py-2">
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
            taskIds={tasksByStatus[status]}
            tasksById={tasks.byId}
            userMap={memberMap}
            onModalOpen={() => handleModalOpen(true)}
            onUpdateModalOpen={() => handleUpdateModalOpen(true)}
            onAdd={handleNewTaskStatus}
            onSelectedTask={handleSelectedTask}
            userRole={userRole}
          />
        ))}
      </div>
      {isModalOpen && (
        <CreateTaskModal
          onModalClose={() => handleModalOpen(false)}
          newStatus={newTaskStatus}
          onStatus={handleNewTaskStatus}
          project={project}
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
