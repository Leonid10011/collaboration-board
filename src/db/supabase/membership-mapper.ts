import { Membership } from "@/domain/memberships";
import { MembershipDB, MembershipWithProfileDB } from "./membership-db";
import { Member } from "@/domain/profiles";

export function mapMembershipWithProfileDBToMember(
  membership: MembershipWithProfileDB,
): Partial<Member> {
  return {
    id: membership.profiles.id,
    userName: membership.profiles.user_name,
    imgUrl: membership.profiles.img_url,
    projectId: membership.project_id,
    projectRole: membership.role,
  };
}

export function mapMembershipDBToMembership(
  membership: MembershipDB,
): Membership {
  return {
    id: membership.id,
    projectId: membership.project_id,
    userId: membership.user_id,
    role: membership.role,
    createdAt: new Date(membership.created_at),
  };
}
