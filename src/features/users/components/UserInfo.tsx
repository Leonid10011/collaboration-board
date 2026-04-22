"use client";

import InfoBlock from "../../../components/ui/composed/InfoBlock";
import { ChevronDown, ChevronUp, LogOutIcon } from "lucide-react";
import { SurfaceRow } from "../../../components/ui/surface/SurfaceItem";
import React, { useRef, useState } from "react";
import { useAuth } from "@/features/auth/AuthContext";
import { useRouter } from "next/navigation";

type UserInfoProps = {
  userName: string | null;
};

export default function UserInfo({ userName }: UserInfoProps) {
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const [isUserOpen, setIsUserOpen] = useState<boolean>(false);
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

  const { signout } = useAuth();

  const router = useRouter();

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signout();
      router.replace("/login");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="flex flex-row gap-16" ref={userMenuRef}>
      <InfoBlock
        className="relative w-[calc(var(--sidebar-width)-var(--page-padding-inline))] justify-between"
        title="User"
      >
        <SurfaceRow onClick={() => setIsUserOpen((prev) => !prev)}>
          <span className="text-label">
            {userName ? userName : "Not logged in"}{" "}
          </span>
          {isUserOpen ? (
            <ChevronUp strokeWidth={1.25} size={16} />
          ) : (
            <ChevronDown strokeWidth={1.25} size={16} />
          )}
        </SurfaceRow>
        {isUserOpen && (
          <div className="absolute top-15 left-0 z-20 w-[calc(var(--sidebar-width)-var(--page-padding-inline))] rounded-md shadow bg-main-1 p-1">
            <div
              className={`max-h-44 overflow-y-auto ${isSigningOut ? "disabled" : ""}`}
            >
              <SurfaceRow
                className="text-sm font-regular"
                onClick={handleSignOut}
              >
                <LogOutIcon strokeWidth={1.25} size={16} /> Logout
              </SurfaceRow>
            </div>
          </div>
        )}
      </InfoBlock>
    </div>
  );
}
