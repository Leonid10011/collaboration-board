export interface Profile {
  id: string;
  name: string;
}

export interface User extends Profile {
  email: string;
}
