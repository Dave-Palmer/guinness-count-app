import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio} from "@nextui-org/react";
import FriendCardList from './FriendCardList'

export default function FriendsListModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <div className="flex flex-col gap-2">
      <Button size="lg" onPress={onOpen} className=" text-center bg-guinness-gold text-white mt-5">Add Friends?</Button>
      <Modal 
        isOpen={isOpen} 
        placement='top-center'
        onOpenChange={onOpenChange} 
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <FriendCardList/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}