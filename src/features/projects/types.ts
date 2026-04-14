export type ProjectDB = {
  id: string;
  owner_id: string;
  title: string;
  description: string;
  slug: string;
};

export interface Project {
  id: string;
  title: string;
  ownerId: string;
  description?: string;
}

export interface UserProject extends Project {
  role: string;
}

export type CreateProjectInput = Omit<Project, "id">;
export type UpdateProjectInput = Partial<CreateProjectInput>;
