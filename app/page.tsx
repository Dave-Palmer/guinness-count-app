import { Button, Image } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen">
      <Image
        className="mt-10"
        src="/kisspng-guinness-gluten-free-beer-irish-stout-5aec5b0086e038.5345542415254392325525.png"
        alt="guinness glass"
        width={230}
      />
      <div className="w-2/3 md:w-1/3 flex flex-col items-center">
        <h1 className="text-2xl guinness-gold font-medium ">Hello</h1>
        <p className="text-2xl guinness-gold font-medium ">
          Welcome to the Guinness counting app
        </p>
        <div className="flex items-center justify-center pt-4">
          <Button
            as={Link}
            size="lg"
            radius="sm"
            href="/signin"
            className="m-2 bg-guinness-gold text-white">
            Sign In
          </Button>
          <Button
            as={Link}
            radius="sm"
            size="lg"
            href="/register"
            className="m-2 bg-guinness-gold text-white">
            Register
          </Button>
        </div>
      </div>
    </main>
  );
}
