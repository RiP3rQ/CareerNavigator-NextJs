"use client";
import MetaDataProvider from "@/app/providers/MetaDataProvider";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useGetAllAppliedToJobOffersByUserIdMutation } from "@/redux/features/jobOffer/jobOfferApi";
import SingleJobOffer from "@/app/__components/SingleJobOffer";
import ProtectedRoute from "@/hooks/useProtectedRoute";
import CustomStatusBadge from "@/components/jobOffers/CustomStatusBadge";

type Props = {};

const MyApplicationsPage = (props: Props) => {
  const [jobOffers, setJobOffers] = useState<any>([]);
  const router = useRouter();
  // redux fetch users posts
  const [getAllAppliedToJobOffersByUserId, { isSuccess, error }] =
    useGetAllAppliedToJobOffersByUserIdMutation();
  // get user data from redux
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (!user) return;
    getAllAppliedToJobOffersByUserId({ userId: user._id }).then((res: any) => {
      setJobOffers(res.data?.jobOffers);
      console.log(res.data);
    });
  }, [user]);

  const handleJobOfferClick = (jobOfferId: string) => () => {
    router.push(`/jobs/${jobOfferId}`);
  };

  return (
    <div className="max-w-7xl mx-4 lg:mx-auto">
      <ProtectedRoute>
        <MetaDataProvider
          title="My Applications"
          description="Fullstack Job Searching Site by @RiP3rQ"
        />
        <div className="w-full flex items-center justify-center my-4">
          <p className="text-3xl font-bold">Applications to job offers</p>
        </div>
        <Separator className="w-full" />
        <div className="max-w-7xl flex flex-col items-center justify-center my-4">
          {jobOffers?.length > 0 ? (
            <div className="bg-transparent   h-fit w-full cursor-pointer space-y-6">
              {/* Job Offer Info */}
              {jobOffers?.map((jobOffer: any, index: number) => (
                <div
                  key={index}
                  onClick={handleJobOfferClick(jobOffer._id)}
                  className="relative "
                >
                  <SingleJobOffer jobOffer={jobOffer} />
                  {/* Application Status */}
                  <div className="absolute -bottom-3 right-[50%] translate-x-[50%]">
                    <CustomStatusBadge
                      status={jobOffer.jobOfferApplicants[0].status}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center font-bold text-black mt-20 text-3xl">
              No applications found!
            </p>
          )}
        </div>
      </ProtectedRoute>
    </div>
  );
};

export default MyApplicationsPage;
