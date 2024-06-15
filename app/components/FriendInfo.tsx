import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Accordion,
  AccordionItem,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  useDisclosure,
  ModalFooter,
} from "@nextui-org/react";
import { Friend } from "@/models/user";

interface FriendInfoProps extends Friend {
  removeFriend: (_id: string, firstname: string) => void;
}

export const FriendInfo: React.FC<FriendInfoProps> = ({
  _id,
  firstname,
  lastname,
  removeFriend,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <Card fullWidth radius="sm" className="mt-3 text-guinness-gold )">
      <CardBody>
        <p className="text-center text-large">
          {firstname} {lastname}
        </p>
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-center">
        <Button onPress={onOpen}>Remove friend</Button>
        <Modal
          placement="center"
          backdrop="opaque"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          classNames={{
            backdrop:
              "bg-gradient-to-t from-guinness-gold to-zinc-900/10 backdrop-opacity-20",
          }}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Hold Up!
                </ModalHeader>
                <ModalBody>
                  <p className="text-lg">
                    Are you sure you want to remove {firstname} from your friend
                    list?
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    className="bg-guinness-gold text-white"
                    onPress={() => {
                      removeFriend(_id.toString(), firstname);
                      onClose;
                    }}>
                    Remove
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </CardFooter>
    </Card>
  );
};
