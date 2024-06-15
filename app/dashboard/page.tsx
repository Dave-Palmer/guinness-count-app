import React from "react";
import BeerCountCard from "../components/BeerCountCard";
import { Button, Link } from "@nextui-org/react";
import { auth } from "@/auth";
import { fetchTotalBeers } from "@/app/lib/data";
import { BeerNumbers } from "../lib/definitions";

async function getBeerNumbers(): Promise<BeerNumbers | undefined> {
  return await fetchTotalBeers();
}

const page = async () => {
  const session = await auth();
  const user = session?.user;
  const beers = await getBeerNumbers();

  return (
    <>
      <h1 className="p-2 text-2xl guinness-gold">Hello {user?.firstname}</h1>
      <div className="flex items-center justify-items-center flex-row">
        <BeerCountCard
          text="Total Guinness"
          number={beers?.totalBeers ? beers.totalBeers : 0}
        />
        <BeerCountCard
          text="Total this week"
          number={beers?.weekBeers ? beers.weekBeers : 0}
        />
      </div>
      <Button
        as={Link}
        size="lg"
        radius="sm"
        href="/dashboard/addbeer"
        className="text-center bg-guinness-gold text-white mb-5">
        Having a Beer?
      </Button>
    </>
  );
};

export default page;
