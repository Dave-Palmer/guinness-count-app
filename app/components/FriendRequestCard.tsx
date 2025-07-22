import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
} from "@nextui-org/react";

interface friendRequestCardProps {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  acceptFriendRequest: (id: string) => void;
  rejectFriendRequest: (id: string) => void;
}

const FriendRequestCard: React.FC<friendRequestCardProps> = ({
  _id,
  username,
  firstname,
  lastname,
  acceptFriendRequest,
  rejectFriendRequest,
}) => {
  return (
    <Card className="max-w-[200px] " shadow="none" radius="sm">
      <CardHeader className="flex gap-3 justify-center">
        <div className="flex flex-col">
          <p className="text-md text-center text-slate-600">Username:</p>
          <p className="text-small text-slate-500">{username}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="text-center text-slate-500">
          {firstname} {lastname}
        </p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button
          onPress={() => {
            rejectFriendRequest(_id);
          }}
          className="m-1 text-red-500"
          radius="sm"
          color="default">
          Decline
        </Button>{" "}
        <Button
          onPress={() => {
            acceptFriendRequest(_id);
          }}
          className="m-1"
          radius="sm"
          color="success">
          Accept
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FriendRequestCard;
