"use client";

import React, { useState } from "react";
import MetaDataProvider from "../providers/MetaDataProvider";
import ProtectedRoute from "@/hooks/useProtectedRoute";
import { useSelector } from "react-redux";
import ProfileSidebar from "./__components/ProfileSidebar";
import ProfileInfoForm from "./__components/ProfileInfoForm";
import ChangePasswordForm from "./__components/ChangePasswordForm";
import EducationForm from "./__components/EducationForm";
import ExperienceForm from "./__components/ExperienceForm";
import SkillsForm from "./__components/SkillsForm";
import CVUploadForm from "./__components/CVUploadForm";

type Props = {};

const ProfilePage = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);

  return (
    <div className="w-full flex min-h-[90vh] px-20 ">
      <ProtectedRoute>
        <MetaDataProvider
          title="Profile Page"
          description="Fullstack Job Searching Site by @RiP3rQ"
        />
        <div className="w-[25%] my-auto">
          <ProfileSidebar
            user={user}
            active={active}
            avatar={avatar}
            setActive={setActive}
          />
        </div>
        <div className="w-[75%] my-auto">
          {active === 1 && <ProfileInfoForm user={user} avatar={avatar} />}
          {active === 2 && <ChangePasswordForm />}
          {active === 3 && <EducationForm user={user} />}
          {active === 4 && <ExperienceForm user={user} />}
          {active === 5 && <SkillsForm user={user} />}
          {active === 6 && <CVUploadForm user={user} />}
        </div>
      </ProtectedRoute>
    </div>
  );
};

export default ProfilePage;
