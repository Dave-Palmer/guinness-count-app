"use server";

import { signIn, signOut } from "@/auth";
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
  // if (error instanceof AuthError) {
  //   switch (error.type) {
  //     case "CredentialsSignin":
  //       return "Invalid credentials";
  //     default:
  //       return "Something went wrong.";
  //   }
  // }
  // throw error;
}

export async function getUser(username: string) {
  try {
    await connectToDB();
    const user = await User.findOne({ username: username });
    return user;
  } catch (error) {
    console.error("Failed to fetch user.");
    throw new Error("Failed to fetch user.");
  }
}

export async function signout() {
  await signOut();
}
