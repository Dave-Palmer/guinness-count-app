"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Spinner } from "@nextui-org/react";
import Link from "next/link";
import FriendRequestCard from "@/app/components/FriendRequestCard";
import { checkFriendRequests, fetchListOfFriends } from "@/app/lib/data";
import { Friend, FriendRequest } from "@/models/user";
import { acceptFriendRequest, rejectFriendRequest } from "@/app/lib/actions";
import { FriendInfo } from "@/app/components/FriendInfo";
import { toast } from "sonner";
import { deleteFriend } from "@/app/lib/actions";

const page = () => {
  const [friendRequests, setFriendRequests] = useState<FriendRequest[] | null>(
    null
  );
  const [showRequests, setShowRequests] = useState(false);
  const [friends, setFriends] = useState<Friend[] | null>(null);
  const [triggerUseEffect, setTriggerUseEffect] = useState(false);
  const [isLoading, setIsloading] = useState(false);

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
    try {
      let friendsList: Friend[] | null = await fetchListOfFriends();
      if (friendsList) {
        setFriends(friendsList);
        setIsloading(false);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleAcceptFriend = async (_id: string) => {
    await acceptFriendRequest(_id);
    setTriggerUseEffect(!triggerUseEffect);
  };
  const handleRejectFriend = async (_id: string) => {
    await rejectFriendRequest(_id);
    setTriggerUseEffect(!triggerUseEffect);
  };

  const removeFriend = async (_id: string, firstname: string) => {
    try {
      const res = await deleteFriend(_id);
      if (res) {
        toast.success(`Removed ${firstname} from your friends list`, {
          duration: 3000,
        });
        setTriggerUseEffect(!triggerUseEffect);
      }
    } catch (error) {
      toast.error("Something went wrong, friend was not removed");
    }
  };

  useEffect(() => {
    fetchFriendRequests();
    setIsloading(true);
    fetchFriends();
  }, [triggerUseEffect]);

  return (
    <div className="flex flex-col justify-center items-center w-4/5 sm:w-80">
      {!!friendRequests && (
        <>
          <Badge content="1" color="danger" shape="circle" placement="top-left">
            <Button
              onPress={() => {
                setShowRequests(!showRequests);
              }}
              size="lg"
              radius="sm"
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
        fullWidth
        href="/dashboard/friends/addfriend"
        size="lg"
        radius="sm"
        className="text-center bg-guinness-gold text-white mt-2 mb-2">
        Add New Friend
      </Button>
      <p className="mt-1 text-lg text-center guinness-gold underline">
        Friends List
      </p>
      {isLoading && <Spinner label="Loading..." color="warning" />}
      {friends?.map((friend) => (
        <FriendInfo
          key={friend._id.toString()}
          removeFriend={removeFriend}
          {...friend}
        />
      ))}
    </div>
  );
};

export default page;
