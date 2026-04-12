import {
  Task,
  TaskPriority,
  TaskStatus,
  UpdateTaskInput,
} from "@/domain/tasks";
import ModalShell from "../modal/ModalShell";
import UpdateTaskModalForm from "./updateTaskModal/UpdateTaskModalForm";
import { useState } from "react";
import { useTask } from "@/context/TaskContext";
import { showError, showSuccess } from "@/lib/toast";

type UpdateModalTask = {
  selectedTask: Task;
  onModalClose: () => void;
};

export default function UpdateTaskModal({
  selectedTask,
  onModalClose,
}: UpdateModalTask) {
  const handleClose = () => {
    onModalClose();
  };

  const { patchTask } = useTask();

  const [title, setTitle] = useState<string>(selectedTask.title);
  const [description, setDescription] = useState<string>(
    selectedTask.description ? selectedTask.description : "",
  );
  const [priority, setPriority] = useState<TaskPriority>(selectedTask.priority);
  const [status, setStatus] = useState<TaskStatus>(selectedTask.status);

  const handleConfirm = async () => {
    const updates: UpdateTaskInput = {};

    const nextTitle = title.trim();
    if (!nextTitle) {
      showError("Title is required");
      return;
    }
    if (nextTitle !== selectedTask.title) {
      updates.title = nextTitle;
    }
    const nextDescription = description.trim();
    if (nextDescription !== selectedTask.description) {
      updates.description = nextDescription;
    }
    if (priority !== selectedTask.priority) {
      updates.priority = selectedTask.priority;
    }
    if (status !== selectedTask.status) {
      updates.status = selectedTask.status;
    }

    if (Object.keys(updates).length === 0) {
      onModalClose();
      return;
    }

    try {
      await patchTask(selectedTask.id, updates);
      showSuccess("Task Updated!");
    } catch (error) {
      showError(`${error}`);
    }
  };

  return (
    <>
      <ModalShell
        onClose={handleClose}
        confirmLabel="Confirm"
        onConfirm={handleConfirm}
      >
        <UpdateTaskModalForm
          title={title}
          onTitleChange={setTitle}
          description={description}
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
