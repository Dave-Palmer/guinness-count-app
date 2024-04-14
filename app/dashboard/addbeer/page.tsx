"use client";
import { useState } from "react";
import { useRouter, redirect } from "next/navigation";
import { Button, Link, Input, Tooltip } from "@nextui-org/react";
import FriendsListModal from "@/app/components/FriendsListModal";

const page = () => {
  const [location, setLocation] = useState("");
  const [openToolTip, setOpenToolTip] = useState(false);

  const router = useRouter();

  const handleAddBeer = async () => {
    if (!location) {
      setOpenToolTip(true);
      return;
    }
    alert(location);
    router.push("/dashboard");
  };
  return (
    <div className="w-full flex items-center justify-center flex-col">
      <p className="m-2 text-zinc-500">Where did you have a Guinness?</p>
      <Tooltip
        color="warning"
        content="Please add a location"
        isOpen={openToolTip}>
        <Input
          fullWidth={false}
          className="w-2/3 "
          type="text"
          label="location"
          onChange={(e) => {
            setLocation(e.target.value);
            setOpenToolTip(false);
          }}
        />
      </Tooltip>
      {/* <Button
        size="lg"
        className="text-center bg-guinness-gold text-white mt-5">
        Add Friends?
      </Button> */}
      <FriendsListModal />
      <Button
        onPress={handleAddBeer}
        size="lg"
        className="text-center bg-guinness-gold text-white mt-5">
        Add Beer
      </Button>
    </div>
  );
};

export default page;
