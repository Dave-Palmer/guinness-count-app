"use server";
import connectToDB from "@/utils/db";
import User, {
  UserDocument,
  FriendRequest,
  PopulatedUserDocument,
  PopulatedUserDocumentFriends,
} from "@/models/user";
import Beer from "@/models/beer";
import { auth } from "@/auth";
import { BeerNumbers, LeaderBoardUser } from "./definitions";
import mongoose from "mongoose";

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
  if (!userId) {
    throw new Error("User is not authenticated");
  }
  try {
    await connectToDB();
    const user: PopulatedUserDocumentFriends | null = await User.findById(
      userId
    )
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
  } catch (error) {
    console.log(error);
  }
}

//Create query to compare entrie dates with todays date
function compareEntrieDates(userId: string) {
  const today = new Date();
  const currentDayOfWeek = today.getUTCDay(); // Sunday - Saturday : 0 - 6
  const startOfWeek = new Date(today);
  const endOfWeek = new Date(today);

  // Set the startOfWeek to the previous Sunday (00:00:00)
  startOfWeek.setUTCDate(today.getUTCDate() - currentDayOfWeek);
  startOfWeek.setUTCHours(0, 0, 0, 0);

  // Set the endOfWeek to the upcoming Saturday (23:59:59)
  endOfWeek.setUTCDate(today.getUTCDate() + (6 - currentDayOfWeek));
  endOfWeek.setUTCHours(23, 59, 59, 999);

  return {
    consumer: userId,
    createdAt: {
      $gte: startOfWeek,
      $lte: endOfWeek,
    },
  };
}

//Fetch total beers & Total beers this week
export async function fetchTotalBeers(): Promise<BeerNumbers | undefined> {
  const session = await auth();
  const userId = session?.user._id;
  if (!userId) {
    throw new Error("User is not authenticated");
  }
  try {
    await connectToDB();
    //check beer posts where consumer._id matchs userId
    const totalBeers: number = await Beer.countDocuments({ consumer: userId });
    const totalBeersThisWeek: number = await Beer.countDocuments(
      compareEntrieDates(userId)
    );
    //Return total beers & total beers this week
    return { totalBeers: totalBeers, weekBeers: totalBeersThisWeek };
  } catch (error) {
    console.log(error);
    return { totalBeers: 0, weekBeers: 0 };
  }
}

// Fetch user's friends and total beers for each friend and user for leadboard page

// export async function fetchFriendsTotalBeers(): Promise<
//   LeaderBoardUser[] | undefined
// > {
//   const session = await auth();
//   const userId = session?.user._id;
//   if (!userId) {
//     throw new Error("User is not authenticated");
//   }
//   try {
//     let userFriendsStats: LeaderBoardUser[] = [];
//     await connectToDB();
//     // Add users stats
//     const userTotalBeers: number = await Beer.countDocuments({
//       consumer: userId,
//     });

//     userFriendsStats.push({
//       firstname: session.user.firstname,
//       lastname: session.user.lastname,
//       totalBeers: userTotalBeers,
//       currentUser: true,
//     });

//     // Add user's friends stats
//     if (session.user.friends) {
//       for (let friendId of session.user.friends) {
//         let friend = await User.findById(friendId);
//         let userBeerCount = await Beer.countDocuments({ consumer: friend._id });
//         userFriendsStats.push({
//           firstname: friend.firstname,
//           lastname: friend.lastname,
//           totalBeers: userBeerCount,
//           currentUser: false,
//         });
//       }
//     }
//     console.log(userFriendsStats);
//     return userFriendsStats;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Failed to fetch all stats");
//   }
// }

// Fetch user's friends and total beers for each friend and user for leadboard page

export async function fetchFriendsTotalBeers(): Promise<LeaderBoardUser[]> {
  const session = await auth();
  const userId = session?.user._id;

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  try {
    await connectToDB();

    // Fetch current user's total beers
    const userTotalBeers = await Beer.countDocuments({ consumer: userId });
    const userStats: LeaderBoardUser = {
      firstname: session.user.firstname,
      lastname: session.user.lastname,
      totalBeers: userTotalBeers,
      currentUser: true,
    };

    // Fetch friends' stats
    const friendsStatsPromises =
      session.user.friends?.map(async (friendId) => {
        const friend = await User.findById(friendId);
        if (!friend) return null;

        const friendTotalBeers = await Beer.countDocuments({
          consumer: friend._id,
        });
        return {
          firstname: friend.firstname,
          lastname: friend.lastname,
          totalBeers: friendTotalBeers,
          currentUser: false,
        } as LeaderBoardUser;
      }) || [];

    const friendsStats = await Promise.all(friendsStatsPromises);
    const validFriendsStats = friendsStats.filter(
      (stat) => stat !== null
    ) as LeaderBoardUser[];

    // Combine user's stats and friends' stats

    return [userStats, ...validFriendsStats];
  } catch (error) {
    console.error("Error fetching friend stats:", error);
    throw new Error("Failed to fetch all stats");
  }
}
