import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { TiDeleteOutline } from "react-icons/ti";

type RemovePostModalProps = {
  deleteBeerPost: (id: string) => void;
  id: string;
};

const RemovePostModal = ({ deleteBeerPost, id }: RemovePostModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Tooltip content="Remove post" offset={-7} className="text-red-400">
        <button
          onClick={onOpen}
          className="absolute top-3 text-3xl text-zinc-500">
          <TiDeleteOutline />
        </button>
      </Tooltip>
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
                  Are you sure you want to remove this post?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  className="bg-guinness-gold text-white"
                  onPress={() => {
                    deleteBeerPost(id);
                    onClose();
                  }}>
                  Delete Post
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default RemovePostModal;
