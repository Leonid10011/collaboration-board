import { SessionUser, User } from "./types";

type ProfileDB = {
  created_at: string | null;
  email: string;
  id: string;
  img_url: string | null;
  last_active: string | null;
  user_name: string;
};

export const mapProfileDBtoDomain = (profile: ProfileDB): SessionUser => {
  return {
    id: profile.id,
    username: profile.user_name,
    imageUrl: profile.img_url,
    email: profile.email,
  };
};

export const mapUserBtoDomain = (profile: ProfileDB): User => {
  return {
    id: profile.id,
    username: profile.user_name,
    imageUrl: profile.img_url,
    email: profile.email,
    lastActive: profile.last_active
      ? new Date(profile.last_active)
      : new Date(),
  };
};
