"use client";
import { useState, useEffect } from "react";
import { fetchFriendsTotalBeers } from "@/app/lib/data";
import { LeaderBoardUser } from "@/app/lib/definitions";
import { Spinner, Card, CardBody, Divider, Button } from "@nextui-org/react";
import Link from "next/link";
import { FaBeer } from "react-icons/fa";

const page = () => {
  const [leaderboardUser, setLeaderboardUser] = useState<LeaderBoardUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetchFriendsTotalBeers();
        const sortedData = response.sort((a, b) => b.totalBeers - a.totalBeers);
        setLeaderboardUser(sortedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        setIsLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col mb-5">
      <h1 className="text-2xl text-guinness-gold underline underline-offset-8 mb-3">
        Leaderboard
      </h1>
      {isLoading ? (
        <Spinner label="Loading..." color="warning" />
      ) : (
        <div className="w-96">
          {leaderboardUser.map((user) => (
            <Card key={user._id} radius="sm" className="mt-3">
              <CardBody>
                <p className="text-guinness-gold text-lg text-center">
                  {user.currentUser ? "You" : user.firstname}{" "}
                  {!user.currentUser && user.lastname}
                </p>
                <Divider />
                <p className="text-guinness-gold text-lg text-center">
                  <FaBeer style={{ margin: "5px" }} /> Total beers -{" "}
                  {user.totalBeers} <FaBeer style={{ margin: "5px" }} />
                </p>
                <Button
                  as={Link}
                  href={`/dashboard/leaderboard/${user._id}?firstname=${user.firstname}`}
                  size="md"
                  radius="sm"
                  className="text-center bg-guinness-gold text-white mt-5">
                  View Posts
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
