"use client";

import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { BookMarkedIcon, Bookmark } from "lucide-react";
import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
  const handleAddOffer = () => {
    console.log("Add offer clicked");
  };

  const handleAvatarClick = () => {
    console.log("Avatar clicked");
  };

  const handleBookmarkClick = () => {
    console.log("Bookmark clicked");
  };

  return (
    <div className="h-16 w-full flex items-center justify-between px-4 py-2 bg-slate-800">
      {/* Left side */}
      <div className="h-full w-fit flex items-center justify-start space-x-2">
        <Link
          href="/offers"
          className="text-white text-2xl cursor-pointer p-2 hover:bg-purple-700 hover:rounded-xl"
        >
          Offers
        </Link>
        <Separator orientation="vertical" />
        <Link
          href="/blog"
          className="text-white text-2xl cursor-pointer p-2 hover:bg-purple-700 hover:rounded-xl"
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
      <div className="h-full w-fit flex items-center justify-end space-x-2">
        <Button
          variant={"primary"}
          className="cursor-pointer"
          onClick={handleAddOffer}
        >
          Add Offer
        </Button>
        <Separator orientation="vertical" />
        <Avatar
          className="h-10 w-10 cursor-pointer"
          onClick={handleAvatarClick}
        >
          <AvatarImage src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" />
        </Avatar>
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
