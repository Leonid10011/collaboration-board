import { Membership } from "./memberships";

export interface User {
  id: string;
  userName: string;
  imgUrl: string;
  lastActive: Date;
  email: string;
}

export interface Member extends User, Membership {}
