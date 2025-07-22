"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchFriendsPosts } from "@/app/lib/data";
import { BeerPost } from "@/app/lib/definitions";
import { Card, CardBody, Divider, Spinner } from "@nextui-org/react";
import { FaBeer } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { GiThreeFriends } from "react-icons/gi";
import { BsPersonRaisedHand } from "react-icons/bs";
import { deleteBeerPost } from "@/app/lib/actions";
import RemovePostModal from "@/app/components/RemovePostModal";
import { toast } from "sonner";

const formatDateForBeerPosts = (postDate: string) => {
  const date = new Date(postDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

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

  const removeBeerPost = async (id: string) => {
    try {
      const response = await deleteBeerPost(id);
      if (response.success) {
        toast.success(response.message);
        setFriendsBeerPosts((posts) => posts.filter((post) => post._id !== id));
      }
      if (!response.success) {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col mb-2">
      <h1 className="text-2xl text-guinness-gold underline underline-offset-8 mb-3">
        {firstName !== "Your" ? `${firstName}'s Posts` : "Your Posts"}
      </h1>
      {isLoading ? (
        <Spinner label="Loading..." color="warning" />
      ) : (
        <div className="flex flex-row w-[80vw] flex-wrap justify-center gap-2">
          {" "}
          {friendsBeerPosts.map((post) => (
            <Card key={post._id.toString()} radius="sm" className=" min-w-80">
              <CardBody>
                {post.isUser && (
                  <RemovePostModal
                    deleteBeerPost={removeBeerPost}
                    id={post._id.toString()}
                  />
                )}
                <p className="text-guinness-gold text-lg text-center underline underline-offset-4">
                  <IoLocation />
                </p>
                <p className="text-guinness-gold text-xl text-center">
                  {post.location}
                </p>
                <Divider />
                <p className="text-guinness-gold text-l text-center">
                  Guinness rating: {post.rating}/10
                </p>
                <Divider />
                {post.withfriends.length > 0 ? (
                  <>
                    <p className="text-guinness-gold text-lg text-center">
                      <GiThreeFriends />
                    </p>
                    {post.withfriends.map((friend) => (
                      <p
                        key={friend.firstname}
                        className="text-guinness-gold text-sm text-center">
                        <FaBeer style={{ margin: "5px" }} />
                        {friend.firstname} {friend.lastname}
                        <FaBeer style={{ margin: "5px" }} />
                      </p>
                    ))}
                    <Divider style={{ marginTop: "auto" }} />
                  </>
                ) : (
                  <>
                    <p className="text-guinness-gold text-md text-center">
                      <BsPersonRaisedHand />
                    </p>
                    <p className="text-guinness-gold text-sm text-center">
                      <FaBeer style={{ margin: "5px" }} /> Enjoying own company{" "}
                      <FaBeer style={{ margin: "5px" }} />
                    </p>
                    <Divider style={{ marginTop: "auto" }} />
                  </>
                )}
                <p className=" text-guinness-gold text-sm text-center mt-auto">
                  {formatDateForBeerPosts(post.date)}
                </p>
              </CardBody>
            </Card>
          ))}{" "}
        </div>
      )}
    </div>
  );
};

export default page;
