"use client";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { addNewFriendRequest } from "@/app/lib/actions";
import { toast, Toaster } from "sonner";

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
    const response = await addNewFriendRequest(addFriendUserName);

    if (response?.status === 400) {
      toast.info(response.message, {
        duration: 3000,
      });
      setAddFriendButtonLoading(false);
      return;
    }
    if (response?.status === 409) {
      toast.info(response.message, {
        duration: 3000,
      });
      setAddFriendButtonLoading(false);
      return;
    }

    if (response?.status === 404) {
      toast.info(response.message, {
        duration: 3000,
      });
      setAddFriendButtonLoading(false);
      return;
    }

    if (response?.status === 200) {
      toast.success(response.message, { duration: 3000 });
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
      <h2 className="text-center text-zinc-500">Search for and add friends</h2>
      <p className="p-2 text-zinc-500">Enter a Username:</p>
      <Input
        radius="sm"
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
        radius="sm"
        isLoading={addFriendButtonLoading}
        className="text-center bg-guinness-gold text-white mt-5">
        Add Friend
      </Button>
    </div>
  );
};

export default page;
