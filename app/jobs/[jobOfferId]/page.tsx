"use client";

import MetaDataProvider from "@/app/providers/MetaDataProvider";
import { useGetSingleJobOfferQuery } from "@/redux/features/jobOffer/jobOfferApi";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import JobOfferInfo from "@/components/jobOffers/JobOfferInfo";
import { JobOffer } from "@/types/jobOffer";
import TechStackInfo from "@/components/jobOffers/TechStackInfo";
import JobDescription from "@/components/jobOffers/JobDescription";
import ApplyButton from "@/components/jobOffers/ApplyButton";
import Mapbox from "@/components/Mapbox";

type Props = {};

const SingleJobOfferPage = (props: Props) => {
  const [jobOffer, setJobOffer] = useState<JobOffer>();
  const jobOfferId = useParams().jobOfferId;
  //redux get single job offer
  const { data, isSuccess, error, isLoading } = useGetSingleJobOfferQuery(
    { jobOfferId },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      setJobOffer(data.jobOffer);
    }
    if (error) {
      console.log("error", error);
    }
  }, [isSuccess, error]);

  if (isLoading || !jobOffer)
    return (
      <div className="w-full min-h-[90vh] flex items-center justify-center flex-col">
        <h1 className="text-6xl font-bold text-purple-700 mb-2 animate-pulse">
          Loading page ...
        </h1>
      </div>
    );

  //TODO: apply functionality
  const handleApplyClick = () => {
    console.log("Apply clicked");
  };

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
            companyLogo={jobOffer?.company.logo.url}
            jobTitle={jobOffer?.title}
            companyName={jobOffer?.company.name}
            companyLocation={jobOffer?.company.location}
            salaryRange={jobOffer?.salaryRange}
            remote={jobOffer?.remote}
            contractType={jobOffer?.contractType}
          />
          <TechStackInfo tags={jobOffer.jobOfferSkills} />
          <JobDescription description={jobOffer.description} />
        </div>
        {/* Right side - TODO: map with location + apply button */}
        <div className="hidden lg:flex lg:flex-col lg:space-y-5 w-[35%] h-full ">
          <div className="w-full h-96">
            <Mapbox location={jobOffer?.company.geoLocation} disabled={true} />
          </div>
          <ApplyButton onClick={handleApplyClick} />
        </div>
      </div>
    </div>
  );
};

export default SingleJobOfferPage;