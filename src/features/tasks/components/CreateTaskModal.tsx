import { useState } from "react";
import ModalShell from "../../../components/ui/modal/ModalShell";
import { showError, showSuccess } from "@/lib/toast";
import TaskModalForm from "./TaskModalForm";
import { CreateTaskInput, TaskPriority, TaskStatus } from "@/domain/tasks";
import { useTask } from "@/context/TaskContext";
import { useSelectedProject } from "@/features/dashboard/context/SelectedProjectContext";
import { useAuth } from "@/features/auth/AuthContext";

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

  const [isSaving, setIsSaving] = useState<boolean>(false);

  const { selectedProject } = useSelectedProject();
  const { user } = useAuth();
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

  const handleConfirm = async () => {
    if (isSaving) return;
    setIsSaving(true);

    if (!selectedProject || !user) return;

    const dataToSend: CreateTaskInput = {
      projectId: selectedProject.id,
      creatorId: user.id,
      title: title,
      assgineeId: null,
      description: description,
      status: newStatus,
      priority: priority,
    };
    try {
      await saveTask(dataToSend);
      showSuccess("Task Added!");
      onModalClose();
    } catch (error) {
      showError(`Error creating Task. ${error}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ModalShell
      onClose={handleClose}
      onConfirm={handleConfirm}
      isLoading={isSaving}
    >
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
