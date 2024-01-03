import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { JobOffer } from "@/types/jobOffer";
import { Building, MapPin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  jobOffer: JobOffer;
  index: number;
  setIndexOfHoveredJobOffer: (index: number) => void;
};

const SingleJobOffer: React.FC<Props> = ({
  jobOffer,
  index,
  setIndexOfHoveredJobOffer,
}) => {
  const router = useRouter();

  return (
    <div
      className="w-full h-16 bg-slate-700 p-2 rounded-lg text-white flex cursor-pointer hover:bg-slate-600 transition-all"
      id="offerWrapper"
      onClick={() => router.push(`/jobs/${jobOffer._id}`)}
      onMouseEnter={() => setIndexOfHoveredJobOffer(index)}
      onMouseLeave={() => setIndexOfHoveredJobOffer(-1)}
    >
      {/* Left - Comapny logo */}
      <div className="w-[20%] h-full">
        <img
          src={jobOffer.company.logo.url}
          alt="company-logo"
          className="object-contain rounded-lg h-full w-full"
        />
      </div>

      {/* Right = Job offer info */}
      <div className="w-[80%] h-full space-y-4">
        {/* top line */}
        <div className=" flex items-center justify-between w-full">
          <Label>{jobOffer.title}</Label>
          <Label>{jobOffer.salaryRange}</Label>
        </div>
        {/* bottom line */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center" id="location">
            <Building className="w-5 h-5 mr-1" />
            <Label className="text-xs">{jobOffer.company.name}</Label>
            <MapPin className="w-5 h-5 ml-4" />
            <Label className="text-xs">{jobOffer.company.location}</Label>
          </div>
          <div
            className="items-center justify-center space-x-2 hidden 2xl:flex"
            id="badges"
          >
            {jobOffer.jobOfferSkills
              ?.slice(0, 3)
              .map((tag: any, index: number) => (
                <Badge
                  key={index}
                  className="bg-transparent border border-slate-200 text-xs"
                >
                  {tag}
                </Badge>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleJobOffer;
