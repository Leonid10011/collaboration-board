import ModalShell from "../modal/ModalShell";
import { TextareaField } from "../ui/TextareaField";

type CreateModalOpenProps = {
  onClose: () => void;
};

export default function CreateModalOpen({ onClose }: CreateModalOpenProps) {
  return (
    <ModalShell title="New Project" onConfirm={() => {}} onClose={onClose}>
      <>
        <TextareaField
          label="Description"
          description="Enter a short description of your Project."
          placeholder="Project Description"
        />
      </>
    </ModalShell>
  );
}
