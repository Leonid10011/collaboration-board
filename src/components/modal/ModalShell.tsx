type ModalShellProps = {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
};

export default function ModalShell({
  title,
  children,
  onClose,
}: ModalShellProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-background rounded shadow-lg w-full max-w-md p-4 relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-meta hover:text-meta/90"
            aria-label="Close modal"
          >
            x
          </button>
        )}
        <h3 id="modal-title" className="text-lg font-semibold mb-2">
          {title}
        </h3>
        <div className="flex-1 w-full">{children}</div>
      </div>
    </div>
  );
}
