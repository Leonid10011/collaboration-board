import { Database } from "@/lib/database.types";

// features/memberships/types.ts
export type ProjectRole = Database["public"]["Enums"]["enum_role"];

export type ProjectMember = {
  id: string;
  projectId: string;
  role: "admin" | "member";
  username: string;
  lastActive: string | null;
  imgUrl: string | null;
  createdAt: string | null;
};

export interface ProjectMembership {
  projectId: string;
  userId: string;
  role: ProjectRole;
}

export interface Membership {
  id: string;
  userId: string;
  projectId: string;
  role: string;
  createdAt: Date | null;
}
