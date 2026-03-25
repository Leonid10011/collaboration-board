import { CheckCircle } from "lucide-react";
import Image from "next/image";

type MemberStatus = {
  name: string;
  img_url: string;
  online: boolean;
};

export default function MemberStatus({ name, img_url, online }: MemberStatus) {
  return (
    <div className="flex flex-row gap-1">
      <Image width={16} height={16} alt="Image" src={img_url} />
      <span>{name}</span>
      <CheckCircle color={`${online ? "green" : "red"}`}></CheckCircle>
    </div>
  );
}
