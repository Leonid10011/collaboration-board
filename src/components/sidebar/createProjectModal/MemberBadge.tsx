import { Profile } from "@/domain/profiles";

type MemberBadgeProps = {
  profile: Profile;
  onDelete: (id: string) => void;
};

export function MemberBadge({ profile, onDelete }: MemberBadgeProps) {
  return (
    <div className="flex flex-row gap-4 py-2 px-4 rounded-md shadow-md bg-main-2">
      <span>{profile.userName}</span>
      <span
        className="rounded px-2 hover:bg-main-1 hover:cursor-pointer"
        onClick={() => onDelete(profile.id)}
      >
        x
      </span>
    </div>
  );
}
