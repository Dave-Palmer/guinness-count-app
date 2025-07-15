import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import React, { useState } from "react";

interface ConfirmModalProps {
  text: string;
  userId?: string;
  buttonAction: (userId: string, password: string) => Promise<boolean>;
}

const ConfirmModal = ({ text, buttonAction, userId }: ConfirmModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [password, setPassword] = useState<string>("");
  return (
    <div>
      <Button
        radius="sm"
        variant="flat"
        color="danger"
        fullWidth
        onPress={onOpen}>
        {text}
      </Button>
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
                  Are you sure you want to remove your account?
                </p>
                <p className="text-lg">If so, please enter your password</p>
                <Input
                  label="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="bg-guinness-gold text-white"
                  isDisabled={!password}
                  onPress={async () => {
                    if (userId && password) {
                      const success = await buttonAction(userId, password);
                      success ? onClose() : null;
                    }
                  }}>
                  Remove
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
