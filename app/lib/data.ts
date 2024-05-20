"use server";
import connectToDB from "@/utils/db";
import User, {
  UserDocument,
  FriendRequest,
  PopulatedUserDocument,
  PopulatedUserDocumentFriends,
} from "@/models/user";
import { auth } from "@/auth";
// import type { FriendRequest } from "./definitions";

// export async function checkFriendRequests() {
//   let friendRequestDetails: FriendRequest[] = [];
//   const session = await auth();
//   const userId = session?.user._id;
//   await connectToDB();
//   const user = await User.findById(userId).populate("friendRequests");
//   if (user.friendRequests.length >= 1) {
//     user.friendRequests.forEach((user: FriendRequest) => {
//       const requestUserDetails = {
//         _id: user._id,
//         username: user.username,
//         firstname: user.firstname,
//         lastname: user.lastname,
//       };
//       friendRequestDetails.push(JSON.parse(JSON.stringify(requestUserDetails)));
//     });
//     return friendRequestDetails;
//   }
//   return null;
// }

export async function checkFriendRequests(): Promise<FriendRequest[] | null> {
  try {
    // Authenticate the user
    const session = await auth();
    const userId = session?.user._id;

    if (!userId) {
      throw new Error("User is not authenticated");
    }
    // Connect to the database
    await connectToDB();
    // Find the user by ID and populate friendRequests
    const user: PopulatedUserDocument | null = await User.findById(userId)
      .populate("friendRequests")
      .orFail(new Error("No docs found!"));
    if (!user) {
      throw new Error("User not found");
    }
    // Extract friend request details
    const friendRequestDetails: FriendRequest[] = user.friendRequests.map(
      (req: FriendRequest) => ({
        _id: req._id,
        username: req.username,
        firstname: req.firstname,
        lastname: req.lastname,
      })
    );
    return friendRequestDetails.length > 0
      ? JSON.parse(JSON.stringify(friendRequestDetails))
      : null;
  } catch (error) {
    console.error("Error checking friend requests:", error);
    throw error; // Rethrow the error for the caller to handle
  }
}

//Fetch list of friends
export async function fetchListOfFriends() {
  //Check if user is authenticated
  const session = await auth();
  const userId = session?.user._id;
  const user: PopulatedUserDocumentFriends | null = await User.findById(userId)
    .populate("friends")
    .orFail(new Error("No docs found!"));
  if (user?.friends) {
    const friendsList = user.friends.map((friend) => ({
      _id: friend._id,
      username: friend.username,
      firstname: friend.firstname,
      lastname: friend.lastname,
    }));
    return JSON.parse(JSON.stringify(friendsList));
  }
  return null;
}
