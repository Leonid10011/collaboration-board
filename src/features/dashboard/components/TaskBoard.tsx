"use client";

import { DragDropProvider } from "@dnd-kit/react";
import TaskBoardBasic from "../../tasks/components/TaskBoardBasic";
import { useTask } from "@/context/TaskContext";
import { TaskStatus } from "@/domain/tasks";

export default function TaskBoard() {
  const { optimistic_changeStatus } = useTask();

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
          if (event.operation.source.id)
            optimistic_changeStatus(
              event.operation.source.id.toString(),
              event.operation.target.id as TaskStatus,
            );
        }
      }}
    >
      <TaskBoardBasic />
    </DragDropProvider>
  );
}
