"use client";
import React from "react";
import { Image } from "@nextui-org/react";
import SigninForm from "../components/SigninForm";

const page = () => {
  return (
    <main className="min-h-screen flex items-center justify-start flex-col">
      <Image
        className="mt-10"
        src="/kisspng-guinness-gluten-free-beer-irish-stout-5aec5b0086e038.5345542415254392325525.png"
        alt="guinness glass"
        width={230}
      />
      <SigninForm />
    </main>
  );
};

export default page;
