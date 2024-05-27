import React, { useState } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Friend } from "@/models/user";

interface FriendCardProps extends Friend {
  img: string;
  handleAddToList: (friendId: Friend["_id"]) => void;
}

export const FriendCard: React.FC<FriendCardProps> = ({
  _id,
  firstname,
  lastname,
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
        handleAddToList(_id);
      }}>
      <CardBody className="overflow-visible p-0 ">
        <Image
          shadow="sm"
          radius="sm"
          width="100%"
          alt={firstname}
          className="w-full object-cover h-[140px]"
          src={img}
        />
      </CardBody>
      <CardFooter className="text-small justify-center">
        <p className="text-slate-500 text-lg">
          {firstname} {lastname}
        </p>
      </CardFooter>
    </Card>
  );
};
