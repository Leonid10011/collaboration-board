import { Membership } from "@/domain/memberships";
import { MembershipDB, MemberWithProfileDB } from "./membership-db";
import { Member } from "@/domain/users";

export function mapMemberWithProfileDBToMember(
  member: MemberWithProfileDB,
): Member {
  return {
    id: member.user_id,
    userId: member.user_id,
    userName: member.profiles.user_name,
    imgUrl: member.profiles.img_url,
    lastActive: new Date(member.profiles.last_active),
    projectId: member.project_id,
    role: member.role,
    createdAt: new Date(),
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
