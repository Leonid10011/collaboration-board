"use client";

import { useUser } from "@/context/UserContext";
import InfoBlock from "../ui/InfoBlock";
import { ChevronDown } from "lucide-react";

export default function UserInfo() {
  const { user } = useUser();

  //mock members data

  return (
    <div className="flex flex-row px-4 gap-12 min-width-[200px]">
      <InfoBlock
        title="User"
        content={
          <div className="flex flex-row gap-2 items-center">
            <span className="font-medium text-meta">{user?.name} </span>
            <ChevronDown
              size={24}
              className="text-meta cursor-pointer hover:bg-meta/10 rounded"
            />
          </div>
        }
      />
    </div>
  );
}
