import { User } from "@/domain/users";

type MemberBadgeProps = {
  user: User;
  onDelete: (id: string) => void;
};

export function MemberBadge({ user, onDelete }: MemberBadgeProps) {
  return (
    <div className="flex flex-row gap-4 py-2 px-4 rounded-md shadow-md bg-main-2">
      <span>{user.userName}</span>
      <span
        className="rounded px-2 hover:bg-main-1 hover:cursor-default"
        onClick={() => onDelete(user.id)}
      >
        x
      </span>
    </div>
  );
}
