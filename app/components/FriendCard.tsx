import React, { useState } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

interface FriendCardProps {
  userName: string;
  firstName: string;
  lastName: string;
  img: string;
  handleAddToList: (friend: string) => void;
}

export const FriendCard: React.FC<FriendCardProps> = ({
  userName,
  firstName,
  lastName,
  img,
  handleAddToList,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <Card
      className={isSelected ? `outline outline-2 outline-guinness-gold` : ``}
      shadow="sm"
      isPressable
      onPress={() => {
        setIsSelected(!isSelected);
        handleAddToList(userName);
      }}>
      <CardBody className="overflow-visible p-0 ">
        <Image
          shadow="sm"
          radius="sm"
          width="100%"
          alt={firstName}
          className="w-full object-cover h-[140px]"
          src={img}
        />
      </CardBody>
      <CardFooter className="text-small justify-center">
        <p className="text-slate-500 text-lg">
          {firstName} {lastName}
        </p>
      </CardFooter>
    </Card>
  );
};
