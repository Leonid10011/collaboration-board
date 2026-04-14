// features/memberships/types.ts
export type ProjectRole = "admin" | "member";

export interface ProjectMembership {
  projectId: string;
  userId: string;
  role: ProjectRole;
}
