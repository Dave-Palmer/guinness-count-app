import React from "react";
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
import FriendCardList from "./FriendCardList";
import { FriendCard } from "./FriendCard";

interface ChildComponentProps {
  data: string[];
  updateData: (updatedData: string[]) => void;
}

const FriendsListModal: React.FC<ChildComponentProps> = ({
  data,
  updateData,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Make a list of friends before adding to parent component
  const friendList: string[] = [];
  const handleAddToFriendList = (friend: string) => {
    let indexOfFriend: number = friendList.indexOf(friend);
    if (indexOfFriend === -1) {
      friendList.push(friend);
    }
    if (indexOfFriend !== -1) {
      friendList.splice(indexOfFriend, 1);
    }
    console.log(friendList);
  };
  return (
    <div className="flex flex-col gap-2">
      <Button
        size="lg"
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
                  {fakeFriendList.map((item, index) => (
                    <FriendCard
                      key={index}
                      userName={item.userName}
                      firstName={item.firstName}
                      lastName={item.lastName}
                      img={item.img}
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
                  color="primary"
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

const fakeFriendList = [
  {
    userName: "djpalmer",
    firstName: "Dave",
    lastName: "Palmer",
    img: "https://cdn-icons-png.flaticon.com/512/1748/1748131.png",
  },
  {
    userName: "bigdog",
    firstName: "Big",
    lastName: "Dog",
    img: "https://cdn-icons-png.flaticon.com/512/1748/1748131.png",
  },
  {
    userName: "call_me_big_dog",
    firstName: "Small",
    lastName: "Frie",
    img: "https://cdn-icons-png.flaticon.com/512/1748/1748131.png",
  },
  {
    userName: "call_me_big_dog",
    firstName: "Small",
    lastName: "Frie",
    img: "https://cdn-icons-png.flaticon.com/512/1748/1748131.png",
  },
  {
    userName: "call_me_big_dog",
    firstName: "Small",
    lastName: "Frie",
    img: "https://cdn-icons-png.flaticon.com/512/1748/1748131.png",
  },
];

export default FriendsListModal;
