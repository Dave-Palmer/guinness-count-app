import { Schema, model, models, Document, Types } from "mongoose";

export interface FriendRequest {
  _id: Types.ObjectId | string;
  username: string;
  firstname: string;
  lastname: string;
}

export interface Friend {
  _id: Types.ObjectId | string;
  username: string;
  firstname: string;
  lastname: string;
}

export interface UserDocument extends Document {
  // _id: Types.ObjectId;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  friendRequests: Types.ObjectId[] | FriendRequest[];
  friends: Types.ObjectId[] | Friend[];
}

// Define a type for the populated user document
export interface PopulatedUserDocument
  extends Omit<UserDocument, "friendRequests"> {
  friendRequests: FriendRequest[];
}
export interface PopulatedUserDocumentFriends
  extends Omit<UserDocument, "friends"> {
  friends: Friend[];
}

const UserSchema = new Schema<UserDocument>({
  username: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  friendRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const User = models.User || model("User", UserSchema);

export default User;
