"use client";

import InfoBlock from "../../../components/ui/composed/InfoBlock";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SurfaceRow } from "../../../components/ui/surface/SurfaceItem";
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
    <InfoBlock
      className="relative w-[calc(var(--sidebar-width)-var(--page-padding-inline))] justify-between"
      title="User"
    >
      <SurfaceRow onClick={onUserClick}>
        <span className="text-label">
          {userName ? userName : "Not logged in"}{" "}
        </span>
        {online !== null && isUserOpen ? (
          <ChevronUp strokeWidth={1.25} size={16} />
        ) : (
          <ChevronDown strokeWidth={1.25} size={16} />
        )}
      </SurfaceRow>
      {children}
    </InfoBlock>
  );
}
