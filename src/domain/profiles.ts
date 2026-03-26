export interface Profile {
  id: string;
  name: string;
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
