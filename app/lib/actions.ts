"use server";

import { signIn, signOut, auth } from "@/auth";
import { AuthError } from "next-auth";
import User from "@/models/user";
import connectToDB from "@/utils/db";
import { RegisterFormSchema } from "./zod";
import bcrypt from "bcrypt";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function registerAccount(
  prevState: object | undefined | string,
  formData: FormData
) {
  const validatedFields = RegisterFormSchema.safeParse({
    email: formData.get("email"),
    username: formData.get("username"),
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    return {
      success: false,
      message: "Missing Fields. Failed to register user",
    };
  }
  const { email, username, firstname, lastname, password } =
    validatedFields.data;
  //HASH PASSWORD
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await connectToDB();
    const user = await User.create({
      email: email,
      username: username,
      firstname: firstname,
      lastname: lastname,
      password: hashedPassword,
    });
    // await signIn("credentials", { username, password });
    return { success: true, message: user.username };
  } catch (error: any) {
    console.log(error);
    if (error.code === 11000) {
      if (error.keyValue.email) {
        return { success: false, message: "Email is already in use" };
      } else if (error.keyValue.username) {
        return { success: false, message: "Username is already in use" };
      } else {
        return { success: false, message: "Something went wrong" };
      }
    }
  }
}

export async function getUser(username: string) {
  try {
    await connectToDB();
    const user = await User.findOne({ username: username });
    if (user.username) {
      return user;
    }
  } catch (error) {
    console.error("Failed to fetch user.");
    throw new Error("Failed to fetch user.");
  }
}

export async function signout() {
  await signOut();
}

//Request to add new friend
export async function addNewFriendRequest(username: string) {
  try {
    await connectToDB();
    //check if user exists, in not return an appropiate message
    const newFriend = await User.findOne({ username: username });
    const session = await auth();
    const currentUser = session?.user;
    //if usename exists, send a friend request to user
    if (newFriend?._id && currentUser._id) {
      await User.updateOne(
        { _id: newFriend._id },
        { $addToSet: { friendRequests: currentUser._id } }
      );
      return { status: 200, message: `Friend request sent to ${username}` };
    }
    return { status: 404, message: "Username does not exist!" };
  } catch (error) {
    console.log(error);
  }
}

//Accept friend request
export async function acceptFriendRequest(
  user: string,
  friendRequestUsersId: string
) {}

//Reject friend request
export async function rejectFriendRequest() {}
