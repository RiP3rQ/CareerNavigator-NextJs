"use client";

import React, { useEffect, useState } from "react";
import SingleJobOffer from "./SingleJobOffer";
import { Separator } from "@/components/ui/separator";
import Mapbox from "@/components/Mapbox";
import { JobOffer } from "@/types/jobOffer";

type Props = {
  jobOffers: JobOffer[];
  setJobOffers: (jobOffers: JobOffer[]) => void;
};

const JobOffersBody: React.FC<Props> = ({ jobOffers, setJobOffers }) => {
  const [indexOfHoveredJobOffer, setIndexOfHoveredJobOffer] =
    useState<number>(-1);
  const [jobOfferLocations, setJobOfferLocations] = useState([
    {
      latitude: 0,
      longitude: 0,
    },
  ]);

  useEffect(() => {
    if (jobOffers.length > 0) {
      const locations: any[] = [];
      jobOffers.map((jobOffer) => {
        locations.push({
          latitude: jobOffer.company.geoLocation.latitude,
          longitude: jobOffer.company.geoLocation.longitude,
        });
      });
      setJobOfferLocations(locations);
    }
  }, [jobOffers]);

  return (
    <div className="w-full h-full flex space-x-1 pl-1" id="jobOffersMainBody">
      {/* left side */}
      <div className="w-[60%] h-full space-y-1">
        <h1 className="text-2xl font-bold text-center ">Job offers</h1>
        <Separator className="w-[80%] mx-auto" />
        {jobOffers.map((jobOffer, index: number) => (
          <SingleJobOffer
            key={index}
            jobOffer={jobOffer}
            setIndexOfHoveredJobOffer={setIndexOfHoveredJobOffer}
            index={index}
          />
        ))}
      </div>
      {/* right side */}
      <div className="w-[40%] h-full">
        <Mapbox
          disabled
          jobOfferLocations={jobOfferLocations}
          indexOfHoveredJobOffer={indexOfHoveredJobOffer}
        />
      </div>
    </div>
  );
};

export default JobOffersBody;
