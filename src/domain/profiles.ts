export interface Profile {
  id: string;
  name: string;
  img_url: string;
}

export interface User extends Profile {
  email: string;
}

export interface Member extends Profile {
  online: boolean;
}
