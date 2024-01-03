type ICompany = {
  name: string;
  description: string;
  website: string;
  logo: {
    url: string;
    public_id: string;
  };
  location: string;
  geoLocation: {
    latitude: number;
    longitude: number;
  };
};

export type JobOffer = {
  _id: string;
  title: string;
  description: string;
  salaryRange: string;
  remote: string;
  company: ICompany;
  contractType: string;
  recruiter: {
    recruiterId: string;
  };
  jobOfferSkills: Array<string>;
  jobOfferApplicants: {
    jobOfferApplicantId: string;
    status: string;
  }[];
};
