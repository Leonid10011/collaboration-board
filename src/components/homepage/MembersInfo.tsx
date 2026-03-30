import { Member } from "@/domain/profiles";
import MemberStatus from "../header/MemberStatus";
import InfoBlock from "../ui/InfoBlock";
import { useState } from "react";

export default function MemberInfo() {
  const [members, setMembers] = useState<Member[]>([
    {
      id: "124",
      userName: "Laura",
      imgUrl: "/images/profile_image_01.jpg",
      projectId: "1",
      projectRole: "admin",
    },
    {
      id: "123",
      userName: "Sabrina",
      imgUrl: "/images/profile_image_02.jpg",
      projectId: "1",
      projectRole: "editor",
    },
  ]);

  return (
    <InfoBlock
      title="Members"
      content={
        <div className="flex flex-row gap-2">
          {members.map((m) => (
            <MemberStatus
              key={m.id}
              name={m.userName}
              img_url={m.imgUrl}
              online={true}
            />
          ))}
        </div>
      }
    />
  );
}
