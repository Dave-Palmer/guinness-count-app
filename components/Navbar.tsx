"use client";

import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Logout", href: "/logout" },
  ];

  return (
    <nav className="flex justify-center bg-gray-800 p-4">
      {/* <div className="flex-shrink-0">
        <Link href="/">
          <p className="text-white font-semibold text-lg">My Logo</p>
        </Link>
      </div> */}
      <div className="hidden md:flex items-center justify-center">
        {links.map((link) => (
          <Link key={link.name} href={link.href}>
            <p className="text-white text-center hover:text-gray-300 w-40">
              {link.name}
            </p>
          </Link>
        ))}
      </div>
      <div className="block md:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className=" flex flex-col">
            {links.map((link) => (
              <Link key={link.name} href={link.href}>
                <p className="text-white hover:text-gray-300">{link.name}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
