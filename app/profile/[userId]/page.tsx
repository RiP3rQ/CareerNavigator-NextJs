"use client";

import { useGetPublicProfileQuery } from "@/redux/features/user/userApi";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {};

const PublicProfilePage = (props: Props) => {
  const [user, setUser] = useState<any>(null);
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

  return <div>PublicProfilePage</div>;
};

export default PublicProfilePage;
