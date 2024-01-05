"use client";

import MetaDataProvider from "@/app/providers/MetaDataProvider";
import { useGetPublicProfileQuery } from "@/redux/features/user/userApi";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import UserProfileHeader from "./__components/UserProfileHeader";
import { IUser } from "@/types/user";
import UserExperience from "./__components/UserExperience";
import UserEducation from "./__components/UserEducation";
import UserSkills from "./__components/UserSkills";
import UserCV from "./__components/UserCV";

type Props = {};

const PublicProfilePage = (props: Props) => {
  const [user, setUser] = useState<IUser | null>(null);
  const userId = usePathname().split("/")[2];
  // redux action to get user public profile
  const { data, isSuccess, error } = useGetPublicProfileQuery(
    { userId },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      setUser(data.user);
    }
    if (error) {
      console.log(error);
    }
  }, [isSuccess, error]);

  return (
    <div className="max-w-7xl px-4 py-4 lg:mx-auto space-y-2">
      <MetaDataProvider
        title="Public Profile"
        description="Fullstack Job Searching Site by @RiP3rQ"
      />
      <UserProfileHeader
        profileImage={user?.avatar.url}
        firstName={user?.firstName}
        lastName={user?.lastName}
        email={user?.email}
        bio={user?.bio}
        socials={user?.social}
      />
      <UserExperience experience={user?.experience} />
      <UserEducation education={user?.education} />
      <UserSkills skills={user?.skills} />
      <UserCV CV={user?.CV} />
    </div>
  );
};

export default PublicProfilePage;
