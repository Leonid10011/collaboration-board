import { TaskPriority } from "@/domain/tasks";
import { Trash, Trash2, User as UserIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import AssignPopup from "./taskItem/AssignPopup";
import PriorityPopup from "./taskItem/PriorityPopup";
import { toUpper } from "@/lib/utils";
import {
  Card,
  CardAction,
  CardHeader,
  CardItem,
  CardSplit,
  CardTitle,
} from "@/components/ui/card/Card";
import { SurfaceItem } from "@/components/ui/surface/SurfaceItem";

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
  onDelete: () => Promise<void>;
};

export default function TaskItem({
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
    <Card className="relative group">
      <button
        type="button"
        className="absolute top-2 right-2 inline-flex h-6 w-6 items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 rounded-full hover:bg-red-500 transition-colors"
        onClick={onDelete}
      >
        <Trash2 size={16} />
      </button>
      <CardHeader />
      <CardSplit onClick={onUpdate}>
        {/*Left */}
        <div className="flex flex-col">
          <CardItem>
            <CardTitle>{title}</CardTitle>
          </CardItem>
          <CardItem className="relative" ref={priorityRef}>
            <div onClick={handlePriorityClick} className="text-sm">
              {toUpper(priority)}
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

          {assignedUserName ? (
            <CardItem onClick={(e) => e.stopPropagation()}>
              {assignedUserName}
            </CardItem>
          ) : (
            <CardAction
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
