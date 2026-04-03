type AssignPopupProps = {
  assignedUserName: string | null;
  onUnassign: () => void;
  onAssign: (id: string) => void;
  availableAssignees: { id: string; label: string }[];
};

export default function AssignPopup({
  assignedUserName,
  onUnassign,
  onAssign,
  availableAssignees,
}: AssignPopupProps) {
  return (
    <div
      className="absolute top-10 right-0 z-20 w-48 rounded-md border border-white/10 bg-main-2 p-2 shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="px-2 pb-1 text-xs text-gray-300">Assign user</p>
      {assignedUserName && (
        <>
          <button
            type="button"
            className="w-full rounded px-2 py-1 text-left text-sm text-red-300 hover:bg-main-1"
            onClick={onUnassign}
          >
            Unassign
          </button>
          <div className="my-1 h-px bg-white/10" />
        </>
      )}
      <div className="max-h-44 overflow-y-auto">
        {availableAssignees.length > 0 ? (
          availableAssignees.map((candidate) => (
            <button
              key={candidate.id}
              type="button"
              className="w-full rounded px-2 py-1 text-left text-sm hover:bg-main-1"
              onClick={() => onAssign(candidate.id)}
            >
              {candidate.label}
            </button>
          ))
        ) : (
          <p className="px-2 py-1 text-sm text-gray-400">
            No members available
          </p>
        )}
      </div>
    </div>
  );
}
