"use client";
import { useEffect, useState } from "react";
import JobOfferSteps from "@/components/jobOffers/addOrEditJobOffer/JobOfferSteps";
import JobOfferBasicInfoForm from "@/components/jobOffers/addOrEditJobOffer/JobOfferBasicInfoForm";
import JobOfferCompanyForm from "@/components/jobOffers/addOrEditJobOffer/JobOfferCompanyForm";
import JobOfferDescriptionForm from "@/components/jobOffers/addOrEditJobOffer/JobOfferDescriptionForm";
import JobOfferRequirementsForm from "@/components/jobOffers/addOrEditJobOffer/JobOfferRequirementsForm";
import JobOfferPreview from "@/components/jobOffers/addOrEditJobOffer/JobOfferPreview";
import MetaDataProvider from "../../providers/MetaDataProvider";
import ProtectedRoute from "@/hooks/useProtectedRoute";

type Props = {};

const AddJobOfferPage: React.FC<Props> = () => {
  const [active, setActive] = useState(0);
  const [jobOfferBasicInfo, setJobOfferBasicInfo] = useState({
    title: "",
    salaryRange: "",
    remote: "" as "Remote" | "Hybrid" | "Office",
    contractType: "" as
      | "B2B"
      | "UoP"
      | "UZ"
      | "B2B/UoP"
      | "B2B/UZ"
      | "UoP/UZ"
      | "B2B/UoP/UZ",
  });
  const [jobOfferCompanyInfo, setJobOfferCompanyInfo] = useState({
    name: "",
    description: "",
    website: "",
    logo: {
      url: "",
    },
    location: "",
    geoLocation: {
      latitude: 1.0 as number,
      longitude: 1.0 as number,
    },
  });
  const [jobOfferDescription, setJobOfferDescription] = useState({
    description: "",
  });
  const [jobOfferRequirements, setJobOfferRequirements] = useState({
    requirements: Array<string>(),
  });
  const [jobOfferData, setJobOfferData] = useState({});

  useEffect(() => {
    setJobOfferData({
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

export default AddJobOfferPage;
