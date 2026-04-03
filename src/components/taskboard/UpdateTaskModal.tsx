import { Task, TaskPriority } from "@/domain/tasks";
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

  const handleConfirm = async () => {
    try {
      await patchTask(selectedTask.id, {
        title: title,
        description: description,
        priority: priority,
      });
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
        />
      </ModalShell>
    </>
  );
}
