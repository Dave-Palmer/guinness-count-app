"use client";
import React, { Suspense } from "react";
// import { Image } from "@nextui-org/react";
import SigninForm from "../components/SigninForm";
import { Image } from "@nextui-org/react";

const page = () => {
  return (
    <main className="min-h-screen flex items-center justify-start flex-col">
      <Image
        className="mt-10"
        src="/guinness-glass.png"
        alt="guinness glass"
        width={230}
      />
      <Suspense>
        <SigninForm />
      </Suspense>
    </main>
  );
};

export default page;
