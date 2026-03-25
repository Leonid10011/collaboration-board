"use client";

import { useUser } from "@/context/UserContext";
import InfoBlock from "../ui/InfoBlock";

export default function UserInfo() {
  const { user, error } = useUser();

  //mock members data

  return (
    <div className="flex flex-row px-4 py-2 gap-12">
      <InfoBlock title="User" content={<span>{user?.name}</span>} />
    </div>
  );
}
