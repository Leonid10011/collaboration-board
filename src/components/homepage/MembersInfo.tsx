import { User } from "@/domain/users";
import MemberStatus from "../header/MemberStatus";
import InfoBlock from "../ui/InfoBlock";
import { useState } from "react";

export default function MemberInfo() {
  const [members, setMembers] = useState<Omit<User, "lastActive" | "email">[]>([
    {
      id: "124",
      userName: "Laura",
      imgUrl: "/images/profile_image_01.jpg",
    },
    {
      id: "123",
      userName: "Sabrina",
      imgUrl: "/images/profile_image_02.jpg",
    },
  ]);

  return (
    <InfoBlock title="Members">
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
    </InfoBlock>
  );
}
