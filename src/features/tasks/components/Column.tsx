"use client";

import { Circle, CirclePlus } from "lucide-react";
import TaskItem from "./TaskItem";
import { showError, showSuccess } from "@/lib/toast";
import { useDroppable } from "@dnd-kit/react";
import { statusMap } from "../task-board.config";
import { ProjectMember, ProjectRole } from "@/features/memberships/types";
import { Task, TASK_PRIORITIES, TaskPriority, TaskStatus } from "../types";
import { assignTaskAction } from "../actions/assign-task";
import { useAuth } from "@/features/auth/AuthContext";
import { unassignTaskAction } from "../actions/unassign-task";
import { changeTaskPriorityAction } from "../actions/change-priority-task";
import { deleteTaskAction } from "../actions/delete-task";

type ColumnProp = {
  statusColor: string;
  status: TaskStatus;
  taskIds: string[];
  tasksById: Record<string, Task>;
  userMap: Map<string, ProjectMember> | null;
  onModalOpen: () => void;
  onAdd: (status: TaskStatus) => void;
  onUpdateModalOpen: () => void;
  onSelectedTask: (taskId: string) => void;
  userRole: ProjectRole | null;
};

export default function Column({
  statusColor,
  status,
  taskIds,
  tasksById,
  userMap,
  onModalOpen,
  onAdd,
  onUpdateModalOpen,
  onSelectedTask,
  userRole,
}: ColumnProp) {
  const handleClick = () => {
    onAdd(status);
    onModalOpen();
  };

  const { isDropTarget, ref } = useDroppable({ id: status });

  const { user } = useAuth();

  const handleTaskClick = (taskId: string) => {
    onSelectedTask(taskId);
    onUpdateModalOpen();
  };

  const handleTakeTask = async (taskId: string) => {
    if (!user) return null;
    try {
      await assignTaskAction(taskId, user.id);
      showSuccess("Task assigned.");
    } catch (error) {
      showError(`Error ${error}`);
    }
  };

  const handleAssignTask = async (taskId: string, userId: string) => {
    try {
      await assignTaskAction(taskId, userId);
      showSuccess("Task assigned.");
    } catch (error) {
      showError(`Error ${error}`);
    }
  };

  const handleUnassignTask = async (taskId: string) => {
    try {
      await unassignTaskAction(taskId);
      showSuccess("Task unassigned.");
    } catch (error) {
      showError(`Error ${error}`);
    }
  };

  const handleChangePriority = async (
    taskId: string,
    taskPriority: TaskPriority,
  ) => {
    //optimstic update

    try {
      showSuccess("Changing priority ... ");
      await changeTaskPriorityAction(taskId, taskPriority);
      showSuccess("Priotiy changed.");
    } catch (error) {
      showError(`Error ${error}`);
    }
  };

  return (
    <div
      className="flex flex-col bg-main-2 h-full min-w-[220px] sm:min-w-[260px] md:min-w-[300px] flex-1 px-4 py-2"
      ref={ref}
    >
      {/* Column Header*/}
      <div className="flex flex-row justify-between mb-4">
        <div className="flex flex-row gap-2 justify-start items-center">
          <Circle
            width={24}
            height={24}
            color={statusColor}
            fill={statusColor}
            strokeWidth={1.25}
          />
          <span className="text-lg hover:cursor-default">
            {statusMap[status]}
          </span>
          <span className="text-lg hover:cursor-default text-meta">
            {"(" + taskIds.length + ")"}
          </span>
        </div>
        <CirclePlus
          width={32}
          height={32}
          onClick={handleClick}
          strokeWidth={1.25}
          className="hover:cursor-default hover:text-meta "
        />
      </div>
      <div className="flex flex-col gap-4">
        {/* Tasks */}
        {taskIds.map((id) => {
          const t = tasksById[id];
          return (
            <TaskItem
              key={t.id}
              id={t.id}
              title={t.title}
              priority={t.priority}
              priorityOptions={TASK_PRIORITIES}
              assignedUserName={
                t.assigneeId && userMap
                  ? (userMap.get(t.assigneeId)?.username ?? null)
                  : null
              }
              assignedUserImageUrl={
                t.assigneeId && userMap
                  ? (userMap.get(t.assigneeId)?.imgUrl ?? null)
                  : null
              }
              availableAssignees={
                userMap
                  ? [...userMap.values()].map((u) => ({
                      id: u.id,
                      label: u.username,
                    }))
                  : []
              }
              onAction={() => handleTakeTask(t.id)}
              onAssign={(userId) => handleAssignTask(t.id, userId)}
              onUnassign={() => handleUnassignTask(t.id)}
              onUpdate={() => handleTaskClick(t.id)}
              onPriority={(taskPriority: TaskPriority) =>
                handleChangePriority(t.id, taskPriority)
              }
              canAssign={userRole === "admin"}
              onDelete={() => deleteTaskAction(t.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
