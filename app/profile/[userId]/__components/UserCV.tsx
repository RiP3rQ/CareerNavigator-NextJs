import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";
import { IoIosDocument } from "react-icons/io";

type Props = {
  CV: { public_id: string; url: string } | undefined;
};

const UserCV: React.FC<Props> = ({ CV }) => {
  if (!CV) return null;
  return (
    <div className="w-full h-fit bg-green-200 rounded-2xl p-4">
      <Label className="font-bold text-2xl underline">CV:</Label>
      <Separator className="w-full bg-slate-400 my-2" />
      {/* Grid - 3 columns with 5 rows max */}
      <div className="w-full h-full flex flex-col items-center justify-center ">
        <IoIosDocument className="text-white h-24 w-24" />
        <Link
          href={CV.url}
          className="text-center w-full text-4xl underline text-blue-700 font-bold hover:text-blue-500"
          target="_blank"
        >
          CV
        </Link>
      </div>
    </div>
  );
};

export default UserCV;
