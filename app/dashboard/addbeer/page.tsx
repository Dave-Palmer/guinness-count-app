"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Tooltip } from "@nextui-org/react";
import FriendsListModal from "@/app/components/FriendsListModal";
import { toast } from "sonner";
import { addBeer } from "@/app/lib/actions";
import SliderWithIcon from "@/app/components/SliderWithIcon";
import type { BeerPostData } from "@/app/lib/definitions";

const initialState = {
  location: "",
  ratingValue: 5,
  friends: [],
};

const page = () => {
  const [data, setData] = useState<BeerPostData>(initialState);
  const [openToolTip, setOpenToolTip] = useState(false);

  const router = useRouter();

  const handleAddBeer = async () => {
    if (!data.location) {
      setOpenToolTip(true);
      return;
    }
    try {
      const res = await addBeer(data);
      if (res?.status === 400 || res?.status === 500) {
        toast.error(res.message, { duration: 3000 });
        return;
      }
      if (res?.status === 200) {
        toast.success(res.message, { duration: 3000 });
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Something went wrong", { duration: 3000 });
    }
  };

  return (
    <div className="w-80 md:w-96 flex items-center justify-center flex-col mb-5">
      <p className="m-2 text-zinc-500">Where did you have a Guinness?</p>
      <Tooltip
        showArrow
        placement="bottom"
        content="Add a location"
        isOpen={openToolTip}
        classNames={{
          base: [
            // arrow color
            "before:bg-neutral-400 dark:before:bg-white",
          ],
          content: [
            "py-2 px-4 shadow-xl",
            "text-white bg-gradient-to-br from-white to-guinness-gold",
          ],
        }}>
        <Input
          style={{ fontSize: "16px" }}
          fullWidth={true}
          radius="sm"
          value={data.location}
          type="text"
          label="location"
          onChange={(e) => {
            setData((prev) => {
              return { ...prev, location: e.target.value };
            });
            setOpenToolTip(false);
          }}
        />
      </Tooltip>
      <p className="m-5 text-zinc-500">How did you rate the Guinness?</p>
      <SliderWithIcon
        value={data.ratingValue}
        setValue={(rating) =>
          setData((prev) => {
            return { ...prev, ratingValue: rating };
          })
        }
      />
      <FriendsListModal
        friends={data.friends}
        updateFriendsList={(listOfFriends) =>
          setData((prev) => {
            return { ...prev, friends: listOfFriends };
          })
        }
      />
      <Button
        onPress={handleAddBeer}
        size="lg"
        radius="sm"
        className="text-center bg-guinness-gold text-white mt-5 w-40">
        Add Beer
      </Button>
    </div>
  );
};

export default page;
