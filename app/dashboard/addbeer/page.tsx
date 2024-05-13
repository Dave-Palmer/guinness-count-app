"use client";
import { useState } from "react";
import { useRouter, redirect } from "next/navigation";
import { Button, Link, Input, Tooltip } from "@nextui-org/react";
import FriendsListModal from "@/app/components/FriendsListModal";

interface ParentComponentProps {
  initialData: string[];
}

const page: React.FC<ParentComponentProps> = ({ initialData }) => {
  const [data, setData] = useState<string[]>(initialData);
  const [location, setLocation] = useState("");
  const [openToolTip, setOpenToolTip] = useState(false);

  const updateData = (updatedData: string[]) => {
    setData(updatedData);
  };

  const router = useRouter();

  const handleAddBeer = async () => {
    if (!location) {
      setOpenToolTip(true);
      return;
    }
    alert(data);
    router.push("/dashboard");
  };
  return (
    <div className="w-full flex items-center justify-center flex-col">
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
          fullWidth={false}
          // className="w-2/3 "
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
        className="text-center bg-guinness-gold text-white mt-5">
        Add Beer
      </Button>
    </div>
  );
};

export default page;
