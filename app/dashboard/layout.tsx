import React from "react";
import Image from "next/image";
import BeerCountCard from "@/components/BeerCountCard";
import GuinnessButton from "@/components/AddBeerButton/AddBeerButton";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        {children}
      </section>
    </>
  );
}
