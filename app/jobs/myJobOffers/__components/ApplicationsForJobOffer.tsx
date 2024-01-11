import { User } from "lucide-react";
import React from "react";

type Props = {
  applications: {
    jobOfferApplicantId: string;
    status: string;
  }[];
};

const ApplicationsForJobOffer: React.FC<Props> = ({ applications }) => {
  return (
    <div
      className={`rounded-lg h-24 md:h-16 flex items-center justify-center ${
        applications.length !== 0 ? "bg-purple-400" : "bg-red-400"
      }`}
    >
      <div className="relative">
        <User size={32} className="text-white " />
        {/* number of applications */}
        <p className="text-slate-200 absolute -top-2 -right-1">
          {applications.length}
        </p>
      </div>
    </div>
  );
};

export default ApplicationsForJobOffer;
