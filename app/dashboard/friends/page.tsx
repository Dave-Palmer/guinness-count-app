"use client";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { addNewFriendRequest } from "@/app/lib/actions";
import { toast, Toaster } from "sonner";
import { useSession } from "next-auth/react";

const page = () => {
  const [addFriendUserName, setAddFriendUserName] = useState("");
  const [addFriendButtonLoading, setAddFriendButtonLoading] = useState(false);

  const handleAddFriend = async (addFriendUserName: string) => {
    if (!addFriendUserName) {
      toast.error("Add a username!");
      return;
    }
    setAddFriendButtonLoading(true);
    //server action for adding friend
    const message = await addNewFriendRequest(addFriendUserName);
    if (message?.status === 404) {
      toast(<p className="text-lg">{message.message}</p>, {
        duration: 3000,
      });
      setAddFriendButtonLoading(false);
      return;
    }
    if (message?.status === 200) {
      toast.success(message?.message, { duration: 3000 });
      setAddFriendButtonLoading(false);
      return;
    } else {
      toast.error("Something went wrong", { duration: 3000 });
      setAddFriendButtonLoading(false);
      return;
    }
  };

  return (
    <div className="flex flex-col w-96">
      <Toaster position="bottom-center" />
      <h2 className="text-center">Search for and add friends</h2>
      <p className="p-2">Enter a Username:</p>
      <Input
        radius="none"
        fullWidth={false}
        isClearable
        type="text"
        label="Username"
        required
        onChange={(e) => {
          setAddFriendUserName(e.target.value);
        }}
      />
      <Button
        onPress={() => handleAddFriend(addFriendUserName)}
        size="lg"
        radius="none"
        isLoading={addFriendButtonLoading}
        className="text-center bg-guinness-gold text-white mt-5">
        Add Friend
      </Button>
      <div className="mt-10">List of friends container</div>
    </div>
  );
};

export default page;
