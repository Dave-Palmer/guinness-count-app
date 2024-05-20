export type User = {
  id: string;
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  emailVerified: Date;
};

export type FriendRequest = {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
};
