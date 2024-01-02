"use client";
import { useEffect, useState } from "react";
import JobOfferSteps from "./__components/JobOfferSteps";
import JobOfferBasicInfoForm from "./__components/JobOfferBasicInfoForm";
import JobOfferCompanyForm from "./__components/JobOfferCompanyForm";
import JobOfferDescriptionForm from "./__components/JobOfferDescriptionForm";
import JobOfferRequirementsForm from "./__components/JobOfferRequirementsForm";
import JobOfferPreview from "./__components/JobOfferPreview";
import MetaDataProvider from "../providers/MetaDataProvider";
import ProtectedRoute from "@/hooks/useProtectedRoute";

type Props = {};

const AddJobOfferPage: React.FC<Props> = () => {
  const [active, setActive] = useState(0);
  const [jobOfferBasicInfo, setJobOfferBasicInfo] = useState({
    title: "",
    salaryRange: "",
    remote: "",
    contractType: "",
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
      lat: 1.0 as number,
      lng: 1.0 as number,
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

  // TODO: Change form labels and placeholders
  // TODO: Edit job offer functionality
  return (
    <div className="w-full flex min-h-screen">
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
        <div className="w-[25%] mt-[100px] h-screen fixed z-10 top-12 right-3">
          <JobOfferSteps active={active} setActive={setActive} />
        </div>
      </ProtectedRoute>
    </div>
  );
};

export default AddJobOfferPage;
