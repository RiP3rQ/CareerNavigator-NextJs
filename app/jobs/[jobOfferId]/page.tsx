"use client";

import MetaDataProvider from "@/app/providers/MetaDataProvider";
import {
  useApplyForJobOfferMutation,
  useGetSingleJobOfferQuery,
} from "@/redux/features/jobOffer/jobOfferApi";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import JobOfferInfo from "@/components/jobOffers/JobOfferInfo";
import { JobOffer } from "@/types/jobOffer";
import TechStackInfo from "@/components/jobOffers/TechStackInfo";
import JobDescription from "@/components/jobOffers/JobDescription";
import ApplyButton from "@/components/jobOffers/ApplyButton";
import Mapbox from "@/components/Mapbox";
import { toast } from "sonner";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {};

const SingleJobOfferPage = (props: Props) => {
  const router = useRouter();
  const [jobOffer, setJobOffer] = useState<JobOffer>();
  const jobOfferId = useParams()?.jobOfferId;
  //redux get single job offer
  const { data, isSuccess, error, isLoading } = useGetSingleJobOfferQuery(
    { jobOfferId },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  // redux to apply for job offer
  const [applyForJobOffer, { isSuccess: isSuccessApply, error: errorApply }] =
    useApplyForJobOfferMutation();
  // redux get user
  const { data: UserData } = useLoadUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const alreadyApplied = jobOffer?.jobOfferApplicants?.some(
    (applicant) =>
      applicant.jobOfferApplicantId.toString() === UserData?.user?._id
  );

  useEffect(() => {
    if (isSuccess) {
      setJobOffer(data.jobOffer);
    }
    if (error) {
      console.log(error);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (isSuccessApply) {
      toast.success("Applied for job offer", {
        position: "top-center",
      });
      router.push(`/jobs/${jobOfferId}`);
    }
    if (errorApply) {
      if ("data" in errorApply) {
        const errorData = errorApply.data as any;
        toast.error(errorData.message, {
          position: "top-center",
        });
      }
    }
  }, [isSuccessApply, errorApply]);

  const handleApplyClick = () => {
    applyForJobOffer({ jobOfferId });
  };

  if (isLoading || !jobOffer)
    return (
      <div className="w-full min-h-[90vh] flex items-center justify-center flex-col">
        <h1 className="text-6xl font-bold text-purple-700 mb-2 animate-pulse">
          Loading page ...
        </h1>
      </div>
    );

  return (
    <div className="w-full flex min-h-[90%] px-4 mt-2">
      <MetaDataProvider
        title="Single Job Offer"
        description="Fullstack Job Searching Site by @RiP3rQ"
      />
      <div className="w-full flex space-x-2" id="singleJobOfferWrapper">
        {/* Left side - Job offer info */}
        <div className="w-full lg:w-[65%] h-full space-y-2">
          <JobOfferInfo
            jobOfferId={jobOffer?._id.toString()}
            companyLogo={jobOffer?.company.logo.url}
            jobTitle={jobOffer?.title}
            companyDescription={jobOffer?.company.description}
            companyName={jobOffer?.company.name}
            companyLocation={jobOffer?.company.location}
            salaryRange={jobOffer?.salaryRange}
            remote={jobOffer?.remote}
            contractType={jobOffer?.contractType}
            alreadyApplied={alreadyApplied}
            updatedAt={jobOffer?.updatedAt}
          />
          <TechStackInfo tags={jobOffer.jobOfferSkills} />
          <JobDescription description={jobOffer.description} />
          <div className="flex lg:hidden">
            <ApplyButton
              jobOfferRecruiterId={jobOffer?.recruiter.recruiterId.toString()}
              userId={UserData?.user?._id}
              onClick={handleApplyClick}
              jobOfferId={jobOffer?._id.toString()}
            />
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-col lg:space-y-5 w-[35%] h-full ">
          <div className="w-full h-96">
            <Mapbox location={jobOffer?.company.geoLocation} disabled={true} />
          </div>
          <ApplyButton
            jobOfferRecruiterId={jobOffer?.recruiter.recruiterId.toString()}
            userId={UserData?.user?._id}
            onClick={handleApplyClick}
            jobOfferId={jobOffer?._id.toString()}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleJobOfferPage;
