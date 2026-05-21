export interface SessionUser {
  id: string;
  username: string;
  imageUrl: string | null;
}

export interface User extends SessionUser {
  lastActive: Date;
}
