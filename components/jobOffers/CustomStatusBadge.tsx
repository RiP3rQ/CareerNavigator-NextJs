import React from "react";
import { Badge } from "../ui/badge";

type Props = {
  status: string;
};

const CustomStatusBadge: React.FC<Props> = ({ status }) => {
  const isOpened = status === "opened";
  const isRejected = status === "rejected";
  return (
    <Badge
      className={`text-white capitalize bg-orange-500 ${
        isOpened && "bg-green-500"
      } ${isRejected && "bg-red-500"}`}
      variant={"outline"}
    >
      {status}
    </Badge>
  );
};

export default CustomStatusBadge;
