"use client";
import { useEffect, useState } from "react";
import JobOfferSteps from "@/components/jobOffers/addOrEditJobOffer/JobOfferSteps";
import JobOfferBasicInfoForm from "@/components/jobOffers/addOrEditJobOffer/JobOfferBasicInfoForm";
import JobOfferCompanyForm from "@/components/jobOffers/addOrEditJobOffer/JobOfferCompanyForm";
import JobOfferDescriptionForm from "@/components/jobOffers/addOrEditJobOffer/JobOfferDescriptionForm";
import JobOfferRequirementsForm from "@/components/jobOffers/addOrEditJobOffer/JobOfferRequirementsForm";
import JobOfferPreview from "@/components/jobOffers/addOrEditJobOffer/JobOfferPreview";
import MetaDataProvider from "@/app/providers/MetaDataProvider";
import ProtectedRoute from "@/hooks/useProtectedRoute";
import { useGetSingleJobOfferQuery } from "@/redux/features/jobOffer/jobOfferApi";
import { useParams } from "next/navigation";

type Props = {};

const EditJobOfferPage = (props: Props) => {
  const jobOfferId = useParams().jobOfferId;
  // redux to get edited job offer data
  const { data } = useGetSingleJobOfferQuery(
    { jobOfferId },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [active, setActive] = useState(0);
  const [jobOfferBasicInfo, setJobOfferBasicInfo] = useState({
    title: data?.jobOffer?.title || "",
    salaryRange: data?.jobOffer?.salaryRange || "",
    remote: data?.jobOffer?.remote || ("" as "Remote" | "Hybrid" | "Office"),
    contractType:
      data?.jobOffer?.contractType ||
      ("" as
        | "B2B"
        | "UoP"
        | "UZ"
        | "B2B/UoP"
        | "B2B/UZ"
        | "UoP/UZ"
        | "B2B/UoP/UZ"),
  });
  const [jobOfferCompanyInfo, setJobOfferCompanyInfo] = useState({
    name: data?.jobOffer?.company?.name || "",
    description: data?.jobOffer?.company?.description || "",
    website: data?.jobOffer?.company?.website || "",
    logo: {
      url: data?.jobOffer?.company?.logo?.url || "",
    },
    location: data?.jobOffer?.company?.location || "",
    geoLocation: {
      latitude: data?.jobOffer?.company?.geoLocation?.latitude || 1.0,
      longitude: data?.jobOffer?.company?.geoLocation?.longitude || 1.0,
    },
  });
  const [jobOfferDescription, setJobOfferDescription] = useState({
    description: data?.jobOffer?.description || "",
  });
  const [jobOfferRequirements, setJobOfferRequirements] = useState({
    requirements: data?.jobOffer?.jobOfferSkills || Array<string>(),
  });
  const [jobOfferData, setJobOfferData] = useState({});

  useEffect(() => {
    setJobOfferData({
      jobOfferId: data?.jobOffer?._id,
      ...jobOfferBasicInfo,
      company: jobOfferCompanyInfo,
      ...jobOfferDescription,
      jobOfferSkills: [...jobOfferRequirements.requirements],
    });
  }, [
    jobOfferBasicInfo,
    jobOfferCompanyInfo,
    jobOfferDescription,
    jobOfferRequirements,
  ]);

  return (
    <div className="w-full flex min-h-[90%]">
      <ProtectedRoute>
        <MetaDataProvider
          title="Add Job Offer"
          description="Fullstack Job Searching Site by @RiP3rQ"
        />
        <div className="w-[75%]">
          {active === 0 && (
            <JobOfferBasicInfoForm
              jobOfferBasicInfo={jobOfferBasicInfo}
              setJobOfferBasicInfo={setJobOfferBasicInfo}
              active={active}
              setActive={setActive}
            />
          )}
          {active === 1 && (
            <JobOfferCompanyForm
              jobOfferCompanyInfo={jobOfferCompanyInfo}
              setJobOfferCompanyInfo={setJobOfferCompanyInfo}
              active={active}
              setActive={setActive}
            />
          )}
          {active === 2 && (
            <JobOfferDescriptionForm
              jobOfferDescription={jobOfferDescription}
              setJobOfferDescription={setJobOfferDescription}
              active={active}
              setActive={setActive}
            />
          )}
          {active === 3 && (
            <JobOfferRequirementsForm
              jobOfferRequirements={jobOfferRequirements}
              setJobOfferRequirements={setJobOfferRequirements}
              active={active}
              setActive={setActive}
            />
          )}
          {active === 4 && <JobOfferPreview jobOfferData={jobOfferData} />}
        </div>
        <div className="w-[25%] mt-[100px] h-[90%] fixed z-10 top-12 right-3">
          <JobOfferSteps active={active} setActive={setActive} />
        </div>
      </ProtectedRoute>
    </div>
  );
};

export default EditJobOfferPage;
