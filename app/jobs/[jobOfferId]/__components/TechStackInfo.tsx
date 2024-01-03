import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import React from "react";

type Props = {
  tags: string[];
};

const TechStackInfo: React.FC<Props> = ({ tags }) => {
  return (
    <div className="w-full h-fit bg-slate-200 rounded-2xl p-4">
      <Label className="font-bold text-2xl">Required skills:</Label>
      <Separator className="w-full bg-slate-400 my-2" />
      {/* Grid - 3 columns with 5 rows max */}
      <div className="grid grid-cols-3 gap-2 h-full items-center justify-center mt-4">
        {tags?.map((tag: any, index: number) => (
          <Label
            key={index}
            className="bg-slate-400 text-white text-xs rounded-lg p-2 text-center"
          >
            {tag}
          </Label>
        ))}
      </div>
    </div>
  );
};

export default TechStackInfo;
