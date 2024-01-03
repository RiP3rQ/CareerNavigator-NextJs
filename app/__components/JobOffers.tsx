"use client";

import React, { useEffect, useState } from "react";
import SingleJobOffer from "./SingleJobOffer";
import { Separator } from "@/components/ui/separator";
import { useGetAllJobOffersQuery } from "@/redux/features/jobOffer/jobOfferApi";
import { JobOffer } from "@/types/jobOffer";

type Props = {};

const JobOffers = (props: Props) => {
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
  // redux get jobOffers
  const { data, isSuccess, error } = useGetAllJobOffersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setJobOffers(data.jobOffers);
    }
    if (error) {
      console.log(error);
    }
  }, [isSuccess, error]);

  console.log(jobOffers);

  return (
    <div className="w-full h-full flex flex-col space-y-1 mt-1 px-1">
      <h1 className="text-2xl font-bold text-center">Job offers</h1>
      <Separator className="w-[80%] mx-auto" />
      {jobOffers.map((jobOffer, index) => (
        <SingleJobOffer key={index} jobOffer={jobOffer} />
      ))}
    </div>
  );
};

export default JobOffers;
