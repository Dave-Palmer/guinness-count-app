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
import ProfileIcon from "./ProfileIcon";
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
      onClickMethod: () => {
        setIsMenuOpen();
      },
    },
    {
      name: "Leaderboard",
      href: "/dashboard/leaderboard",
      onClickMethod: () => {
        setIsMenuOpen();
      },
    },
    {
      name: "Friends",
      href: "/dashboard/friends",
      onClickMethod: () => {
        setIsMenuOpen();
      },
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      onClickMethod: () => {
        setIsMenuOpen();
      },
    },
    {
      name: "Signout",
      href: undefined,
      onClickMethod: () => {
        signout();
      },
    },
  ];

  return (
    <Navbar
      maxWidth="full"
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}>
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
          item.name !== "Signout" && item.name !== "Profile" ? (
            <NavbarItem key={`${item}-${index}`}>
              <Button
                radius="sm"
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
        <NavbarItem className="hidden sm:flex">
          <ProfileIcon signout={signout} />
        </NavbarItem>
      </NavbarContent>
      {/* Menu items for collapsed navbar */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className=" text-2xl text-zinc-700 m-2 p-2 border-b-2 hover:border-guinness-gold hover:border-b-3"
              href={item.href}
              onClick={item.onClickMethod}
              size="lg">
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
