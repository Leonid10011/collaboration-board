type ModalShellProps = {
  children: React.ReactNode;
  onClose: (value: boolean) => void;
  confirmLabel?: string;
  onConfirm: () => void;
  isLoading: boolean;
};

export default function ModalShell({
  children,
  onClose,
  confirmLabel,
  onConfirm,
  isLoading,
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
        className="fixed inset-0  backdrop-blur-md flex items-center justify-center z-10"
        onClick={handleClose}
      />
      <div className="bg-main-1 border-2 rounded-md shadow-lg w-full max-w-2xl p-16 pb-32 z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex-1 w-full">{children}</div>
        <button
          disabled={isLoading}
          className="absolute bottom-8 right-16 bg-main-2 px-4 py-2 rounded-md hover:cursor-default"
          onClick={handleConfirm}
        >
          {confirmLabel ? confirmLabel : "Confirm"}
        </button>
      </div>
    </div>
  );
}
