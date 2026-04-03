export type MemberDB = {
  id: string;
  project_id: string;
  user_id: string;
  role: string;
  user_name: string;
  img_url: string;
  last_active: string;
};

export interface MemberWithProfileDB {
  id: string; // membership id
  project_id: string;
  user_id: string;
  role: string;
  profiles: {
    id: string;
    user_name: string;
    last_active: string;
    img_url: string;
  };
}

export type MembershipDB = {
  id: string;
  project_id: string;
  user_id: string;
  role: string;
  created_at: string;
};
