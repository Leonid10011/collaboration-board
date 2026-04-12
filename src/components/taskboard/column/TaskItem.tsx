import { TaskPriority } from "@/domain/tasks";
import { Trash2, User as UserIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import AssignPopup from "./taskItem/AssignPopup";
import PriorityPopup from "./taskItem/PriorityPopup";
import {
  Card,
  CardAction,
  CardItem,
  CardSplit,
  CardTitle,
} from "@/components/ui/card/Card";
import PriorityBadge from "./taskItem/PriorityBadge";
import { useDraggable } from "@dnd-kit/react";

type TaskItemProps = {
  id: string;
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
  onDelete: () => Promise<void>;
};

export default function TaskItem({
  id,
  title,
  priority,
  priorityOptions,
  assignedUserName,
  assignedUserImageUrl,
  availableAssignees,
  onAssign,
  onUnassign,
  onUpdate,
  onPriority,
  onAction,
  canAssign,
  onDelete,
}: TaskItemProps) {
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const assignRef = useRef<HTMLDivElement | null>(null);

  const [isPriorityOpen, setIsPriorityOpen] = useState<boolean>(false);
  const priorityRef = useRef<HTMLDivElement | null>(null);

  const avatarClassName = `rounded-full ${canAssign ? "hover:cursor-default" : ""}`;

  const { ref } = useDraggable({ id: id });

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
    if (!isAssignOpen) return;

    const onOutsideClick = (event: MouseEvent) => {
      if (assignRef.current?.contains(event.target as Node)) return;

      event.preventDefault();
      event.stopPropagation();
      setIsAssignOpen(false);
    };

    document.addEventListener("click", onOutsideClick, true);

    return () => {
      document.removeEventListener("click", onOutsideClick, true);
    };
  }, [isAssignOpen]);

  useEffect(() => {
    if (!isPriorityOpen) return;

    const onOutsideClick = (event: MouseEvent) => {
      if (priorityRef.current?.contains(event.target as Node)) return;

      event.preventDefault();
      event.stopPropagation();
      setIsPriorityOpen(false);
    };

    document.addEventListener("click", onOutsideClick, true);

    return () => {
      document.removeEventListener("click", onOutsideClick, true);
    };
  }, [isPriorityOpen]);

  return (
    <Card className="relative group" ref={ref}>
      {canAssign && (
        <button
          type="button"
          className="absolute z-1 top-2 right-2 inline-flex h-6 w-6 items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 rounded-full hover:bg-red-500 transition-colors"
          onClick={onDelete}
        >
          <Trash2 size={16} />
        </button>
      )}
      <CardSplit
        className="z-0"
        onClick={canAssign ? () => onUpdate() : undefined}
      >
        {/*Left */}
        <div className="flex flex-col gap-2">
          <CardItem>
            <CardTitle>{title}</CardTitle>
          </CardItem>
          <CardItem className="relative" ref={priorityRef}>
            <div onClick={handlePriorityClick} className="text-sm">
              <PriorityBadge type={priority} />
            </div>
            {isPriorityOpen && (
              <PriorityPopup
                priorityOptions={priorityOptions}
                onPriority={handlePriority}
              />
            )}
          </CardItem>
        </div>
        {/* Right */}
        <div
          className="relative flex flex-col gap-2 items-center w-[80px]"
          ref={assignRef}
        >
          {assignedUserImageUrl ? (
            <Image
              width={32}
              height={32}
              src={assignedUserImageUrl}
              alt="Profile Pic"
              className={avatarClassName}
              onClick={handleAvatarClick}
            />
          ) : (
            <UserIcon
              width={32}
              height={32}
              className={`rounded-full p-1 ${canAssign ? "hover:cursor-default hover:bg-meta/10" : ""}`}
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

          {assignedUserName ? (
            <CardItem
              className="text-xs font-medium text-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {assignedUserName}
            </CardItem>
          ) : (
            <CardAction
              className="p-1 rounded-md hover:bg-meta/10"
              onClick={(e) => {
                e.stopPropagation();
                onAction();
              }}
            >
              Take
            </CardAction>
          )}
        </div>
      </CardSplit>
    </Card>
  );
}
