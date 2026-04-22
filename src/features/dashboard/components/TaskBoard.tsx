//src/features/dashboard/components/TaskBoard.tsx
"use client";

import { DragDropProvider } from "@dnd-kit/react";
import TaskBoardView from "../../tasks/components/TaskBoardView";
import { ProjectMember, ProjectRole } from "@/features/memberships/types";
import { Task } from "@/features/tasks/types";
import { TaskStatus } from "@/domain/tasks";
import { Project } from "@/features/projects/types";
import useTaskBoardState from "@/features/tasks/hooks/useTaskBoardstate";
import useRealTimeSync from "@/features/tasks/hooks/useRealTimeSync";
import useTaskBoardStateActions from "@/features/tasks/hooks/useTaskBoardActions";

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
  const { tasks, setTasks } = useTaskBoardState({ initialTasks });

  const {
    handleStatusChange,
    handleAssignTask,
    handleChangePriority,
    handleDeleteTask,
    handleUnassignTask,
    handleUpdateTask,
  } = useTaskBoardStateActions({ tasks, setTasks });

  useRealTimeSync({ projectId: project ? project.id : "", setTasks });

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
            void handleStatusChange(taskId, targetStatus);
          }
        }
      }}
    >
      <TaskBoardView
        userRole={userRole}
        members={projectMembers}
        tasksState={tasks}
        project={project}
        handleAssignTask={handleAssignTask}
        handleUnassignTask={handleUnassignTask}
        handleChangePriority={handleChangePriority}
        handleDeleteTask={handleDeleteTask}
        handleUpdateTask={handleUpdateTask}
      />
    </DragDropProvider>
  );
}
