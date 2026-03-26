export type MembershipWithProfileDB = {
  id: string;
  project_id: string;
  user_id: string;
  role: string;
  profiles: {
    id: string;
    user_name: string;
    img_url: string;
  };
};
