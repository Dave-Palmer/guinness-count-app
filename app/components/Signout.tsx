"use server";
import React from "react";
import { signOut } from "@/auth";
import { Button } from "@nextui-org/react";

export const Signout = () => {
  return (
    <form action="">
      <Button type="submit" href="#" variant="flat" className="hidden sm:flex">
        Sign out
      </Button>
    </form>
  );
};
