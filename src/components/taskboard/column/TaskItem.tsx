import { TaskPriority } from "@/domain/tasks";
import { User as UserIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import AssignPopup from "./taskItem/AssignPopup";
import PriorityPopup from "./taskItem/PriorityPopup";
import { toUpper } from "@/lib/utils";

type TaskItemProps = {
  title: string;
  priority: TaskPriority;
  priorityOptions: readonly TaskPriority[];
  assignedUserName: string | null;
  assignedUserImageUrl: string | null;
  availableAssignees: { id: string; label: string }[];
  onAction: () => void;
  onAssign: (userId: string) => void;
  onUnassign: () => void;
  onUpdate: () => void;
  onPriority: (priority: TaskPriority) => void;
  canAssign: boolean;
};

export default function TaskItem({
  title,
  priority,
  priorityOptions,
  assignedUserName,
  assignedUserImageUrl,
  availableAssignees,
  onAction,
  onAssign,
  onUnassign,
  onUpdate,
  onPriority,
  canAssign,
}: TaskItemProps) {
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const assignRef = useRef<HTMLDivElement | null>(null);

  const [isPriorityOpen, setIsPriorityOpen] = useState<boolean>(false);
  const priorityRef = useRef<HTMLDivElement | null>(null);

  const avatarClassName = `rounded-full ${canAssign ? "hover:cursor-pointer" : ""}`;

  const handleAvatarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!canAssign) return;
    setIsAssignOpen((prev) => !prev);
  };

  const handlePriorityClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPriorityOpen((prev) => !prev);
  };

  const handleUnassign = () => {
    onUnassign();
    setIsAssignOpen(false);
  };

  const handleAssign = (_id: string) => {
    onAssign(_id);
    setIsAssignOpen(false);
  };

  const handlePriority = (_priority: TaskPriority) => {
    onPriority(_priority);
    setIsPriorityOpen(false);
  };

  useEffect(() => {
    const onOutsideClick = (event: MouseEvent) => {
      if (!assignRef.current) return;
      if (!assignRef.current.contains(event.target as Node)) {
        setIsAssignOpen(false);
      }
    };

    if (isAssignOpen) {
      document.addEventListener("mousedown", onOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", onOutsideClick);
    };
  }, [isAssignOpen]);

  useEffect(() => {
    const onOutsideClick = (event: MouseEvent) => {
      if (!priorityRef.current) return;
      if (!priorityRef.current.contains(event.target as Node)) {
        setIsPriorityOpen(false);
      }
    };

    if (isPriorityOpen) {
      document.addEventListener("mousedown", onOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", onOutsideClick);
    };
  }, [isPriorityOpen]);

  return (
    <div className="relative bg-main-1">
      <div
        className="flex flex-row p-4 w-full justify-between"
        onClick={onUpdate}
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium">{title}</h3>
          <div className="relative hover:cursor-pointer" ref={priorityRef}>
            <span onClick={handlePriorityClick} className="text-sm">
              {toUpper(priority)}
            </span>
            {isPriorityOpen && (
              <PriorityPopup
                priorityOptions={priorityOptions}
                onPriority={handlePriority}
              />
            )}
          </div>
        </div>
        <div
          className="relative flex flex-col gap-2 items-center"
          ref={assignRef}
        >
          {assignedUserImageUrl ? (
            <Image
              width={32}
              height={32}
              src="/images/profile_image_01.jpg"
              alt="Profile Pic"
              className={avatarClassName}
              onClick={handleAvatarClick}
            />
          ) : (
            <UserIcon
              width={32}
              height={32}
              className={`rounded-full hover:bg-gray-700/50 p-1 ${canAssign ? "hover:cursor-pointer" : ""}`}
              onClick={handleAvatarClick}
            />
          )}

          {isAssignOpen && (
            <AssignPopup
              assignedUserName={assignedUserName}
              onUnassign={handleUnassign}
              onAssign={handleAssign}
              availableAssignees={availableAssignees}
            />
          )}

          <span className="text-sm">
            {assignedUserName ? assignedUserName : "Not assigned"}
          </span>
        </div>
      </div>
      <div className="flex flex-row flex-1 justify-end p-4">
        <div
          className="p-2 bg-main-2 rounded-md hover:cursor-pointer hover:shadow-sm"
          onClick={onAction}
        >
          Take Task
        </div>
      </div>
    </div>
  );
}
