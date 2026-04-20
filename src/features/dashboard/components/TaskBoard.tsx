//src/features/dashboard/components/TaskBoard.tsx
"use client";

import { DragDropProvider } from "@dnd-kit/react";
import TaskBoardBasic from "../../tasks/components/TaskBoardBasic";
import { ProjectMember, ProjectRole } from "@/features/memberships/types";
import { Task, TasksState } from "@/features/tasks/types";
import { TaskRealtimeSync } from "@/features/tasks/components/TaskRealtimeSync";
import { useEffect, useState } from "react";
import { normalizeTasks } from "@/features/tasks/utils";
import { TaskStatus } from "@/domain/tasks";
import { changeTaskStatusAction } from "@/features/tasks/actions/change-status-task";
import { showError } from "@/lib/toast";
import { flushSync } from "react-dom";
import { Project } from "@/features/projects/types";

type TaskBoardProps = {
  userRole: ProjectRole | null;
  projectMembers: ProjectMember[];
  initialTasks: Task[];
  project: Project | null;
};

export default function TaskBoard({
  userRole,
  projectMembers,
  initialTasks,
  project,
}: TaskBoardProps) {
  const [tasks, setTasks] = useState<TasksState>(() =>
    normalizeTasks(initialTasks),
  );

  useEffect(() => {
    setTasks(normalizeTasks(initialTasks));
  }, [initialTasks]);

  const handleTaskChange = async (taskId: string, targetStatus: TaskStatus) => {
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
      console.error(error);
      showError("Error updating task status.");
    }
  };

  return (
    <DragDropProvider
      onDragStart={(event) => {
        console.log("Started dragging", event.operation.source?.id);
      }}
      onDragMove={({ operation }) => {
        const { position } = operation;
        console.log("Current position:", position);
      }}
      onDragOver={(event) => {
        console.log(
          `${event.operation.source?.id} is over ${event.operation.target?.id}`,
        );
      }}
      onDragEnd={(event) => {
        if (event.operation.target && event.operation.source) {
          const taskId = event.operation.source.id?.toString();
          const targetStatus = event.operation.target.id as TaskStatus;

          if (taskId) {
            void handleTaskChange(taskId, targetStatus);
          }
        }
      }}
    >
      {project && <TaskRealtimeSync projectId={project.id} />}
      <TaskBoardBasic
        userRole={userRole}
        members={projectMembers}
        tasksState={tasks}
        project={project}
      />
    </DragDropProvider>
  );
}
