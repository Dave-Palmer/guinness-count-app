"use client";
import { useState } from "react";
import AddBeerButton from "@/components/AddBeerButton/AddBeerButton";
import { useRouter } from "next/navigation";

const page = () => {
  const [location, setLocation] = useState("");
  const [noLocationText, setNoLocationText] = useState(false);

  const router = useRouter();

  const handleAddBeer = async () => {
    if (!location) {
      setNoLocationText(true);
      return;
    }
    alert(location);
    router.push("/dashboard");
  };
  return (
    <div className="w-full flex items-center justify-center flex-col">
      <p className="mt-2">Where did you have a Guinness?</p>
      <input
        className="w-4/5 border rounded-md mt-2 p-2 text-md bg-gray-100 focus:outline-none focus:bg-white focus:text-gray-900"
        required
        type="text"
        name="location"
        id="location"
        placeholder="location..."
        onChange={(e) => {
          setNoLocationText(false);
          setLocation(e.target.value);
        }}
      />
      {noLocationText && <p className="text-red-500">Please add a location</p>}
      <p className="mt-2">Add friends</p>
      <AddBeerButton onClick={handleAddBeer} text="Add a beer" />
    </div>
  );
};

export default page;
