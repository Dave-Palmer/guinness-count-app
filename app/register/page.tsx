import React from "react";
import { Image } from "@nextui-org/react";
import RegisterForm from "../components/RegisterForm";

const page = () => {
  return (
    <main>
      <section className="min-h-screen flex items-center justify-start flex-col">
        <Image
          className="mt-10"
          src="/kisspng-guinness-gluten-free-beer-irish-stout-5aec5b0086e038.5345542415254392325525.png"
          alt="guinness cup"
          width={230}
        />
        <RegisterForm />
      </section>
    </main>
  );
};

export default page;
