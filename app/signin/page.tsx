"use client";
import React, { Suspense } from "react";
import SigninForm from "../components/SigninForm";
import Image from "next/image";

const page = () => {
  return (
    <main className="min-h-screen flex items-center justify-start flex-col">
      <Image
        className="mt-10"
        src="/guinness-glass.png"
        alt="guinness glass"
        width={230}
        height={230}
        priority
      />
      <Suspense>
        <SigninForm />
      </Suspense>
    </main>
  );
};

export default page;
