import { Member } from "@/domain/profiles";
import MemberStatus from "../header/MemberStatus";
import InfoBlock from "../ui/InfoBlock";
import { useState } from "react";

export default function MemberInfo() {
  const [members, setMembers] = useState<Member[]>([
    {
      id: "124",
      name: "Laura",
      online: true,
      img_url: "/images/profile_image_01.jpg",
    },
    {
      id: "123",
      name: "Sabrina",
      online: false,
      img_url: "/images/profile_image_02.jpg",
    },
  ]);

  return (
    <InfoBlock
      title="Members"
      content={
        <div className="flex flex-row gap-1">
          {members.map((m) => (
            <MemberStatus
              key={m.id}
              name={m.name}
              img_url={m.img_url}
              online={m.online}
            />
          ))}
        </div>
      }
    />
  );
}
