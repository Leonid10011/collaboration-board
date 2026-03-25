"use client";

import { useUser } from "@/context/UserContext";
import InfoBlock from "../ui/InfoBlock";
import { useState } from "react";
import { Member } from "@/domain/profiles";
import MemberStatus from "../header/MemberStatus";

export default function UserInfo() {
  const { user, error } = useUser();
  //Will be replaced
  const [projectTitle, setProjectTitle] = useState<string>("Account Dashboard"); // example
  //mock members data
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
    <div className="flex flex-row px-4 py-2 gap-12">
      <div className="flex flex-row gap-16">
        <InfoBlock title="User" content={<span>{user?.name}</span>} />
        <InfoBlock
          title="Project Info"
          content={
            <div className="flex flex-row gap-4">
              <span className="text-green-600">Admin</span>
              <span className="text-meta">Project Name</span>
            </div>
          }
        />
      </div>
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
    </div>
  );
}
