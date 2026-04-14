import { ProjectRole } from "../memberships/types";

// features/dashboard/types.ts
export interface ProjectViewer {
  user: {
    id: string;
    username: string;
    imageUrl: string | null;
  };
  membership: {
    projectId: string;
    role: ProjectRole | null;
  } | null;
}
