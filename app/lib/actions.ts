"use server";

import { signIn, signOut, auth } from "@/auth";
import { AuthError } from "next-auth";
import User from "@/models/user";
import Beer from "@/models/beer";
import connectToDB from "@/utils/db";
import { RegisterFormSchema } from "./zod";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { BeerPostData, UserProfile } from "./definitions";
import { UpdateProfileSchema } from "./zod";

export async function demoSignInCreds() {
  return { username: process.env.USERNAME, password: process.env.PASSWORD };
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      console.log(error);
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials";
        default:
          return "Error signing in";
      }
    }
    throw error;
  }
}

export async function registerAccount(
  prevState: object | undefined | string,
  formData: FormData
) {
  if (formData.get("password") !== formData.get("confirmpassword")) {
    return { success: false, message: "Passwords do not match" };
  }
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
    return { success: true, message: user.username };
  } catch (error: any) {
    // console.log(error);
    if (error.code === 11000) {
      if (error.keyValue.email) {
        return { success: false, message: "Email is already in use" };
      } else if (error.keyValue.username) {
        return { success: false, message: "Username is already in use" };
      } else {
        return { success: false, message: "Something went wrong" };
      }
    } else {
      return { success: false, message: "Something went wrong" };
    }
  }
}

export async function signout() {
  await signOut();
}

//Request to add new friend
export async function addNewFriendRequest(username: string) {
  try {
    await connectToDB();
    const session = await auth();
    //check if user exists, in not return an appropiate message
    const newFriend = await User.findOne({ username: username });
    // const currentUser = session?.user;
    const currentUser = await User.findById(session?.user.id);
    //Check if user is trying to add themselves as a friend
    if (currentUser?.username === username) {
      return { status: 400, message: "You cannot add yourself as a friend!" };
    }
    //if usename exists, send a friend request to user
    if (newFriend?._id && currentUser?._id) {
      if (currentUser.friends.includes(newFriend._id)) {
        return {
          status: 409,
          message: `You already have ${username} as a friend`,
        };
      }
      await User.updateOne(
        { _id: newFriend._id },
        { $addToSet: { friendRequests: currentUser.id } }
      );
      return { status: 200, message: `Friend request sent to ${username}` };
    }
    return { status: 404, message: "Username does not exist!" };
  } catch (error) {
    console.log(error);
  }
}

//Accept friend request
export async function acceptFriendRequest(senderId: string) {
  try {
    await connectToDB();
    const session = await auth();
    const currentUser = await User.findById(session?.user?.id);
    const currentUserId = currentUser?._id;
    //Check if friend request user still exists
    const newFriend = await User.findById(senderId);
    if (!newFriend) {
      return { status: 404, message: "User no longer exists" };
    }
    //Check if current user is authenticated
    if (!currentUserId) {
      return { status: 404, message: "User is not authenticated" };
    }
    // Update receiver's friendRequests array to remove senderId
    await User.updateOne(
      { _id: currentUserId },
      { $pull: { friendRequests: newFriend._id } }
    );
    // Update sender's friends array to add receiverId
    await User.updateOne(
      { _id: newFriend._id },
      { $addToSet: { friends: currentUserId } }
    );
    // Update receiver's friends array to add senderId
    await User.updateOne(
      { _id: currentUserId },
      { $addToSet: { friends: newFriend._id } }
    );
    // Return success message
    return { status: 200, message: "Friend request accepted successfully" };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Something went wrong, failed to add new friend",
    };
  }
}

//Reject friend request
export async function rejectFriendRequest(senderId: string) {
  try {
    await connectToDB();
    const session = await auth();
    const currentUser = await User.findById(session?.user?.id);
    const convertedSenderId = new mongoose.Types.ObjectId(senderId);
    if (currentUser) {
      await User.updateOne(
        { _id: currentUser._id },
        { $pull: { friendRequests: convertedSenderId } }
      );
    }
    return;
  } catch (error) {
    console.log(error);
  }
}

// Delete a friend from the user's friend list.

export async function deleteFriend(
  friendId: string
): Promise<{ status: number; message: string }> {
  try {
    // Authenticate the user
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      throw new Error("User is not authenticated");
    }

    await connectToDB();

    const friendObjectId = new mongoose.Types.ObjectId(friendId);
    // Remove the friend from the user's friends list
    const userUpdateResult = await User.updateOne(
      { _id: new mongoose.Types.ObjectId(userId) },
      { $pull: { friends: friendObjectId } }
    );

    if (userUpdateResult.modifiedCount === 0) {
      throw new Error("Failed to remove friend from user's friend list");
    }
    // remove the user from the friend's friends list
    const friendUpdateResult = await User.updateOne(
      { _id: friendObjectId },
      { $pull: { friends: new mongoose.Types.ObjectId(userId) } }
    );

    if (friendUpdateResult.modifiedCount === 0) {
      throw new Error("Failed to remove user from friend's friend list");
    }

    return { status: 200, message: "Friend successfully removed" };
  } catch (error) {
    console.error("Error deleting friend:", error);
    throw error; // Rethrow the error for handling in the caller function
  }
}

