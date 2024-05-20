import React, { useEffect } from "react";
import BeerCountCard from "../components/BeerCountCard";
import { Button, Link } from "@nextui-org/react";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <>
      <h1 className="p-2 text-2xl guinness-gold">Hello {user?.firstname}</h1>
      <div className="flex items-center justify-items-center flex-row">
        <BeerCountCard text="Total Guinness" number={17} />
        <BeerCountCard text="Total this week" number={2} />
      </div>
      <Button
        as={Link}
        size="lg"
        href="/dashboard/addbeer"
        className="text-center bg-guinness-gold text-white mb-5">
        Having a Beer
      </Button>
    </>
  );
};

export default page;
