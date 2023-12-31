"use client";

import React, { useState } from "react";
import MetaDataProvider from "../providers/MetaDataProvider";
import ProtectedRoute from "@/hooks/useProtectedRoute";
import { useSelector } from "react-redux";
import ProfileSidebar from "./__components/ProfileSidebar";
import ProfileInfoForm from "./__components/ProfileInfoForm";

type Props = {};

const ProfilePage = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);

  return (
    <div>
      <ProtectedRoute>
        <MetaDataProvider
          title="Profile Page"
          description="Fullstack Job Searching Site by @RiP3rQ"
        />
        <div className="max-w-7xl mx-auto mt-2 flex items-center justify-center">
          <div className="flex items-center justify-center rounded-xl h-5/6">
            <div className="w-72">
              <ProfileSidebar
                user={user}
                active={active}
                avatar={avatar}
                setActive={setActive}
              />
            </div>
            <div className="flex-1 flex-shrink-0 h-full">
              {active === 1 && (
                <ProfileInfoForm
                  user={user}
                  avatar={avatar}
                  setActive={setActive}
                />
              )}
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </div>
  );
};

export default ProfilePage;