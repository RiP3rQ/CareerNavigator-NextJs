"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  AppWindow,
  Briefcase,
  Hammer,
  LogOutIcon,
  User2Icon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Props = {
  user: any;
  handleLogOut: () => void;
};

const UserLoggedInAvatar: React.FC<Props> = ({ user, handleLogOut }) => {
  const dropDownTrigger = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const handleOpenMyProfile = () => {
    router.push("/profile");
    // close the dropdown
    dropDownTrigger.current?.click();
  };

  const handleOpenMyBlogPosts = () => {
    router.push("/blog/myPosts");
    // close the dropdown
    dropDownTrigger.current?.click();
  };

  const handleOpenMyJobOffers = () => {
    router.push("/jobs/myJobOffers");
    // close the dropdown
    dropDownTrigger.current?.click();
  };

  const handleOpenMyApplications = () => {
    router.push("/jobs/myApplications");
    // close the dropdown
    dropDownTrigger.current?.click();
  };

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild ref={dropDownTrigger}>
          {user.avatar.url ? (
            <Image
              width={44}
              height={44}
              src={user.avatar.url}
              alt={user.avatar.public_id}
              className="w-11 h-11 cursor-pointer border-2 rounded-full border-[#37a39a]"
            />
          ) : (
            <h1 className="text-white text-xl cursor-pointer p-2 hover:bg-purple-700 hover:rounded-xl">
              {user?.email?.split("@")[0]}
            </h1>
          )}
        </PopoverTrigger>
        <PopoverContent
          className="px-2 pt-3 pb-3 mt-2 outline-none"
          side="bottom"
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="text-sm font-medium text-neutral-600 mb-1 pl-4">
            {user?.email}
          </div>
          <Separator className="mb-1" />
          <Button
            variant="ghost"
            className="w-full"
            onClick={handleOpenMyProfile}
          >
            <div className="flex items-center justify-between w-full">
              <div>My profile</div>
              <User2Icon className="h-4 w-4" />
            </div>
          </Button>
          <Button
            variant="ghost"
            className="w-full"
            onClick={handleOpenMyBlogPosts}
          >
            <div className="flex items-center justify-between w-full">
              <div>My blog posts</div>
              <AppWindow className="h-4 w-4" />
            </div>
          </Button>
          <Button
            variant="ghost"
            className="w-full"
            onClick={handleOpenMyJobOffers}
          >
            <div className="flex items-center justify-between w-full">
              <div>My job offers</div>
              <Hammer className="h-4 w-4" />
            </div>
          </Button>
          <Button
            variant="ghost"
            className="w-full"
            onClick={handleOpenMyApplications}
          >
            <div className="flex items-center justify-between w-full">
              <div>My Applications </div>
              <Briefcase className="h-4 w-4" />
            </div>
          </Button>
          <Separator className="mb-1" />
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => {
              // close the dropdown
              dropDownTrigger.current?.click();
              handleLogOut();
            }}
          >
            <div className="flex items-center justify-between w-full">
              <div>Logout</div>
              <LogOutIcon className="h-4 w-4" />
            </div>
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UserLoggedInAvatar;
