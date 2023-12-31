"use client";

import React, { useState } from "react";
import MetaDataProvider from "../providers/MetaDataProvider";
import ProtectedRoute from "@/hooks/useProtectedRoute";
import { useSelector } from "react-redux";
import ProfileSidebar from "./__components/ProfileSidebar";
import ProfileForm from "./__components/ProfileForm";

type Props = {};

const ProfilePage = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);

  return (
    <div>
      <ProtectedRoute>
        <MetaDataProvider
          title="CareerNavigator"
          description="Fullstack Job Searching Site by @RiP3rQ"
        />
        <div className="max-w-7xl mx-auto h-full mt-2">
          <div className="grid grid-cols-4">
            <div className="col-span-1">
              <ProfileSidebar
                user={user}
                active={active}
                avatar={avatar}
                setActive={setActive}
              />
            </div>
            <div>
              <ProfileForm />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </div>
  );
};

export default ProfilePage;
