"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { use, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  LogOutIcon,
  MoreHorizontal,
  Settings2Icon,
  Trash2,
  User2Icon,
  X,
} from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

type Props = {
  user: any;
};

const UserLoggedInAvatar: React.FC<Props> = ({ user }) => {
  const dropDownTrigger = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  // logout
  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const handleOpenMyProfile = () => {
    router.push("/profile");
    // close the dropdown
    dropDownTrigger.current?.click();
  };

  const handleLogout = async () => {
    setLogout(true);
    // close the dropdown
    dropDownTrigger.current?.click();
    // send toast
    toast.success("Logout successfully", {
      position: "top-center",
    });
  };

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild ref={dropDownTrigger}>
          {user.avatar ? (
            <Avatar className="h-10 w-10 cursor-pointer">
              <AvatarImage src={user.avatar.url} />
            </Avatar>
          ) : (
            <h1 className="text-white text-xl cursor-pointer p-2 hover:bg-purple-700 hover:rounded-xl">
              {user.email.split("@")[0]}
            </h1>
          )}
        </PopoverTrigger>
        <PopoverContent
          className="px-2 pt-3 pb-3 mt-2 outline-none"
          side="bottom"
          align="start"
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
          <Button variant="ghost" className="w-full">
            <div className="flex items-center justify-between w-full">
              <div>Settings</div>
              <Settings2Icon className="h-4 w-4" />
            </div>
          </Button>
          <Separator className="mb-1" />
          <Button variant="ghost" className="w-full" onClick={handleLogout}>
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
