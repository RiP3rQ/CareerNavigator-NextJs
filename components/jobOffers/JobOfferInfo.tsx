import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { BookOpen, Building, MapPin, Share2 } from "lucide-react";
import React from "react";

type Props = {
  companyLogo: string;
  jobTitle: string;
  companyName: string;
  companyLocation: string;
  salaryRange: string;
  remote: string;
  contractType: string;
  alreadyApplied?: boolean;
};

// TODO: new badge should be visible only for 3 days
// TODO: share button dropdown functionality with link and copy to clipboard
const JobOfferInfo: React.FC<Props> = ({
  companyLogo,
  jobTitle,
  companyName,
  companyLocation,
  salaryRange,
  remote,
  contractType,
  alreadyApplied,
}) => {
  return (
    <div className="w-full h-fit">
      {/* Header */}
      <div className="bg-purple-400 rounded-t-2xl w-full flex h-40">
        {/* Company Image */}
        <div className="w-[25%] h-full flex items-center justify-center">
          <img
            src={companyLogo}
            alt="company-logo"
            className="object-contain rounded-full h-40 w-40"
          />
        </div>
        <div className="w-[75%] p-4 flex flex-col justify-center space-y-3 text-white relative">
          <Label className=" font-bold text-3xl">{jobTitle}</Label>
          {/* bottom line */}
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center" id="location">
              <Building className="w-5 h-5 mr-1" />
              <Label className="text-xs">{companyName}</Label>
              <MapPin className="w-5 h-5 ml-4" />
              <Label className="text-xs">{companyLocation}</Label>
            </div>
          </div>
          {/* absolute right top */}
          <div className="absolute top-0 right-4 space-x-2 flex items-center justify-center">
            {alreadyApplied ? (
              <Badge className="bg-transparent bg-green-400 border border-slate-200 text-xs py-2">
                Applied
              </Badge>
            ) : null}
            <Badge className="bg-transparent border border-slate-200 text-xs py-2">
              New
            </Badge>
            <div className="bg-slate-400 p-2 rounded-full cursor-pointer">
              <Share2 className="w-5 h-5" />
            </div>
          </div>
          {/* absolute right bottom */}
          <div className="absolute bottom-4 right-4">
            <Badge className="bg-transparent border border-slate-200 text-base py-2 text-green-400">
              {salaryRange}
            </Badge>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="w-full h-32 bg-slate-600 rounded-b-2xl flex items-center justify-center">
        {/* Left side */}
        <div className="w-full h-full flex items-center justify-center">
          {/* icon */}
          <div className="bg-blue-400 p-3 rounded-xl">
            <MapPin className="w-7 h-7 text-white" />
          </div>
          <div className="ml-2 flex flex-col justify-center">
            <Label className="text-slate-400 text-sm">Operation mode</Label>
            <p className="text-white text-xl">{remote}</p>
          </div>
          {/* text */}
        </div>
        {/* Right side */}
        <div className="w-full h-full flex items-center justify-center">
          {/* icon */}
          <div className="bg-green-400 p-3 rounded-xl">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <div className="ml-2 flex flex-col justify-center">
            <Label className="text-slate-400 text-sm">Employment Type</Label>
            <p className="text-white text-xl">{contractType}</p>
          </div>
          {/* text */}
        </div>
      </div>
    </div>
  );
};

export default JobOfferInfo;
