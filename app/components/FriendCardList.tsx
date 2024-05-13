import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { FriendCard } from "./FriendCard";

interface ChildComponentProps {
  handleAddToFriendList: (friend: string) => void;
}

const FriendCardList: React.FC<ChildComponentProps> = ({
  handleAddToFriendList,
}) => {
  const list = [
    {
      title: "Orange",
      img: "https://cdn-icons-png.flaticon.com/512/1748/1748131.png",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "https://cdn-icons-png.flaticon.com/512/1748/1748131.png",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "https://cdn-icons-png.flaticon.com/512/1748/1748131.png",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "https://cdn-icons-png.flaticon.com/512/1748/1748131.png",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "https://cdn-icons-png.flaticon.com/512/1748/1748131.png",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "https://cdn-icons-png.flaticon.com/512/1748/1748131.png",
      price: "$8.00",
    },
  ];

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {list.map((item, index) => (
        <Card
          className=" border-8 border-guinness-gold"
          shadow="sm"
          key={index}
          isPressable
          onPress={() => {
            handleAddToFriendList(item.title);
          }}>
          <CardBody className="overflow-visible p-0 ">
            <Image
              shadow="sm"
              radius="sm"
              width="100%"
              alt={item.title}
              className="w-full object-cover h-[140px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-center">
            <p className="text-slate-500 text-lg">{item.title}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default FriendCardList;