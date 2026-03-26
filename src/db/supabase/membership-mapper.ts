import { MembershipWithProfileDB } from "./membership-db";
import { Member } from "@/domain/profiles";

export function mapMembershipWithProfileDBToMember(
  membership: MembershipWithProfileDB,
): Partial<Member> {
  return {
    id: membership.profiles.id,
    name: membership.profiles.user_name,
    imgUrl: membership.profiles.img_url,
    projectId: membership.project_id,
    projectRole: membership.role,
  };
}
