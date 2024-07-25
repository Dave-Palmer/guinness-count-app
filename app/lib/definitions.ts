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
  _id: string;
  firstname: string;
  lastname: string;
  totalBeers: number;
  currentUser: boolean;
}

type withfriends = {
  firstname: string;
  lastname: string;
};

export type BeerPost = {
  location: string;
  consumer: string;
  withfriends: withfriends[];
  date: string;
};
