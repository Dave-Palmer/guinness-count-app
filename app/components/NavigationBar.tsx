"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import { signout } from "../lib/actions";

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useReducer(
    (current) => !current,
    false
  );

  const menuItems = ["Dashboard", "Leaderboard", "Friends", "Sign Out"];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">GUINNESS</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Button
            as={Link}
            className="w-[100px] bg-guinness-gold text-white"
            href="/dashboard">
            Dashboard
          </Button>
          {/* <Link className="w-[100px] text-center" color="foreground" href="#">
            Dashboard
          </Link> */}
        </NavbarItem>
        <NavbarItem isActive>
          <Button
            as={Link}
            className="w-[100px] bg-guinness-gold text-white"
            href="/dashboard/leaderboard"
            aria-current="page">
            Leaderboard
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            className="w-[100px] bg-guinness-gold text-white"
            href="/dashboard/friends">
            Friends
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {/* <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem> */}
        <NavbarItem>
          <Button
            onPress={() => signout()}
            variant="flat"
            className="hidden sm:flex">
            Sign out
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              onPress={() => setIsMenuOpen()}
              //   color="danger"
              className=" text-2xl text-zinc-700 m-2 p-2 border-b-2 hover:border-guinness-gold hover:border-b-3"
              href="#"
              size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
