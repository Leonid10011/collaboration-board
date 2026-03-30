import { User } from "@/domain/users";
import { UserDB } from "./user-db";

export function mapUserDBToUser(user: UserDB): User {
  return {
    id: user.id,
    userName: user.user_name,
    imgUrl: user.img_url,
    lastActive: new Date(),
    email: user.email,
  };
}
