import { CheckCircle, Circle, CircleIcon } from "lucide-react";
import Image from "next/image";
import { SurfaceRow } from "../ui/surface/SurfaceItem";

type MemberStatus = {
  name: string;
  img_url: string;
  online: boolean;
};

/**
 * This component shows profile image, name and online status.
 * It is mainly used to show members of project in the header
 */
export default function MemberStatus({ name, img_url, online }: MemberStatus) {
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
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-orange-500",
    ];

    let hash = 0;
    for (let i = 0; i < seed.length; i++) hash += seed.charCodeAt(i);

    return colors[hash % colors.length];
  }

  const initials = getInitials(name);
  const colorClass = getAvatarColor(name);

  return (
    <SurfaceRow className="gap-2 bg-green-200 hover:bg-green-100 hover:cursor-default">
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
      <span className="font-semibold text-meta">{name}</span>
    </SurfaceRow>
  );
}
