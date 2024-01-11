"use client";
import MetaDataProvider from "@/app/providers/MetaDataProvider";
import { Separator } from "@/components/ui/separator";
import ProtectedRoute from "@/hooks/useProtectedRoute";
import { useGetAllUsersAppliedToJobOfferQuery } from "@/redux/features/jobOffer/jobOfferApi";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import SingleApplicantInfo from "./__components/SingleApplicantInfo";

type Props = {};

const ApplicationsForjobOfferPage = (props: Props) => {
  const [jobApplicants, setJobApplicants] = useState<[]>([]);
  const jobOfferId = usePathname().split("/")[2];

  //redux action to fetch basic users data for applications
  const { data, error, isSuccess } = useGetAllUsersAppliedToJobOfferQuery(
    { jobOfferId },
    {
      skip: !jobOfferId,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      setJobApplicants(data.applicantsWithUserInfo);
    }
    if (error) {
      console.log(error);
    }
  }, [isSuccess, error]);

  return (
    <div className="max-w-7xl mx-4 lg:mx-auto">
      <ProtectedRoute>
        <MetaDataProvider
          title="Applicants for job offer"
          description="Fullstack Job Searching Site by @RiP3rQ"
        />
        <div className="w-full flex items-center justify-center my-4">
          <p className="text-3xl font-bold">Applicant for job offer</p>
        </div>
        <Separator className="w-full" />
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-4 my-4">
          {jobApplicants?.length > 0 ? (
            jobApplicants?.map((applicant: any, index: number) => (
              <SingleApplicantInfo
                key={index}
                applicant={applicant}
                jobOfferId={jobOfferId}
              />
            ))
          ) : (
            <p className="text-center font-bold text-black mt-20 text-3xl">
              No applicants!
            </p>
          )}
        </div>
      </ProtectedRoute>
    </div>
  );
};

export default ApplicationsForjobOfferPage;
