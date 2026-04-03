export type TaskDB = {
  id: string;
  project_id: string;
  creator_id: string;
  assignee_id: string | null;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
};
