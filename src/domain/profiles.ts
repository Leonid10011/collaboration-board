export interface Profile {
  id: string;
  userName: string;
  imgUrl: string;
}

export interface User extends Profile {
  email: string;
  lastActive: Date;
}

export interface Member extends Profile {
  projectId: string;
  projectRole: string;
}
