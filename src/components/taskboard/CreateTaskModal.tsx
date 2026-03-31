import { useState } from "react";
import ModalShell from "../modal/ModalShell";
import { showError, showSuccess } from "@/lib/toast";
import TaskModalForm from "./createTaskModal/TaskModalForm";
import { Task, TaskPriority, TaskStatus } from "@/domain/tasks";
import { useProject } from "@/context/ProjectContext";
import { useUser } from "@/context/UserContext";
import { insertTask } from "@/repository/repository-tasks";

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

  const { selectedProject, addTask } = useProject();
  const { user } = useUser();

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

    const dataToSend: Omit<Task, "id"> = {
      projectId: selectedProject.id,
      creatorId: user.id,
      title: title,
      description: description,
      status: newStatus,
      priority: priority,
    };

    addTask(dataToSend);

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
