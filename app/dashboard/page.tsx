import React from "react";
import Image from "next/image";
import BeerCountCard from "@/components/BeerCountCard";
import GuinnessButton from "@/components/GuinnessButton/GuinnessButton";
import Navbar from "@/components/Navbar";

const page = () => {
  return (
    <>
      <Navbar />
      <section className="flex flex-col items-center p-10">
        <Image
          src={
            "https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Guinness_logo_dark_text.svg/220px-Guinness_logo_dark_text.svg.png"
          }
          width={150}
          height={150}
          alt="Guinness Logo"
        />
        <h1 className="p-2 text-xl">Hello `Users name`</h1>
        <div className="flex items-center justify-items-center flex-row">
          <BeerCountCard text="Total Guinness" number={17} />
          <BeerCountCard text="Total this week" number={2} />
        </div>
        <GuinnessButton />
      </section>
    </>
  );
};

export default page;
