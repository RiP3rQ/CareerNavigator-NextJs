import Image from "next/image";
import React from "react";
import avatarDefault from "@/public/default-avatar.png";
import {
  BookImage,
  FileCode2,
  Hammer,
  ImageIcon,
  ListChecks,
  Lock,
} from "lucide-react";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
};

const ProfileSidebar: React.FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
}) => {
  return (
    <div className="w-full bg-slate-800/60 rounded-xl">
      {/* 1 item */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer 
    ${active === 1 ? "bg-purple-700/75 rounded-xl" : "bg-transparent"}`}
        onClick={() => setActive(1)}
      >
        <Image
          src={
            user.avatar || avatar ? user.avatar.url || avatar : avatarDefault
          }
          width={20}
          height={20}
          alt="avatar"
          className="w-5 h-5 lg:w-9 lg:h-9 rounded-full cursor-pointer"
        />
        <div className="pl-3 flex items-start justify-start flex-col text-white">
          <p className="text-base">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-sm">{user.email}</p>
        </div>
      </div>
      {/* 2 item */}
      <div
        className={`w-full px-3 py-4 cursor-pointer 
    ${active === 2 ? "bg-purple-700/75 rounded-xl" : "bg-transparent"}`}
        onClick={() => setActive(2)}
      >
        <div className="px-3 flex items-center justify-between text-white">
          <p className="text-base">Change password</p>
          <Lock className="w-5 h-5" />
        </div>
      </div>
      {/* 3 item */}
      <div
        className={`w-full px-3 py-4 cursor-pointer 
    ${active === 3 ? "bg-purple-700/75 rounded-xl" : "bg-transparent"}`}
        onClick={() => setActive(3)}
      >
        <div className="px-3 flex items-center justify-between text-white">
          <p className="text-base">Education</p>
          <BookImage className="w-5 h-5" />
        </div>
      </div>
      {/* 4 item */}
      <div
        className={`w-full px-3 py-4 cursor-pointer 
    ${active === 4 ? "bg-purple-700/75 rounded-xl" : "bg-transparent"}`}
        onClick={() => setActive(4)}
      >
        <div className="px-3 flex items-center justify-between text-white">
          <p className="text-base">Experience</p>
          <Hammer className="w-5 h-5" />
        </div>
      </div>
      {/* 5 item */}
      <div
        className={`w-full px-3 py-4 cursor-pointer 
    ${active === 5 ? "bg-purple-700/75 rounded-xl" : "bg-transparent"}`}
        onClick={() => setActive(5)}
      >
        <div className="px-3 flex items-center justify-between text-white">
          <p className="text-base">Skills</p>
          <ListChecks className="w-5 h-5" />
        </div>
      </div>
      {/* 6 item */}
      <div
        className={`w-full px-3 py-4 cursor-pointer 
    ${active === 6 ? "bg-purple-700/75 rounded-xl" : "bg-transparent"}`}
        onClick={() => setActive(6)}
      >
        <div className="px-3 flex items-center justify-between text-white">
          <p className="text-base">CV</p>
          <FileCode2 className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
