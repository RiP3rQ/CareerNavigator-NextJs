import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useLoginModal } from "@/hooks/useLoginModal";

type Props = {};

const UserAvatar = (props: Props) => {
  const { onOpen } = useLoginModal();

  const handleAvatarClick = () => {
    onOpen();
  };

  return (
    <Avatar className="h-10 w-10 cursor-pointer" onClick={handleAvatarClick}>
      <AvatarImage src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" />
    </Avatar>
  );
};

export default UserAvatar;
