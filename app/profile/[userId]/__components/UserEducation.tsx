import { Separator } from "@/components/ui/separator";
import { IEducation } from "@/types/user";
import React from "react";

type Props = {
  education: IEducation[] | undefined;
};

const UserEducation: React.FC<Props> = ({ education }) => {
  const handleFormatFromDate = (date: Date) => {
    const newDate = new Date(date);
    return `${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
  };

  const handleFormatToDate = (date: Date) => {
    const newDate = new Date(date);
    return `${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
  };

  if (!education) return null;

  return (
    <div className="w-full h-fit">
      {/* Header */}
      <div className="bg-slate-300 rounded-2xl w-full flex flex-col h-fit p-4">
        <div className="w-full">
          <h1 className="font-bold text-2xl underline">Education</h1>
        </div>
        <Separator className="w-full mt-2" />
        {/* Experience */}
        {education?.map((ed, index) => (
          <div className="flex items-center justify-between" key={index}>
            <div className="flex flex-col justify-center">
              <p className="text-lg font-bold">
                {ed.degree} - {ed.fieldOfStudy}
              </p>
              <p>{ed.description}</p>
            </div>
            <div className="flex flex-col items-end justify-center">
              <p className="text-lg font-bold">{ed.school}</p>
              <p>
                {handleFormatFromDate(ed.from)} - {handleFormatFromDate(ed.to)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserEducation;
