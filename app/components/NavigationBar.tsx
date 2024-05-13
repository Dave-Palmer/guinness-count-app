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

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      onPressMethod: () => {
        setIsMenuOpen();
      },
    },
    {
      name: "Leaderboard",
      href: "/dashboard/leaderboard",
      onPressMethod: () => {
        setIsMenuOpen();
      },
    },
    {
      name: "Friends",
      href: "/dashboard/friends",
      onPressMethod: () => {
        setIsMenuOpen();
      },
    },
    {
      name: "Signout",
      href: undefined,
      onPressMethod: () => {
        signout();
      },
    },
  ];

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
        {menuItems.map((item, index) =>
          item.name !== "Signout" ? (
            <NavbarItem key={`${item}-${index}`}>
              <Button
                as={Link}
                className="w-[100px] bg-guinness-gold text-white"
                href={item.href}>
                {item.name}
              </Button>
            </NavbarItem>
          ) : null
        )}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            onPress={() => signout()}
            variant="flat"
            className="hidden sm:flex">
            Sign out
          </Button>
        </NavbarItem>
      </NavbarContent>
      {/* Menu items for collapsed navbar */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              onPress={item.onPressMethod}
              className=" text-2xl text-zinc-700 m-2 p-2 border-b-2 hover:border-guinness-gold hover:border-b-3"
              href={item.href}
              size="lg">
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
