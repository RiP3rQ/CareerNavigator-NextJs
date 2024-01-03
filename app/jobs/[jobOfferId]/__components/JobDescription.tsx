import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import React from "react";

type Props = {
  description: string;
};

const JobDescription: React.FC<Props> = ({ description }) => {
  return (
    <div className="w-full h-fit bg-slate-200 rounded-2xl p-4">
      <Label className="font-bold text-2xl">Job description:</Label>
      <Separator className="w-full bg-slate-400 my-2" />
      <div className="w-full h-full bg-slate-200 rounded-2xl">
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default JobDescription;
