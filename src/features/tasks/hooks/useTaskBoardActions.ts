import { showError } from "@/lib/toast";
import { assignTaskAction } from "../actions/assign-task";
import { unassignTaskAction } from "../actions/unassign-task";
import { changeTaskPriorityAction } from "../actions/change-priority-task";
import { TaskPriority, TasksState, TaskStatus } from "../types";
import { flushSync } from "react-dom";
import { changeTaskStatusAction } from "../actions/change-status-task";
import { deleteTaskAction } from "../actions/delete-task";

type Props = {
  tasks: TasksState;
  setTasks: React.Dispatch<React.SetStateAction<TasksState>>;
};

export default function useTaskBoardStateActions({ tasks, setTasks }: Props) {
  const handleStatusChange = async (
    taskId: string,
    targetStatus: TaskStatus,
  ) => {
    const oldTask = { ...tasks.byId[taskId] };
    if (oldTask.status === targetStatus) return;

    //optimistic update
    flushSync(() => {
      setTasks((prev) => ({
        ...prev,
        byId: {
          ...prev.byId,
          [taskId]: {
            ...prev.byId[taskId],
            status: targetStatus,
          },
        },
      }));
    });

    try {
      const updatedTask = await changeTaskStatusAction(taskId, targetStatus);

      setTasks((prev) => ({
        ...prev,
        byId: {
          ...prev.byId,
          [taskId]: updatedTask,
        },
      }));
    } catch (error) {
      setTasks((prev) => ({
        ...prev,
        byId: {
          ...prev.byId,
          [taskId]: oldTask,
        },
      }));
      showError("Error updating task status.");
    }
  };

  const handleChangePriority = async (
    taskId: string,
    nextPriority: TaskPriority,
  ) => {
    //optimstic update
    const oldTask = { ...tasks.byId[taskId] };

    if (oldTask.priority === nextPriority) return;

    setTasks((prev) => ({
      ...prev,
      byId: {
        ...prev.byId,
        [taskId]: {
          ...prev.byId[taskId],
          priority: nextPriority,
        },
      },
    }));

    try {
      const updatedTask = await changeTaskPriorityAction(taskId, nextPriority);

      setTasks((prev) => ({
        ...prev,
        byId: {
          ...prev.byId,
          [taskId]: {
            ...prev.byId[taskId],
            priority: updatedTask.priority,
          },
        },
      }));
    } catch (error) {
      setTasks((prev) => ({
        ...prev,
        byId: {
          ...prev.byId,
          [taskId]: {
            ...prev.byId[taskId],
            priority: oldTask.priority,
          },
        },
      }));

      showError(`Error ${error}`);
    }
  };

  const handleAssignTask = async (taskId: string, userId: string) => {
    if (!userId) return;

    const oldTask = tasks.byId[taskId];

    setTasks((prev) => ({
      ...prev,
      byId: {
        ...prev.byId,
        [taskId]: {
          ...prev.byId[taskId],
          assigneeId: userId,
        },
      },
    }));

    try {
      const updatedTask = await assignTaskAction(taskId, userId);

      setTasks((prev) => ({
        ...prev,
        byId: {
          ...prev.byId,
          [taskId]: {
            ...prev.byId[taskId],
            assigneeId: updatedTask.assigneeId,
          },
        },
      }));
    } catch (error) {
      setTasks((prev) => ({
        ...prev,
        byId: {
          ...prev.byId,
          [taskId]: {
            ...prev.byId[taskId],
            assigneeId: oldTask.assigneeId,
          },
        },
      }));
      showError(`Error ${error}`);
    }
  };

  const handleUnassignTask = async (taskId: string) => {
    const oldTask = tasks.byId[taskId];

    setTasks((prev) => ({
      ...prev,
      byId: {
        ...prev.byId,
        [taskId]: {
          ...prev.byId[taskId],
          assigneeId: null,
        },
      },
    }));
    try {
      await unassignTaskAction(taskId);
    } catch (error) {
      setTasks((prev) => ({
        ...prev,
        byId: {
          ...prev.byId,
          [taskId]: {
            ...prev.byId[taskId],
            assigneeId: oldTask.assigneeId,
          },
        },
      }));
      showError(`Error ${error}`);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    const oldTask = tasks.byId[taskId];

    setTasks((prev) => {
      const nextById = { ...prev.byId };
      delete nextById[taskId];

      return {
        byId: nextById,
        allIds: prev.allIds.filter((id) => id !== taskId),
      };
    });

    try {
      await deleteTaskAction(taskId);
    } catch (error) {
      setTasks((prev) => ({
        byId: {
          ...prev.byId,
          [taskId]: oldTask,
        },
        allIds: [...prev.allIds, taskId],
      }));

      showError(`Error deleting task: ${error}`);
    }
  };

  return {
    handleStatusChange,
    handleAssignTask,
    handleUnassignTask,
    handleChangePriority,
    handleDeleteTask,
  };
}
