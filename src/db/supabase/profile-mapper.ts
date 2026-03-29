import { Profile } from "@/domain/profiles";
import { ProfileDB } from "./profile-db";

export function mapProfileDBToProfile(profile: ProfileDB): Profile {
  return {
    id: profile.id,
    userName: profile.user_name,
    imgUrl: profile.img_url,
  };
}
