"use client";

import MetaDataProvider from "@/app/providers/MetaDataProvider";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useGetAllJobOffersByUserIdMutation } from "@/redux/features/jobOffer/jobOfferApi";
import SingleJobOffer from "@/app/__components/SingleJobOffer";
import ProtectedRoute from "@/hooks/useProtectedRoute";
import ApplicationsForJobOffer from "./__components/ApplicationsForJobOffer";
import { JobOffer } from "@/types/jobOffer";

type Props = {};

const MyJobOffersPage = (props: Props) => {
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
  const router = useRouter();
  // redux fetch users posts
  const [getAllJobOffersByUserId, { isSuccess, error }] =
    useGetAllJobOffersByUserIdMutation();
  // get user data from redux
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    getAllJobOffersByUserId({ userId: user._id }).then((res: any) => {
      setJobOffers(res.data?.jobOffers);
    });
  }, [user]);

  const handleJobOfferClick = (jobOfferId: string) => () => {
    router.push(`/jobs/${jobOfferId}`);
  };

  const handleApplicationsForJobOfferClick = (jobOfferId: string) => () => {
    router.push(`/jobs/${jobOfferId}/applications`);
  };

  return (
    <div className="max-w-7xl mx-4 lg:mx-auto">
      <ProtectedRoute>
        <MetaDataProvider
          title="My Posts"
          description="Fullstack Job Searching Site by @RiP3rQ"
        />
        <div className="w-full flex items-center justify-center my-4">
          <p className="text-3xl font-bold">My Job offers</p>
        </div>
        <Separator className="w-full" />
        <div className="max-w-7xl flex flex-col items-center justify-center space-y-4 my-4">
          {jobOffers?.length > 0 ? (
            jobOffers?.map((jobOffer: JobOffer, index: number) => (
              <div
                className="h-fit w-full flex items-center justify-center space-x-1"
                key={index}
              >
                <div
                  className="w-[90%] bg-transparent hover:bg-slate-300 hover:rounded-lg cursor-pointer"
                  onClick={handleJobOfferClick(jobOffer._id)}
                >
                  <SingleJobOffer jobOffer={jobOffer} />
                </div>
                <div
                  className="w-[10%] cursor-pointer"
                  onClick={handleApplicationsForJobOfferClick(jobOffer._id)}
                >
                  <ApplicationsForJobOffer
                    applications={jobOffer.jobOfferApplicants}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center font-bold text-black mt-20 text-3xl">
              No job offers available!
            </p>
          )}
        </div>
      </ProtectedRoute>
    </div>
  );
};

export default MyJobOffersPage;
