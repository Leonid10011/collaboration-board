import { useState } from "react";
import ModalShell from "../modal/ModalShell";
import { showSuccess } from "@/lib/toast";
import TaskModalForm from "./createTaskModal/TaskModalForm";
import {
  CreateTaskInput,
  Task,
  TaskPriority,
  TaskStatus,
} from "@/domain/tasks";
import { useProject } from "@/context/ProjectContext";
import { useUser } from "@/context/UserContext";
import { useTask } from "@/context/TaskContext";

type CreateTaskItemProps = {
  onModalClose: () => void;
  newStatus: TaskStatus;
  onStatus: (s: TaskStatus) => void;
};

export default function CreateTaskModal({
  onModalClose,
  newStatus,
  onStatus,
}: CreateTaskItemProps) {
  const [title, setTitle] = useState<string>("New Task");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<TaskPriority>("medium");

  const { selectedProject } = useProject();
  const { user } = useUser();
  const { saveTask } = useTask();

  const handlePriority = (value: TaskPriority) => {
    setPriority(value);
  };

  const handleDescription = (value: string) => {
    setDescription(value);
  };

  const handelTitleChange = (text: string) => {
    setTitle(text);
  };

  const handleClose = () => {
    onModalClose();
  };

  const handleConfirm = () => {
    if (!selectedProject || !user) return;

    const dataToSend: CreateTaskInput = {
      projectId: selectedProject.id,
      creatorId: user.id,
      title: title,
      description: description,
      status: newStatus,
      priority: priority,
    };

    saveTask(dataToSend);

    showSuccess("Task Added!");
    onModalClose();
  };

  return (
    <ModalShell onClose={handleClose} onConfirm={handleConfirm}>
      <input
        placeholder={title}
        className="w-full text-4xl font-bold placeholder-gray-300 border-none outline-none bg transparent focus:ring-0 mb-8"
        onChange={(e) => handelTitleChange(e.currentTarget.value)}
      />
      <TaskModalForm
        description={description}
        onDescription={handleDescription}
        status={newStatus}
        onStatus={onStatus}
        priority={priority}
        onPriority={handlePriority}
      />
    </ModalShell>
  );
}
