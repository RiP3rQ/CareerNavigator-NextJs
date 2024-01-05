export interface IEducation {
  school: string;
  degree: string;
  fieldOfStudy: string;
  from: Date;
  to: Date;
  description: string;
}

export interface IExperience {
  title: string;
  company: string;
  description: string;
  location: string;
  from: Date;
  to: Date;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  jobsOffersCreated: Array<{ jobOfferId: string }>;
  jobsOffersApplied: {
    jobOfferId: string;
    status: string;
  }[];
  jobsOffersFavorites: Array<{ jobOfferId: string }>;
  // ------- Aditional Info -------
  education: IEducation[];
  experience: IExperience[];
  skills: string[];
  bio: string;
  CV: {
    public_id: string;
    url: string;
  };
  social: {
    website: string;
    linkedIn: string;
    github: string;
  };
}
