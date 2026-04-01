import { Task } from "@/domain/tasks";
import ModalShell from "../modal/ModalShell";

type UpdateModalTask = {
  task: Task;
  onModalClose: () => void;
};

export default function UpdateTaskModal({
  task,
  onModalClose,
}: UpdateModalTask) {
  const handleClose = () => {
    onModalClose();
  };
  return (
    <>
      <ModalShell
        onClose={handleClose}
        confirmLabel="Confirm"
        onConfirm={() => {}}
      >
        <div>task</div>
      </ModalShell>
    </>
  );
}
