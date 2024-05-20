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
      <div className="m:w-1/2 flex flex-col items-center">
        <p className="text-2xl guinness-gold font-medium md:w-1/2 text-center">
          Hello
        </p>
        <p className="text-xl guinness-gold font-medium md:w-1/2 pt-2">
          Welcome to the Guinness count app, where you and your friends can
          share everytime you have a guinness, whether you're together or on the
          other side of the world
        </p>
        <div className="flex items-center justify-center pt-4">
          <Button
            as={Link}
            size="lg"
            href="/signin"
            className="m-2 bg-guinness-gold text-white">
            Sign In
          </Button>
          <Button
            as={Link}
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