//Add beer post

export async function addBeer(beerPostData: BeerPostData) {
  if (!beerPostData.location) {
    return { status: 400, message: "Location is required" };
  }
  try {
    connectToDB();
    const session = await auth();
    const currentUser = await User.findById(session?.user?.id);
    if (currentUser) {
      let withFriends = undefined;
      if (beerPostData?.friends) {
        withFriends = beerPostData.friends.map(
          (friend) => new mongoose.Types.ObjectId(friend)
        );
      }
      const beerData = {
        location: beerPostData.location,
        consumer: currentUser._id,
        rating: beerPostData.ratingValue,
        withfriends: withFriends,
      };
      const beer = await new Beer(beerData).save();
      revalidatePath("/dashboard");
      return { status: 200, message: "Added beer!" };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Something went wrong, beer not added!" };
  }
}

// Delete beer user's beer post
type DeleteBeerPostRes = {
  success: boolean;
  message: string;
};

export async function deleteBeerPost(
  beerPostId: string
): Promise<DeleteBeerPostRes> {
  try {
    await connectToDB();
    const deletedPost = await Beer.deleteOne({
      _id: beerPostId,
    });
    if (deletedPost.deletedCount > 0) {
      return { success: true, message: "Post deleted" };
    } else {
      return {
        success: false,
        message: "Something went wrong, post not deleted",
      };
    }
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
}

//Update user account
// export async function updateUserAccount(
//   updatedProfile: UserProfile
// ): Promise<{ success: boolean; message: string }> {
//   try {
//     const session = await auth();

//     if (!session || !session.user || !session.user.id) {
//       return { success: false, message: "Unauthorized: No session found." };
//     }

//     const userIdFromSession = session.user.id;
//     const userIdFromPayload = updatedProfile.id;

//     // Security check: ensure users can only update their own profile
//     if (userIdFromSession !== userIdFromPayload) {
//       return {
//         success: false,
//         message: "Permission denied: Cannot update another user.",
//       };
//     }

//     // Perform the update in the DB
//     const updateResult = await User.findByIdAndUpdate(userIdFromSession, {
//       username: updatedProfile.username,
//       firstname: updatedProfile.firstname,
//       lastname: updatedProfile.lastname,
//       email: updatedProfile.email,
//     });

//     if (!updateResult) {
//       return {
//         success: false,
//         message: "Failed to update user in database.",
//       };
//     }

//     return { success: true, message: "Profile updated successfully." };
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return {
//       success: false,
//       message: "An unexpected error occurred.",
//     };
//   }
// }

export async function updateUserAccount(
  payload: unknown
): Promise<{ success: boolean; message: string }> {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return { success: false, message: "Unauthorized: No session found." };
    }
    const parseResult = UpdateProfileSchema.safeParse(payload);

    if (!parseResult.success) {
      const message =
        parseResult.error.errors.map((err) => err.message).join(", ") ||
        "Validation error";
      return { success: false, message };
    }

    const updatedProfile = parseResult.data;

    const userIdFromSession = session.user.id;
    const userIdFromPayload = updatedProfile.id;

    if (userIdFromSession !== userIdFromPayload) {
      return {
        success: false,
        message: "Permission denied: Cannot update another user.",
      };
    }

    const updateResult = await User.findByIdAndUpdate(userIdFromSession, {
      username: updatedProfile.username,
      firstname: updatedProfile.firstname,
      lastname: updatedProfile.lastname,
      email: updatedProfile.email,
    });

    if (!updateResult) {
      return {
        success: false,
        message: "Failed to update user in database.",
      };
    }

    return { success: true, message: "Profile updated successfully." };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
}

//Remove user account

export async function removeUserAccount(userId: string, password: string) {
  if (!userId || !password) {
    return { success: false, message: "Failed to remove user account" };
  }

  try {
    await connectToDB();
    const convertedId = new mongoose.Types.ObjectId(userId);
    const user = await User.findById(convertedId);
    if (!user) {
      return { success: false, message: "User not found!" };
    }
    //Check password matches
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return { success: false, message: "Password incorrect!" };
    }
    // Delete the user's posts
    await Beer.deleteMany({ consumer: convertedId });
    // Remove the user's ID from other users' friends lists
    await User.updateMany(
      { friends: convertedId },
      { $pull: { friends: convertedId } }
    );
    // Delete the user
    await User.findByIdAndDelete(convertedId);
    return {
      success: true,
      message: "User and associated data deleted successfully",
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal Server Error" };
  }
}
