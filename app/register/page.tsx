import React from "react";
import { Image } from "@nextui-org/react";
import RegisterForm from "../components/RegisterForm";

const page = () => {
  return (
    <main>
      <section className="min-h-screen flex items-center justify-start flex-col">
        <Image
          className="mt-10"
          src="/guinness-glass.png"
          alt="guinness cup"
          width={230}
        />
        <RegisterForm />
      </section>
    </main>
  );
};

export default page;
