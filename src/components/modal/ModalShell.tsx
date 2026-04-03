type ModalShellProps = {
  title: string;
  onTitleChange: (value: string) => void;
  children: React.ReactNode;
  onClose: (value: boolean) => void;
  confirmLabel?: string;
  onConfirm: () => void;
};

export default function ModalShell({
  title,
  onTitleChange,
  children,
  onClose,
  confirmLabel,
  onConfirm,
}: ModalShellProps) {
  const handleClose = () => {
    onClose(false);
  };

  const handleConfirm = () => {
    onConfirm();
    onClose(false);
  };

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div
        className="fixed inset-0  backdrop-blur-md flex items-center justify-center"
        onClick={handleClose}
      />
      <div className="bg-main-1 border-2 rounded-md shadow-lg w-full max-w-2xl p-16 pb-32 z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <input
          placeholder={title}
          className="w-full text-4xl font-bold placeholder-gray-300 border-none outline-none bg transparent focus:ring-0 mb-8"
          onChange={(e) => onTitleChange(e.currentTarget.value)}
        />
        <div className="flex-1 w-full">{children}</div>
        <button
          className="absolute bottom-8 right-16 bg-main-2 px-4 py-2 rounded-md hover:cursor-pointer"
          onClick={handleConfirm}
        >
          {confirmLabel ? confirmLabel : "Confirm"}
        </button>
      </div>
    </div>
  );
}
