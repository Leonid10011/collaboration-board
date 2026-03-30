import { TaskPriority } from "@/domain/tasks";
import { User } from "@/domain/users";
import Image from "next/image";

type TaskItemProps = {
  title: string;
  priority: TaskPriority;
  user: User | null;
  onAction: () => void;
};

export default function TaskItem({
  title,
  priority,
  user,
  onAction,
}: TaskItemProps) {
  return (
    <div className="relative bg-main-1">
      <div className="flex flex-row p-4 w-full justify-between">
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-semibold">{title}</h3>
          <span>{priority}</span>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <Image
            width={32}
            height={32}
            src={user ? user.imgUrl : "/images/profile_image_01.jpg"}
            alt={"Profile Pic"}
            className="rounded-full"
          />
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
      {user && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10 rounded-md"></div>
      )}
    </div>
  );
}
