"use client";

import { Button } from "@/components/ui/button";
import { useCreateJobOfferMutation } from "@/redux/features/jobOffer/jobOfferApi";
import React, { useEffect } from "react";
import { toast } from "sonner";

type Props = {
  jobOfferData: any;
};

const JobOfferPreview: React.FC<Props> = ({ jobOfferData }) => {
  const [createJobOFfer, { isLoading, isSuccess, error }] =
    useCreateJobOfferMutation();

  let notificationId: string | number;

  useEffect(() => {
    if (isSuccess) {
      notificationId = toast.success("Job offer created successfully");
      // TODO: redirect to job offer page
      // TODO: clear data from state
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

  // TODO: Add preview page
  return (
    <div>
      <Button onClick={handleCreateJobOffer}>Preview</Button>
    </div>
  );
};

export default JobOfferPreview;
