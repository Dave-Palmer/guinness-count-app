"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Tooltip } from "@nextui-org/react";
import FriendsListModal from "@/app/components/FriendsListModal";
import { Friend } from "@/models/user";
import { toast } from "sonner";
import { addBeer } from "@/app/lib/actions";

const page = () => {
  const [data, setData] = useState<Friend["_id"][]>([]);
  const [location, setLocation] = useState("");
  const [openToolTip, setOpenToolTip] = useState(false);

  const updateData = (updatedData: Friend["_id"][]) => {
    setData(updatedData);
  };

  const router = useRouter();

  const handleAddBeer = async () => {
    if (!location) {
      setOpenToolTip(true);
      return;
    }
    try {
      const res = await addBeer(location, data);
      if (res?.status === 400 || res?.status === 500) {
        toast.error(res.message, { duration: 3000 });
        return;
      }
      if (res?.status === 200) {
        toast.success(res.message, { duration: 3000 });
        setLocation("");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Something went wrong", { duration: 3000 });
    }
  };

  return (
    <div className="w-96 flex items-center justify-center flex-col">
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
          value={location}
          type="text"
          label="location"
          onChange={(e) => {
            setLocation(e.target.value);
            setOpenToolTip(false);
          }}
        />
      </Tooltip>
      <FriendsListModal data={data} updateData={updateData} />
      <Button
        onPress={handleAddBeer}
        size="lg"
        radius="sm"
        className="text-center bg-guinness-gold text-white mt-5">
        Add Beer
      </Button>
    </div>
  );
};

export default page;
