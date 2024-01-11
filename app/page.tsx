"use client";

import MetaDataProvider from "./providers/MetaDataProvider";
import JobOffersBody from "./__components/JobOffers";
import JobOffersFilters from "./__components/JobOffersFilters";
import { useEffect, useState } from "react";
import { JobOffer } from "@/types/jobOffer";
import { useGetAllJobOffersMutation } from "@/redux/features/jobOffer/jobOfferApi";

export default function Home() {
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);

  // redux get jobOffers
  const [getAllJobOffers, { isSuccess, error, reset }] =
    useGetAllJobOffersMutation();

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
    if (error) {
      console.log(error);
    }
  }, [isSuccess, error]);

  const handleRefetch = () => {
    getAllJobOffers({}).then((res: any) => {
      setJobOffers(res.data.jobOffers);
    });
  };

  return (
    <div className="">
      <MetaDataProvider
        title="CareerNavigator"
        description="Fullstack Job Searching Site by @RiP3rQ"
      />
      <div className="w-full h-full mt-4 px-4 " id="Wrapper">
        <JobOffersFilters
          setJobOffers={setJobOffers}
          handleRefetch={handleRefetch}
        />
        <div
          className="w-full h-[84vh] flex bg-slate-300 rounded-md"
          id="main-content"
        >
          <JobOffersBody jobOffers={jobOffers} setJobOffers={setJobOffers} />
        </div>
      </div>
    </div>
  );
}

// TODO: Better description editor with rich text

// TODO: CASCADE DELETE FOR ALL MODELS (when deleting user, delete all his posts, comments, etc.) (when deleting job offer, delete all applications, etc.)

// TODO: Socket.io for alerts
// TODO: Send notification to recruiter when user applies for job offer

// TODO: Upgrade blog features
// TODO: Chat functionality
// TODO: hamburger menu for mobile
// TODO: Suspence skeleton functionality
// TODO: Responsive design
