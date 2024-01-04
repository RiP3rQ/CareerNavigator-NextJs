"use client";
import MetaDataProvider from "@/app/providers/MetaDataProvider";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  useGetAllFavouritedJobOffersByUserIdMutation,
  useGetAllJobOffersByUserIdMutation,
} from "@/redux/features/jobOffer/jobOfferApi";
import SingleJobOffer from "@/app/__components/SingleJobOffer";
import ProtectedRoute from "@/hooks/useProtectedRoute";

type Props = {};

const FavouritedJobOffersPage = (props: Props) => {
  const [jobOffers, setJobOffers] = useState<any>([]);
  const router = useRouter();
  // redux fetch users posts
  const [getAllFavouritedJobOffersByUserId, { isSuccess, error }] =
    useGetAllFavouritedJobOffersByUserIdMutation();
  // get user data from redux
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (!user) return;
    getAllFavouritedJobOffersByUserId({ userId: user._id }).then((res: any) => {
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
          title="My Posts"
          description="Fullstack Job Searching Site by @RiP3rQ"
        />
        <div className="w-full flex items-center justify-center my-4">
          <p className="text-3xl font-bold">Favourited job offers</p>
        </div>
        <Separator className="w-full" />
        <div className="max-w-7xl flex flex-col items-center justify-center space-y-4 my-4">
          {jobOffers?.length > 0 ? (
            jobOffers?.map((jobOffer: any, index: number) => (
              <div
                key={index}
                className="bg-transparent hover:bg-slate-300 hover:rounded-lg h-fit w-full cursor-pointer"
                onClick={handleJobOfferClick(jobOffer._id)}
              >
                <SingleJobOffer jobOffer={jobOffer} />
              </div>
            ))
          ) : (
            <p className="text-center font-bold text-black mt-20 text-3xl">
              No job offers found!
            </p>
          )}
        </div>
      </ProtectedRoute>
    </div>
  );
};

export default FavouritedJobOffersPage;
