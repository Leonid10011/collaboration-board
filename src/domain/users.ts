import { Membership } from "./memberships";

export interface User {
  id: string;
  userName: string;
  imgUrl: string;
  lastActive: Date;
}

export interface Member extends User, Membership {}
