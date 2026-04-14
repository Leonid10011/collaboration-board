import {
  Task,
  TASK_PRIORITIES,
  TaskPriority,
  TaskStatus,
} from "@/domain/tasks";
import { User } from "@/domain/users";
import { Circle, CirclePlus } from "lucide-react";
import TaskItem from "./TaskItem";
import { showError, showSuccess } from "@/lib/toast";
import { useTask } from "@/context/TaskContext";
import { useProject } from "@/context/ProjectContext";
import { useDroppable } from "@dnd-kit/react";
import { statusMap } from "../task-board.config";

type ColumnProp = {
  statusColor: string;
  status: TaskStatus;
  tasks: Task[];
  userMap: Map<string, User> | null;
  onModalOpen: () => void;
  onAdd: (s: TaskStatus) => void;
  onUpdateModalOpen: () => void;
  onSelectedTask: (taskId: string) => void;
};

export default function Column({
  statusColor,
  status,
  tasks,
  userMap,
  onModalOpen,
  onAdd,
  onUpdateModalOpen,
  onSelectedTask,
}: ColumnProp) {
  const handleClick = () => {
    onAdd(status);
    onModalOpen();
  };

  const { isDropTarget, ref } = useDroppable({ id: status });

  const { takeTask, assignTask, unassignTask, changePriority, removeTask } =
    useTask();

  const { userRole } = useProject();

  const handleTaskClick = (taskId: string) => {
    onSelectedTask(taskId);
    onUpdateModalOpen();
  };

  const handleTakeTask = async (taskId: string) => {
    try {
      await takeTask(taskId);
      showSuccess("Task assigned.");
    } catch (error) {
      showError(`Error ${error}`);
    }
  };

  const handleAssignTask = async (taskId: string, userId: string) => {
    try {
      await assignTask(taskId, userId);
      showSuccess("Task assigned.");
    } catch (error) {
      showError(`Error ${error}`);
    }
  };

  const handleUnassignTask = async (taskId: string) => {
    try {
      await unassignTask(taskId);
      showSuccess("Task unassigned.");
    } catch (error) {
      showError(`Error ${error}`);
    }
  };

  const handleChangePriority = async (
    taskId: string,
    taskPriority: TaskPriority,
  ) => {
    try {
      showSuccess("Changing priority ... ");
      await changePriority(taskId, taskPriority);
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
            {"(" + tasks.length + ")"}
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
        {tasks.map((t) => (
          <TaskItem
            key={t.id}
            id={t.id}
            title={t.title}
            priority={t.priority}
            priorityOptions={TASK_PRIORITIES}
            assignedUserName={
              t.assgineeId && userMap
                ? (userMap.get(t.assgineeId)?.userName ?? null)
                : null
            }
            assignedUserImageUrl={
              t.assgineeId && userMap
                ? (userMap.get(t.assgineeId)?.imgUrl ?? null)
                : null
            }
            availableAssignees={
              userMap
                ? [...userMap.values()].map((u) => ({
                    id: u.id,
                    label: u.userName,
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
            onDelete={() => removeTask(t.id)}
          />
        ))}
      </div>
    </div>
  );
}
