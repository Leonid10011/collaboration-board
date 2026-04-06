"use client";

import InfoBlock from "../ui/InfoBlock";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SurfaceRow } from "../ui/surface/SurfaceItem";
import React from "react";

type UserInfoProps = {
  userName: string | null;
  online: boolean | null;
  isUserOpen: boolean;
  onUserClick: () => void;
  children: React.ReactNode;
};

export default function UserInfo({
  userName,
  online,
  isUserOpen,
  onUserClick,
  children,
}: UserInfoProps) {
  //mock members data

  return (
    <InfoBlock className="relative w-sidebar" title="User">
      <SurfaceRow onClick={onUserClick}>
        <span className="font-medium text-meta">
          {userName ? userName : "Not logged in"}{" "}
        </span>
        {online !== null && isUserOpen ? (
          <ChevronUp size={16} />
        ) : (
          <ChevronDown size={16} />
        )}
      </SurfaceRow>
      {children}
    </InfoBlock>
  );
}
