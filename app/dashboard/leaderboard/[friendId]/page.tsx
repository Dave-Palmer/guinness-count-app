"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchFriendsPosts } from "@/app/lib/data";
import { BeerPost } from "@/app/lib/definitions";
import { Button, Card, CardBody, Divider, Spinner } from "@nextui-org/react";

const page = () => {
  const { friendId } = useParams();
  const searchParams = useSearchParams();
  const firstName = searchParams.get("firstname");
  const [friendsBeerPosts, setFriendsBeerPosts] = useState<BeerPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await fetchFriendsPosts(
          friendId.toString(),
          firstName ? firstName : ""
        );
        if (response) {
          setFriendsBeerPosts(response);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        setIsLoading(false);
      }
    };
    fetchAllPosts();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-2xl text-guinness-gold underline underline-offset-8 mb-3">
        {firstName ? `${firstName}'s Posts` : "Posts"}
      </h1>
      {isLoading ? (
        <Spinner label="Loading..." color="warning" />
      ) : (
        // grid grid-cols-1 md:grid-cols-2 gap-2
        <div className="flex flex-row w-[80vw] flex-wrap justify-center gap-2">
          {" "}
          {friendsBeerPosts.map((post) => (
            <Card key={Math.random()} radius="sm" className=" min-w-80">
              <CardBody>
                <p className="text-guinness-gold text-md text-center underline underline-offset-4">
                  Location
                </p>
                <p className="text-guinness-gold text-xl text-center">
                  {post.location}
                </p>
                <Divider />
                {post.withfriends.length > 0 ? (
                  <>
                    <p className="text-guinness-gold text-md text-center">
                      With
                    </p>
                    {post.withfriends.map((friend) => (
                      <p className="text-guinness-gold text-sm text-center">
                        🍺{friend.firstname} {friend.lastname}🍺
                      </p>
                    ))}
                    <Divider />
                  </>
                ) : (
                  <p className="text-guinness-gold text-md text-center">
                    🍺 Enjoying own company 🍺
                  </p>
                )}
              </CardBody>
            </Card>
          ))}{" "}
        </div>
      )}
    </div>
  );
};

export default page;
