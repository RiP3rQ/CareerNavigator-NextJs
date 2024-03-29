"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";
import { Bell, Bookmark } from "lucide-react";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import { useSelector } from "react-redux";
import UserLoggedInAvatar from "./UserLoggedInAvatar";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import { toast } from "sonner";

type Props = {};

const Navbar = (props: Props) => {
  const path = usePathname();
  // fetch user data from redux
  const { user } = useSelector((state: any) => state.auth);
  // fetch user from next-auth
  const { data: session, status } = useSession();
  // redux social auth
  const [socialAuth, { data, error, isSuccess }] = useSocialAuthMutation();

  // logout
  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const router = useRouter();

  const handleAddOffer = () => {
    router.push("/jobs/addJobOffer");
  };

  const handleBookmarkClick = () => {
    router.push("/jobs/favouritedJobOffers");
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleAddPost = () => {
    router.push("/blog/createPost");
  };

  const handleLogOut = async () => {
    if (status === "authenticated") {
      await signOut().then(() => {
        setLogout(true);
      });
    } else {
      setLogout(true);
    }
  };

  useEffect(() => {
    if (!user) {
      if (session) {
        console.log("social auth");
        socialAuth({
          email: session?.user?.email,
          firstName: session?.user?.name?.slice(
            0,
            session?.user?.name?.indexOf(" ")
          ),
          lastName: session?.user?.name?.slice(
            session?.user?.name?.indexOf(" ") + 1
          ),
          avatar: session?.user?.image,
        });
      }
    }
  }, [session, user]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Logged in successfully");
    }
    if (error) {
      toast.error("Error logging in");
    }
  }, [isSuccess, error]);

  return (
    <div className="h-16 w-full flex items-center justify-between px-4 py-2 bg-black/90 shadow-xl">
      {/* Left side */}
      <div className="h-full flex items-center justify-start space-x-2 ">
        {/* LOGO */}
        <div
          className="flex items-start justify-start flex-col text-white cursor-pointer"
          onClick={handleLogoClick}
        >
          <p className="text-xl">Career</p>
          <p className="text-sm">Navigator</p>
        </div>
        <Separator orientation="vertical" />
        <Link
          href="/"
          className={`text-slate-300 text-lg cursor-pointer pl-6 pr-1 hover:text-slate-500 ${
            path === "/" ? "text-white" : "text-slate-300"
          }`}
        >
          Offers
        </Link>
        <Separator orientation="vertical" className="h-[60%]" />
        <Link
          href="/blog"
          className={` text-lg cursor-pointer px-1  hover:text-slate-500 ${
            path === "/blog" ? "text-white" : "text-slate-300"
          }`}
        >
          Blog
        </Link>
      </div>
      {/* Right side */}
      <div className="h-full w-fit flex items-center justify-end space-x-1">
        {path?.startsWith("/blog") ? (
          <Button
            variant={"primary"}
            className="cursor-pointer  "
            onClick={handleAddPost}
          >
            Add Post
          </Button>
        ) : (
          <Button
            variant={"primary"}
            className="cursor-pointer  "
            onClick={handleAddOffer}
          >
            Add Offer
          </Button>
        )}

        <Separator orientation="vertical" />
        {/* user profile icon or login/register icon */}
        {user ? (
          <>
            <UserLoggedInAvatar user={user} handleLogOut={handleLogOut} />
          </>
        ) : (
          <UserAvatar />
        )}

        <Separator orientation="vertical" />
        <Bookmark
          className="h-10 w-10 text-white hover:text-[#9f59ce] cursor-pointer"
          onClick={handleBookmarkClick}
        />
      </div>
    </div>
  );
};

export default Navbar;
