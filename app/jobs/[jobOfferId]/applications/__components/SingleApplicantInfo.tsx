"use client";

import CustomStatusBadge from "@/components/jobOffers/CustomStatusBadge";
import { useRecruiterClickedOnApplicantMutation } from "@/redux/features/jobOffer/jobOfferApi";
import { Github, Globe, Linkedin } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

type Props = {
  applicant: any;
  jobOfferId: string;
};

const SingleApplicantInfo: React.FC<Props> = ({ applicant, jobOfferId }) => {
  const router = useRouter();

  //redux action for recruiter click
  const [recruiterClickedOnApplicant, { isSuccess, error }] =
    useRecruiterClickedOnApplicantMutation();

  const handleApplicationClick = () => {
    recruiterClickedOnApplicant({ jobOfferId, applicantId: applicant.id });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Applicant profile opened");
      router.push(`/profile/${applicant.id}`);
    }
    if (error) {
      console.log(error);
    }
  }, [isSuccess, error]);

  return (
    <div
      className={`w-full h-24 md:h-16  p-2 rounded-lg text-white flex cursor-pointer hover:bg-slate-600 transition-all relative ${
        applicant.status === "pending" && "bg-slate-700"
      } ${applicant.status === "opened" && "bg-green-500"} ${
        applicant.status === "rejected" && "bg-red-500"
      }`}
      id="offerWrapper"
      onClick={handleApplicationClick}
    >
      {/* Left - Applicant Image */}
      <div className="w-[20%] h-full">
        <img
          src={applicant.avatar.url}
          alt="company-logo"
          className="object-contain h-full w-full"
        />
      </div>

      {/* Right =  Applicant info */}
      <div className="w-[80%] h-full flex items-center justify-between">
        {/* left side  */}
        <div className="flex flex-col">
          <p className="font-bold text-2xl">
            {applicant.firstName} {applicant.lastName}
          </p>
          <p className="font-bold text-slate-400">{applicant.email}</p>
        </div>
        {/* bottom line */}
        <div className="h-full flex items-center justify-center">
          {/* Socials */}
          {applicant.social.linkedIn && (
            <Linkedin className="w-10 h-10 text-white" />
          )}
          {applicant.social.github && (
            <Github className="w-10 h-10 text-white" />
          )}
          {applicant.social.website && (
            <Globe className="w-10 h-10 text-white" />
          )}
        </div>
      </div>

      {/* Application Status */}
      <div className="absolute -bottom-3 right-[50%] translate-x-[50%]">
        <CustomStatusBadge status={applicant.status} />
      </div>
    </div>
  );
};

export default SingleApplicantInfo;
