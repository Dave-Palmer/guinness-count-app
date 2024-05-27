"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button } from "@nextui-org/react";
import Link from "next/link";
import FriendRequestCard from "@/app/components/FriendRequestCard";
import { checkFriendRequests, fetchListOfFriends } from "@/app/lib/data";
import { Friend, FriendRequest } from "@/models/user";
import { acceptFriendRequest, rejectFriendRequest } from "@/app/lib/actions";

const page = () => {
  const [friendRequests, setFriendRequests] = useState<FriendRequest[] | null>(
    null
  );
  const [showRequests, setShowRequests] = useState(false);
  const [friends, setFriends] = useState<Friend[] | null>(null);
  const [triggerUseEffect, setTriggerUseEffect] = useState(false);

  const fetchFriendRequests = async () => {
    let requests: FriendRequest[] | null = await checkFriendRequests();
    if (requests) {
      setFriendRequests(requests);
    } else {
      setFriendRequests(null);
      setShowRequests(false);
    }
    return;
  };
  const fetchFriends = async () => {
    let friendsList: Friend[] | null = await fetchListOfFriends();
    if (friendsList) {
      setFriends(friendsList);
    }
    return;
  };

  const handleAcceptFriend = async (_id: string) => {
    await acceptFriendRequest(_id);
    setTriggerUseEffect(!triggerUseEffect);
  };
  const handleRejectFriend = async (_id: string) => {
    await rejectFriendRequest(_id);
    setTriggerUseEffect(!triggerUseEffect);
  };

  useEffect(() => {
    fetchFriendRequests();
    fetchFriends();
  }, [triggerUseEffect]);

  return (
    <div className="flex flex-col justify-center items-center">
      {!!friendRequests && (
        <>
          <Badge content="1" color="danger" shape="circle" placement="top-left">
            <Button
              onPress={() => {
                setShowRequests(!showRequests);
              }}
              size="lg"
              radius="none"
              className="text-center bg-guinness-gold text-white m-2">
              {showRequests ? "Hide friend requests" : "Show friend requests"}
            </Button>
          </Badge>
          {showRequests && (
            <div className="flex flex-col gap-2">
              {friendRequests.map((friendRequest) => (
                <>
                  <FriendRequestCard
                    key={friendRequest._id.toString()}
                    _id={friendRequest._id.toString()}
                    username={friendRequest.username}
                    firstname={friendRequest.firstname}
                    lastname={friendRequest.lastname}
                    acceptFriendRequest={handleAcceptFriend}
                    rejectFriendRequest={handleRejectFriend}
                  />
                </>
              ))}
            </div>
          )}
        </>
      )}
      <Button
        as={Link}
        href="/dashboard/friends/addfriend"
        size="lg"
        radius="none"
        className="text-center bg-guinness-gold text-white m-2">
        Add New Friend
      </Button>
      <div className="mt-1 text-center guinness-gold underline">
        List of friends
      </div>
      <ul>
        {friends?.map((friend) => (
          <li key={friend._id.toString()}>
            {friend.firstname} {friend.lastname}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
