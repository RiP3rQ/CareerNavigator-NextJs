"use client";
import { useState } from "react";
import JobOfferSteps from "./__components/JobOfferSteps";
import JobOfferBasicInfoForm from "./__components/JobOfferBasicInfoForm";
import JobOfferCompanyForm from "./__components/JobOfferCompanyForm";

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
      lat: 0.0,
      lng: 0.0,
    },
  });
  const [jobOfferDescription, setJobOfferDescription] = useState({
    description: "",
  });
  const [jobOfferRequirements, setJobOfferRequirements] = useState({
    requirements: Array<string>(),
  });
  const [jobOfferData, setJobOfferData] = useState({});

  return (
    <div className="w-full flex min-h-screen">
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
        {active === 1 && (
          <JobOfferDescriptionForm
            jobOfferDescription={jobOfferDescription}
            setJobOfferDescription={setJobOfferDescription}
            active={active}
            setActive={setActive}
          />
        )}
      </div>
      <div className="w-[25%] mt-[100px] h-screen fixed z-[-1] top-12 right-3">
        <JobOfferSteps active={active} setActive={() => {}} />
      </div>
    </div>
  );
};

export default AddJobOfferPage;
