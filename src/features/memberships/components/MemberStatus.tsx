import { SurfaceRow } from "@/components/ui/surface/SurfaceItem";
import Image from "next/image";

type MemberStatus = {
  name: string;
  img_url: string | null;
  online: boolean;
};

/**
 * This component shows profile image, name and online status.
 * It is mainly used to show members of project in the header
 */
export default function MemberStatus({ name, img_url }: MemberStatus) {
  function getInitials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  function getAvatarColor(seed: string) {
    const colors = [
      "bg-red-200",
      "bg-blue-200",
      "bg-green-200",
      "bg-purple-200",
      "bg-pink-200",
      "bg-orange-200",
    ];

    let hash = 0;
    for (let i = 0; i < seed.length; i++) hash += seed.charCodeAt(i);

    return colors[hash % colors.length];
  }

  const initials = getInitials(name);
  const colorClass = getAvatarColor(name);

  return (
    <SurfaceRow className="gap-2 bg-card hover:bg-meta/5 hover:cursor-default p-1">
      {img_url ? (
        <Image
          width={16}
          height={16}
          alt="Image"
          src={img_url}
          className="rounded-full"
        />
      ) : (
        <div
          className={`flex h-5 w-5 items-center justify-center rounded-full text-white text-sm ${colorClass}`}
        >
          {initials}
        </div>
      )}
      <span className="text-label">{name}</span>
    </SurfaceRow>
  );
}
