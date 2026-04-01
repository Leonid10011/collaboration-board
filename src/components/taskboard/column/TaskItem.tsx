import { useProject } from "@/context/ProjectContext";
import { TaskPriority } from "@/domain/tasks";
import { User } from "@/domain/users";
import { User as UserIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type TaskItemProps = {
  title: string;
  priority: TaskPriority;
  user: User | null;
  availableUsers: User[];
  onAction: () => void;
  onAssign: (userId: string) => void;
  onUpdate: () => void;
};

export default function TaskItem({
  title,
  priority,
  user,
  availableUsers,
  onAction,
  onAssign,
  onUpdate,
}: TaskItemProps) {
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const assignRef = useRef<HTMLDivElement | null>(null);
  const { userRole } = useProject();

  const isAdmin = userRole === "admin";
  const canOpenAssign = isAdmin;
  const avatarClassName = `rounded-full ${isAdmin ? "hover:cursor-pointer" : ""}`;

  const handleAvatarClick = () => {
    if (!canOpenAssign) return;
    setIsAssignOpen((prev) => !prev);
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

  return (
    <div className="relative bg-main-1">
      <div
        className="flex flex-row p-4 w-full justify-between"
        onClick={onUpdate}
      >
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-semibold">{title}</h3>
          <span>{priority}</span>
        </div>
        <div
          className="relative flex flex-col gap-2 items-center"
          ref={assignRef}
        >
          {user ? (
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
              className={`rounded-full hover:bg-gray-700/50 p-1 ${isAdmin ? "hover:cursor-pointer" : ""}`}
              onClick={handleAvatarClick}
            />
          )}

          {isAssignOpen && (
            <div className="absolute top-10 right-0 z-20 w-48 rounded-md border border-white/10 bg-main-2 p-2 shadow-lg">
              <p className="px-2 pb-1 text-xs text-gray-300">Assign user</p>
              <div className="max-h-44 overflow-y-auto">
                {availableUsers.length > 0 ? (
                  availableUsers.map((candidate) => (
                    <button
                      key={candidate.id}
                      type="button"
                      className="w-full rounded px-2 py-1 text-left text-sm hover:bg-main-1"
                      onClick={() => {
                        onAssign(candidate.id);
                        setIsAssignOpen(false);
                      }}
                    >
                      {candidate.userName}
                    </button>
                  ))
                ) : (
                  <p className="px-2 py-1 text-sm text-gray-400">
                    No members available
                  </p>
                )}
              </div>
            </div>
          )}

          <span className="text-sm">
            {user ? user.userName : "Not assigned"}
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
