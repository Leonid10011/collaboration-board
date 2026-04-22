export type ProjectDB = {
  created_at: string | null;
  description: string | null;
  id: string;
  owner_id: string;
  slug: string;
  title: string;
  updated_at: string | null;
};

export interface Project {
  id: string;
  title: string;
  ownerId: string;
  description?: string;
}

export type CreateProjectInput = Omit<Project, "id">;
export type UpdateProjectInput = Partial<CreateProjectInput>;

export interface UserProject extends Project {
  role: string;
}

export type ProjectsState = {
  byId: Record<string, Project>;
  allIds: string[];
};
