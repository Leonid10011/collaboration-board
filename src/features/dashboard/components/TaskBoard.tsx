//src/features/dashboard/components/TaskBoard.tsx
"use client";

import { DragDropProvider } from "@dnd-kit/react";
import TaskBoardView from "../../tasks/components/TaskBoardView";
import { ProjectMember, ProjectRole } from "@/features/memberships/types";
import { Task, TaskStatus } from "@/features/tasks/types";
import { Project } from "@/features/projects/types";
import useTaskBoardState from "@/features/tasks/hooks/useTaskBoardstate";
import useRealTimeSync from "@/features/tasks/hooks/useRealTimeSync";
import useTaskBoardStateActions from "@/features/tasks/hooks/useTaskBoardActions";

type TaskBoardProps = {
  userRole: ProjectRole | null;
  projectMembers: ProjectMember[];
  initialTasks: Task[];
  project: Project | null;
  userId: string;
};

export default function TaskBoard({
  userRole,
  projectMembers,
  initialTasks,
  project,
  userId,
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
      onBeforeDragStart={(event) => {
        // check if task assignee Id matches current user id, if not prevent dragging
        const eventSource = event.operation.source;
        if (!eventSource) return;

        const taskId = eventSource.id;
        const task = tasks.byId[taskId];

        if (task.assigneeId !== userId && userRole !== ("admin" as ProjectRole))
          event.preventDefault();
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
