"use client";

import InfoBlock from "../ui/InfoBlock";
import { ChevronDown } from "lucide-react";

type UserInfoProps = {
  userName: string | null;
  online: boolean | null;
};

export default function UserInfo({ userName, online }: UserInfoProps) {
  //mock members data

  return (
    <div className="flex flex-row px-4 gap-12 min-width-[200px]">
      <InfoBlock
        title="User"
        content={
          <div className="flex flex-row gap-2 items-center">
            <span className="font-medium text-meta">
              {userName ? userName : "Not logged in"}{" "}
            </span>
            {online !== null && (
              <ChevronDown
                size={24}
                className="text-meta cursor-pointer hover:bg-meta/10 rounded"
              />
            )}
          </div>
        }
      />
    </div>
  );
}
