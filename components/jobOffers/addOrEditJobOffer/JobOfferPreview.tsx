"use client";

import Mapbox from "@/components/Mapbox";
import ApplyButton from "@/components/jobOffers/ApplyButton";
import JobDescription from "@/components/jobOffers/JobDescription";
import JobOfferInfo from "@/components/jobOffers/JobOfferInfo";
import TechStackInfo from "@/components/jobOffers/TechStackInfo";
import { Button } from "@/components/ui/button";
import {
  useCreateJobOfferMutation,
  useEditJobOfferMutation,
} from "@/redux/features/jobOffer/jobOfferApi";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

type Props = {
  jobOfferData: any;
};

const JobOfferPreview: React.FC<Props> = ({ jobOfferData }) => {
  const router = useRouter();
  const isEdit = usePathname().includes("edit");
  const [createJobOFfer, { isLoading, isSuccess, error }] =
    useCreateJobOfferMutation();
  const [
    editJobOffer,
    { isLoading: isEditLoading, isSuccess: isEditSuccess, error: isEditError },
  ] = useEditJobOfferMutation();

  let notificationId: string | number;

  // show notification on create job offer
  useEffect(() => {
    if (isSuccess) {
      notificationId = toast.success("Job offer created successfully");
      router.push("/");
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

  // show notification on edit job offer
  useEffect(() => {
    if (isEditSuccess) {
      notificationId = toast.success("Job offer edited successfully");
      router.push("/");
    }
    if (isEditError) {
      if ("data" in isEditError) {
        console.log(isEditError);
        const errorMsg = isEditError as any;
        notificationId = toast.error(errorMsg.data.message);
      }
    }
    if (isEditLoading) {
      notificationId = toast.loading("Editing job offer...");
    }
  }, [isEditLoading, isEditSuccess, isEditError]);

  const handleCreateOrEditJobOffer = async () => {
    const data = jobOfferData;
    // edit job offer
    if (!isEditLoading && isEdit) {
      await editJobOffer({ data, jobOfferId: jobOfferData.jobOfferId });
    }

    // create job offer
    else if (!isLoading && !isEdit) {
      await createJobOFfer({ data });
    }
  };

  return (
    <div className="w-[80%] mx-auto flex" id="singleJobOfferWrapper">
      {/* Left side - Job offer info */}
      <div className="w-full h-full  space-y-2">
        <JobOfferInfo
          companyLogo={jobOfferData?.company.logo.url}
          jobTitle={jobOfferData?.title}
          companyName={jobOfferData?.company.name}
          companyLocation={jobOfferData?.company.location}
          salaryRange={jobOfferData?.salaryRange}
          remote={jobOfferData?.remote}
          contractType={jobOfferData?.contractType}
          updatedAt={jobOfferData?.updatedAt}
        />
        <TechStackInfo tags={jobOfferData.jobOfferSkills} />
        <JobDescription description={jobOfferData.description} />
        <div className="w-full h-96">
          <Mapbox disabled location={jobOfferData?.company.geoLocation} />
        </div>
        {isEdit ? (
          <ApplyButton
            onClick={handleCreateOrEditJobOffer}
            isEditButton={isEdit}
          />
        ) : (
          <Button
            className="w-full h-16 bg-purple-400 rounded-lg text-white flex items-center justify-center text-3xl font-bold"
            onClick={handleCreateOrEditJobOffer}
          >
            Create offer
          </Button>
        )}
      </div>
    </div>
  );
};

export default JobOfferPreview;
