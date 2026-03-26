export interface Project {
  id: string;
  title: string;
  ownerId: string;
  description?: string;
}

export interface UserProject extends Project {
  role: string;
}
