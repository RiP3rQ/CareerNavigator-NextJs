import { Github, Globe, Linkedin } from "lucide-react";
import React from "react";

type Props = {
  profileImage: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  bio: string | undefined;
  socials: { website: string; linkedIn: string; github: string } | undefined;
};

const UserProfileHeader: React.FC<Props> = ({
  profileImage,
  firstName,
  lastName,
  email,
  bio,
  socials,
}) => {
  return (
    <div className="w-full h-fit">
      {/* Header */}
      <div className="bg-purple-400 rounded-t-2xl w-full flex h-40 border-b ">
        {/* Image */}
        <div className="w-[25%] h-full flex items-center justify-center">
          <img
            src={profileImage}
            alt="company-logo"
            className="object-contain rounded-full h-36 w-36 border-2 border-white"
          />
        </div>
        <div className="w-[75%] p-4 flex items-center justify-between space-y-3 text-white relative">
          {/* LEFT */}
          <div className="space-y-5">
            <div>
              <p className="text-3xl font-bold">
                {firstName} {lastName}
              </p>
            </div>
            <p className="text-xl">{email}</p>
          </div>
          {/* RIGHT */}
          <div className="flex flex-col items-center justify-center space-y-3 pr-4">
            {/* Github */}
            <div className="flex space-x-1">
              <Github className="w-6 h-6" />{" "}
              <a
                href={socials?.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-bold cursor-pointer underline mt-[2px]"
              >
                Github
              </a>
            </div>
            {/* LinkedIn */}
            <div className="flex space-x-1">
              <Linkedin className="w-6 h-6" />{" "}
              <a
                href={socials?.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-bold cursor-pointer underline mt-[2px]"
              >
                LinkedIn
              </a>
            </div>
            {/* Website */}
            <div className="flex space-x-1">
              <Globe className="w-6 h-6" />{" "}
              <a
                href={socials?.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-bold cursor-pointer underline mt-[2px]"
              >
                Website
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* BIO */}
      <div className="bg-slate-400 rounded-b-2xl w-full flex h-fit">
        <div className="w-full p-4">
          <p className="text-lg text-white">{bio}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
