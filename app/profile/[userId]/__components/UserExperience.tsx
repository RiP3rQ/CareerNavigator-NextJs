import { Separator } from "@/components/ui/separator";
import { IExperience } from "@/types/user";
import React from "react";

type Props = {
  experience: IExperience[] | undefined;
};

const UserExperience: React.FC<Props> = ({ experience }) => {
  const handleFormatFromDate = (date: Date) => {
    const newDate = new Date(date);
    return `${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
  };

  const handleFormatToDate = (date: Date) => {
    const newDate = new Date(date);
    return `${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
  };

  if (!experience) return null;

  return (
    <div className="w-full h-fit">
      {/* Header */}
      <div className="bg-blue-400 rounded-2xl w-full flex flex-col h-fit p-4">
        <div className="w-full">
          <h1 className="font-bold text-2xl underline">Experience</h1>
        </div>
        <Separator className="w-full mt-2" />
        {/* Experience */}
        {experience?.map((exp, index) => (
          <div className="flex items-center justify-between" key={index}>
            <div className="flex flex-col justify-center">
              <p className="text-lg font-bold">{exp.title}</p>
              <p>{exp.description}</p>
            </div>
            <div className="flex flex-col items-end justify-center">
              <p className="text-lg font-bold">
                {exp.company} - {exp.location}
              </p>
              <p>
                {handleFormatFromDate(exp.from)} -{" "}
                {handleFormatFromDate(exp.to)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserExperience;
