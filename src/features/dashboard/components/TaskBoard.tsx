"use client";

import { DragDropProvider } from "@dnd-kit/react";
import TaskBoardBasic from "../../tasks/components/TaskBoardBasic";
import { ProjectMember, ProjectRole } from "@/features/memberships/types";
import { Task, TasksState, TaskStatus } from "@/features/tasks/types";
import { useSelectedProject } from "../context/SelectedProjectContext";
import { TaskRealtimeSync } from "@/features/tasks/components/TaskRealtimeSync";
import { useState } from "react";
import { normalizeTasks } from "@/features/tasks/utils";

type TaskBoardProps = {
  userRole: ProjectRole | null;
  projectMembers: ProjectMember[];
  tasksState: TasksState | null;
  initialTasks: Task[];
};

export default function TaskBoard({
  userRole,
  projectMembers,
  initialTasks,
}: TaskBoardProps) {
  const { selectedProjectId } = useSelectedProject();

  const [tasks, setTasks] = useState<TasksState>(() =>
    normalizeTasks(initialTasks),
  );

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
          console.log(
            `Dropped ${event.operation.source?.id} onto ${event.operation.target.id}`,
          );
          /**
           if (event.operation.source.id)
             optimistic_changeStatus(
               event.operation.source.id.toString(),
               event.operation.target.id as TaskStatus,
             );
           * 
           */
        }
      }}
    >
      {selectedProjectId && <TaskRealtimeSync projectId={selectedProjectId} />}
      <TaskBoardBasic
        userRole={userRole}
        members={projectMembers}
        tasksState={tasks}
      />
    </DragDropProvider>
  );
}
