// features/users/types.ts
export interface UserProfile {
  id: string;
  email: string;
  username: string;
  imageUrl: string | null;
  lastActive: string | null;
}
