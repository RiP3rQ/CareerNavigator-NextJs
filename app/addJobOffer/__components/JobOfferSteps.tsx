"use client";

import React from "react";
import { IoMdCheckmark } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const JobOfferSteps: React.FC<Props> = ({ active, setActive }) => {
  const jobOfferOptions = [
    "Basic Information",
    "Company Information",
    "Job Description",
    "Job Requirements",
  ];

  return (
    <div>
      {jobOfferOptions.map((option: any, index: number) => (
        <div key={index} className="w-full flex py-5">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center ${
              active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
            } relative`}
          >
            <IoMdCheckmark className="text-white text-xl" />
            {index !== jobOfferOptions.length - 1 && (
              <div
                className={`absolute h-8 w-1 ${
                  active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
                } bottom-[-100%]`}
              />
            )}
          </div>
          <h5
            className={`pl-3 ${
              active === index
                ? "dark:text-white text-black"
                : "dark:text-white text-black"
            } text-xl`}
          >
            {option}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default JobOfferSteps;
