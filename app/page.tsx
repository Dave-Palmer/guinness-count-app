import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Image
        className="mt-10"
        src="/guinness-glass.png"
        alt="guinness glass"
        width={230}
        height={300}
      />
      <div className="w-2/3 md:w-1/3 flex flex-col items-center min-h-[250px]">
        <h1 className="text-2xl guinness-gold font-medium mt-2">Welcome!</h1>
        <p className="text-2xl guinness-gold font-medium text-center">
          Enjoying a creamy pint?
        </p>
        <div className="flex items-center justify-center mt-6 pt-4">
          <Button
            as={Link}
            size="lg"
            radius="sm"
            href="/signin"
            className="m-2 bg-guinness-gold text-white w-32">
            Sign In
          </Button>
          <Button
            as={Link}
            radius="sm"
            size="lg"
            href="/register"
            className="m-2 bg-guinness-gold text-white w-32">
            Register
          </Button>
        </div>
      </div>
    </main>
  );
}
