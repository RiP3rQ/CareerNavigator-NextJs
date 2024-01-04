"use client";

import MetaDataProvider from "@/app/providers/MetaDataProvider";
import { Separator } from "@/components/ui/separator";
import { useGetPostsByUserIdMutation } from "@/redux/features/post/postApi";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BlogPost from "@/app/blog/__components/BlogPost";
import { useRouter } from "next/navigation";
import { useGetAllJobOffersByUserIdMutation } from "@/redux/features/jobOffer/jobOfferApi";
import SingleJobOffer from "@/app/__components/SingleJobOffer";

type Props = {};

const MyJobOffersPage = (props: Props) => {
  const [jobOffers, setJobOffers] = useState<any>([]);
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

  // handle post click
  const handleJobOfferClick = (jobOfferId: string) => () => {
    router.push(`/jobs/${jobOfferId}`);
  };

  return (
    <div className="max-w-7xl mx-4 lg:mx-auto">
      <MetaDataProvider
        title="My Posts"
        description="Fullstack Job Searching Site by @RiP3rQ"
      />
      <div className="w-full flex items-center justify-center my-4">
        <p className="text-3xl font-bold">MY POSTS</p>
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
            No job offers available!
          </p>
        )}
      </div>
    </div>
  );
};

export default MyJobOffersPage;
