import { Friend } from "@/models/user";
import mongoose from "mongoose";

export type User = {
  id: string;
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  emailVerified: Date;
  friends: [mongoose.Types.ObjectId];
};

export type FriendRequest = {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
};

export interface BeerNumbers {
  totalBeers: number;
  weekBeers: number;
}

export interface LeaderBoardUser {
  firstname: string;
  lastname: string;
  totalBeers: number;
  currentUser: boolean;
}
