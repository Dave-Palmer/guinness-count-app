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
import { BeerNumbers } from "./definitions";

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
