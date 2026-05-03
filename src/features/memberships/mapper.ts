import { Database } from "@/lib/database.types";
import { Membership, ProjectMember } from "./types";

type MembershipWithProfileProps = {
  created_at: string | null;
  id: string;
  project_id: string;
  role: "admin" | "member";
  user_id: string;
  profiles: {
    id: string;
    user_name: string;
    last_active: string | null;
    img_url: string | null;
  };
};

export const mapMemberhsipWithProfileDBToDomain = (
  membership: MembershipWithProfileProps,
): ProjectMember => {
  return {
    id: membership.profiles.id,
    projectId: membership.project_id,
    role: membership.role,
    username: membership.profiles.user_name,
    lastActive: membership.profiles.last_active,
    imgUrl: membership.profiles.img_url,
    createdAt: membership.created_at,
  };
};

type MembershipProps =
  Database["public"]["Tables"]["project_memberships"]["Row"];

export const mapMembershipDBToDomain = (
  membership: MembershipProps,
): Membership => {
  return {
    id: membership.id,
    userId: membership.user_id,
    projectId: membership.project_id,
    role: membership.role,
    createdAt: membership.created_at ? new Date(membership.created_at) : null,
  };
};
