import { useState } from "react";
import ModalShell from "../modal/ModalShell";
import { showSuccess } from "@/lib/toast";
import TaskModalForm from "./createTaskModal/TaskModalForm";
import { TaskPriority, TaskStatus } from "@/domain/tasks";

type CreateTaskItemProps = {
  onModalClose: () => void;
};

export default function CreateTaskModal({ onModalClose }: CreateTaskItemProps) {
  const [title, setTitle] = useState<string>("New Task");

  const [status, setStatus] = useState<TaskStatus>("backlog");
  const [priority, setPriority] = useState<TaskPriority>("medium");

  const handleStatus = (value: TaskStatus) => {
    setStatus(value);
  };

  const handlePriority = (value: TaskPriority) => {
    setPriority(value);
  };

  const handelTitleChange = (text: string) => {
    setTitle(text);
  };

  const handleClose = () => {
    onModalClose();
  };

  const handleConfirm = () => {
    showSuccess("Task Added!");
    onModalClose();
  };

  return (
    <ModalShell
      title={title}
      onTitleChange={handelTitleChange}
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <TaskModalForm
        status={status}
        onStatus={handleStatus}
        priority={priority}
        onPriority={handlePriority}
      />
    </ModalShell>
  );
}
