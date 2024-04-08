import React from "react";
import BeerCountCard from "@/components/BeerCountCard";
import AddBeerButton from "@/components/AddBeerButton/AddBeerButton";

const page = () => {
  return (
    <>
      <h1 className="p-2 text-xl">Hello `Users name`</h1>
      <div className="flex items-center justify-items-center flex-row">
        <BeerCountCard text="Total Guinness" number={17} />
        <BeerCountCard text="Total this week" number={2} />
      </div>
      <AddBeerButton href="/dashboard/addbeer" text="Having a beer?" />
    </>
  );
};

export default page;
