import { Badge } from "@/components/ui/badge";
import { JobOffer } from "@/types/jobOffer";
import { Building, MapPin } from "lucide-react";
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

  // check if updatedAt is less than 3 days
  const isLessThan3Days = (updatedAt: Date) => {
    const now = new Date();
    const postDate = new Date(updatedAt);
    const diff = now.getTime() - postDate.getTime();
    const diffInDays = diff / (1000 * 3600 * 24);
    if (diffInDays < 3) {
      return true;
    }
    return false;
  };

  return (
    <div
      className="w-full h-24 md:h-16 bg-slate-700 p-2 rounded-lg text-white flex cursor-pointer hover:bg-slate-600 transition-all"
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
      <div className="w-[80%] h-full space-y-1">
        {/* top line */}
        <div className=" flex items-center justify-between w-full">
          <p className="font-bold">{jobOffer.title}</p>
          <div className="flex space-x-3">
            <div className="text-xs">
              {isLessThan3Days(jobOffer.updatedAt) && (
                <Badge className="bg-purple-400 text-xs">New</Badge>
              )}
            </div>
            <p className="font-bold">{jobOffer.salaryRange}</p>
          </div>
        </div>
        {/* bottom line */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center" id="location">
            <Building className="w-5 h-5 mr-1" />
            <p className="text-xs">{jobOffer.company.name}</p>
            <MapPin className="w-5 h-5 ml-4" />
            <p className="text-xs">{jobOffer.company.location}</p>
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
