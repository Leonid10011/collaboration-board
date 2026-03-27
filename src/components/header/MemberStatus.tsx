import { CheckCircle, Circle, CircleIcon } from "lucide-react";
import Image from "next/image";

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
  return (
    <div className="flex flex-row gap-2 justify-center items-center">
      <Image
        width={16}
        height={16}
        alt="Image"
        src={img_url}
        className="rounded-full"
      />
      <span className="font-semibold text-meta">{name}</span>
      <CircleIcon size={16} color={`${online ? "green" : "red"}`}></CircleIcon>
    </div>
  );
}
