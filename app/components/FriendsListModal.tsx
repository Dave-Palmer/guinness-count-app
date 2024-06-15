"use client";
import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { FriendCard } from "./FriendCard";
import { fetchListOfFriends } from "../lib/data";
import { Friend } from "@/models/user";

interface ChildComponentProps {
  data: Friend["_id"][];
  updateData: (updatedData: Friend["_id"][]) => void;
}

const FriendsListModal: React.FC<ChildComponentProps> = ({
  data,
  updateData,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [listOfFriends, setListOfFriends] = useState<Friend[]>([]);

  const fetchFriendsFromDatabase = async () => {
    let response = await fetchListOfFriends();
    if (response) {
      setListOfFriends(response);
    }
    return;
  };
  // Make a list of friends before adding to parent component
  let friendList: Friend["_id"][] = [];
  const handleAddToFriendList = (friendId: Friend["_id"]) => {
    let indexOfFriend: number = friendList.indexOf(friendId);
    if (indexOfFriend === -1) {
      friendList.push(friendId);
    }
    if (indexOfFriend !== -1) {
      friendList.splice(indexOfFriend, 1);
    }
  };
  const imgURL = "https://cdn-icons-png.flaticon.com/512/1748/1748131.png";
  useEffect(() => {
    fetchFriendsFromDatabase();
  }, []);
  return (
    <div className="flex flex-col gap-2">
      <Button
        size="lg"
        radius="sm"
        onPress={onOpen}
        className=" text-center bg-guinness-gold text-white mt-5">
        Add Friends?
      </Button>
      <Modal
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
        size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Your Friend list
              </ModalHeader>
              <ModalBody>
                <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                  {/* <FriendCardList handleAddToFriendList={handleAddToFriendList} /> */}
                  {listOfFriends.map((friend: Friend) => (
                    <FriendCard
                      key={friend._id.toString()}
                      _id={friend._id}
                      username={friend.username}
                      firstname={friend.firstname}
                      lastname={friend.lastname}
                      img={imgURL}
                      handleAddToList={handleAddToFriendList}
                    />
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                {/* When modal is closed, the friends list is added to the data array in parent component */}
                <Button
                  // color="primary"
                  // variant="light"
                  className="text-center bg-guinness-gold text-white"
                  onPress={() => {
                    updateData(friendList);
                    onClose();
                  }}>
                  Add friends
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default FriendsListModal;
