"use client";

import Mapbox from "@/components/Mapbox";
import ApplyButton from "@/components/jobOffers/ApplyButton";
import JobDescription from "@/components/jobOffers/JobDescription";
import JobOfferInfo from "@/components/jobOffers/JobOfferInfo";
import TechStackInfo from "@/components/jobOffers/TechStackInfo";
import { Button } from "@/components/ui/button";
import { useCreateJobOfferMutation } from "@/redux/features/jobOffer/jobOfferApi";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

type Props = {
  jobOfferData: any;
};

const JobOfferPreview: React.FC<Props> = ({ jobOfferData }) => {
  const router = useRouter();
  const [createJobOFfer, { isLoading, isSuccess, error }] =
    useCreateJobOfferMutation();

  let notificationId: string | number;

  useEffect(() => {
    if (isSuccess) {
      notificationId = toast.success("Job offer created successfully");
      router.push("/jobs/createdJobOffers");
    }
    if (error) {
      if ("data" in error) {
        console.log(error);
        const errorMsg = error as any;
        notificationId = toast.error(errorMsg.data.message);
      }
    }
    if (isLoading) {
      notificationId = toast.loading("Creating job offer...");
    }
  }, [isLoading, isSuccess, error]);

  const handleCreateJobOffer = async () => {
    const data = jobOfferData;
    console.log(data);
    if (!isLoading) {
      await createJobOFfer({ data });
    }
  };

  return (
    <div className="w-[80%] mx-auto flex" id="singleJobOfferWrapper">
      {/* Left side - Job offer info */}
      <div className="w-full h-full bg-yellow-400 space-y-2">
        <JobOfferInfo
          companyLogo={jobOfferData?.company.logo.url}
          jobTitle={jobOfferData?.title}
          companyName={jobOfferData?.company.name}
          companyLocation={jobOfferData?.company.location}
          salaryRange={jobOfferData?.salaryRange}
          remote={jobOfferData?.remote}
          contractType={jobOfferData?.contractType}
        />
        <TechStackInfo tags={jobOfferData.jobOfferSkills} />
        <JobDescription description={jobOfferData.description} />
        <div className="w-full h-96">
          <Mapbox location={jobOfferData?.company.geoLocation} />
        </div>
        <ApplyButton onClick={handleCreateJobOffer} />
      </div>
    </div>
  );
};

export default JobOfferPreview;
