import ModalShell from "../../../components/ui/modal/ModalShell";
import UpdateTaskModalForm from "./UpdateTaskModalForm";
import { useEffect, useState } from "react";
import { showError, showSuccess } from "@/lib/toast";
import {
  Task,
  TaskPriority,
  TaskStatus,
  UpdateTaskDetailsPayload,
} from "../types";

type UpdateModalTask = {
  selectedTask: Task;
  onModalClose: () => void;
  onUpdateTask: (
    taskId: string,
    updates: UpdateTaskDetailsPayload,
  ) => Promise<void>;
};

export default function UpdateTaskModal({
  selectedTask,
  onModalClose,
  onUpdateTask,
}: UpdateModalTask) {
  const handleClose = () => {
    onModalClose();
  };

  const [title, setTitle] = useState<string>(selectedTask.title);
  const [description, setDescription] = useState<string | null>(
    selectedTask.description ? selectedTask.description : "",
  );
  const [priority, setPriority] = useState<TaskPriority>(selectedTask.priority);
  const [status, setStatus] = useState<TaskStatus>(selectedTask.status);

  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    setTitle(selectedTask.title);
    setDescription(selectedTask.description);
    setPriority(selectedTask.priority);
    setStatus(selectedTask.status);
  }, [selectedTask]);

  const handleConfirm = async () => {
    if (isSaving) return;

    setIsSaving(true);

    try {
      const updates: UpdateTaskDetailsPayload = {};

      const nextTitle = title.trim();
      if (!nextTitle) {
        showError("Title is required");
        return;
      }
      if (nextTitle !== selectedTask.title) {
        updates.title = nextTitle;
      }

      const nextDescription = description ? description.trim() : null;
      const currentDescription = selectedTask.description ?? null;

      if (nextDescription !== currentDescription) {
        if (nextDescription) updates.description = nextDescription;
      }

      if (priority !== selectedTask.priority) {
        updates.priority = priority;
      }
      if (status !== selectedTask.status) {
        updates.status = status;
      }

      if (Object.keys(updates).length === 0) {
        onModalClose();
        setIsSaving(false);
        return;
      }
      await onUpdateTask(selectedTask.id, updates);
      showSuccess("Task Updated!");
    } catch (error) {
      showError(`${error}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <ModalShell
        onClose={handleClose}
        confirmLabel="Confirm"
        onConfirm={handleConfirm}
        isLoading={isSaving}
      >
        <UpdateTaskModalForm
          title={title}
          onTitleChange={setTitle}
          description={description ? description : ""}
          onDescriptionChange={setDescription}
          priority={priority}
          onPriorityChange={setPriority}
          status={status}
          onStatusChange={setStatus}
        />
      </ModalShell>
    </>
  );
}
