export interface Profile {
  id: string;
  userName: string;
  imgUrl: string;
  online: boolean;
}

export interface User extends Profile {
  email: string;
}

export interface Member extends Profile {
  projectId: string;
  projectRole: string;
}
