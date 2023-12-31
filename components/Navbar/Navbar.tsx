"use client";

import React from "react";
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import UserAvatar from "./UserAvatar";

type Props = {};

const Navbar = (props: Props) => {
  const handleAddOffer = () => {
    console.log("Add offer clicked");
  };

  const handleBookmarkClick = () => {
    console.log("Bookmark clicked");
  };

  return (
    <div className="h-16 w-full flex items-center justify-between px-4 py-2 bg-slate-800 shadow-xl">
      {/* Left side */}
      <div className="h-full w-fit flex items-center justify-start space-x-2">
        <Link
          href="/offers"
          className="text-white text-2xl cursor-pointer p-2 hover:bg-purple-700 hover:rounded-xl font-bold"
        >
          Offers
        </Link>
        <Separator orientation="vertical" />
        <Link
          href="/blog"
          className="text-white text-2xl cursor-pointer p-2 hover:bg-purple-700 hover:rounded-xl  font-bold"
        >
          Blog
        </Link>
      </div>
      {/* Center - Logo*/}
      <div className="h-full w-fit flex items-center justify-center cursor-pointer">
        <Link href="/">
          <img
            src="/logo.png"
            alt="logo"
            className="object-contain h-16 w-fit p-2"
          />
        </Link>
      </div>
      {/* Right side */}
      <div className="h-full w-fit flex items-center justify-end space-x-4">
        <Button
          variant={"primary"}
          className="cursor-pointer  font-bold"
          onClick={handleAddOffer}
        >
          Add Offer
        </Button>
        <Separator orientation="vertical" />
        <UserAvatar />
        <Separator orientation="vertical" />
        <Bookmark
          className="h-10 w-10 text-white"
          onClick={handleBookmarkClick}
        />
      </div>
    </div>
  );
};

export default Navbar;
