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
import {
  BeerNumbers,
  LeaderBoardUser,
  BeerPost,
  UserProfile,
} from "./definitions";
import mongoose from "mongoose";

export async function getUser(username: string) {
  try {
    await connectToDB();
    const user = await User.findOne({ username: username });
    if (user.username) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch user.");
    throw new Error("Failed to fetch user.");
  }
}

export async function getUserProfileInfo(): Promise<UserProfile | null> {
  try {
    const session = await auth();
    const username = session?.user.username;
    if (!username) {
      throw new Error("User is not authenticated");
    }
    const user = await getUser(username);
    if (!user) {
      return null;
    }
    return {
      id: user._id.toString(),
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      emailVerified: user.emailVerified ? user.emailVerified : null,
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}
export async function checkFriendRequests(): Promise<FriendRequest[] | null> {
  try {
    // Authenticate the user
    const session = await auth();
    const userId = session?.user.id;

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
  const userId = session?.user.id;
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
  const userId = session?.user.id;
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

export async function fetchFriendsTotalBeers(): Promise<LeaderBoardUser[]> {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  try {
    await connectToDB();
    //
    const currentUser: UserDocument | null = await User.findById(userId);
    // Fetch current user's total beers
    const userTotalBeers = await Beer.countDocuments({ consumer: userId });
    const userStats: LeaderBoardUser = {
      _id: userId,
      firstname: session.user.firstname,
      lastname: session.user.lastname,
      totalBeers: userTotalBeers,
      currentUser: true,
    };

    // Fetch friends' stats
    const friendsStatsPromises =
      currentUser?.friends?.map(async (friendId) => {
        const friend = await User.findById(friendId);
        if (!friend) return null;

        const friendTotalBeers = await Beer.countDocuments({
          consumer: friend._id,
        });
        return {
          _id: friendId.toString(),
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

//Fetch all posts from one friend

export async function fetchFriendsPosts(
  id: string,
  consumerFirstName: string
): Promise<BeerPost[]> {
  //check if user is authenticated
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("User is not authenticated");
  }
  //convert friend id string to mongoose object ID
  const friendObjectId = new mongoose.Types.ObjectId(id);

  try {
    await connectToDB();
    //Check if user is fetching user's posts
    let isUser = userId === id;
    //Check if friend is on users friends list
    const friendChecked: UserDocument | null = await User.findOne({
      _id: userId,
      friends: { $in: [friendObjectId] },
    });
    if (friendChecked || isUser) {
      const friendsPosts = await Beer.find({
        consumer: friendObjectId,
      }).populate("withfriends");
      //Convert Mongoose object ids to strings and extract friends first and last names to use on the frontend
      const convertedPosts = friendsPosts.map((post) => {
        const friendsNames = post.withfriends.map((friend: any) => ({
          firstname: friend.firstname,
          lastname: friend.lastname,
        }));
        return {
          _id: post._id.toString(),
          location: post.location,
          consumer: consumerFirstName,
          withfriends: friendsNames,
          date: post.createdAt.toISOString(),
          isUser: isUser,
        };
      });
      return convertedPosts;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
}
