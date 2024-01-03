import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
  onClick?: () => void;
};

const ApplyButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Button
      className="w-full h-16 bg-purple-400 rounded-lg text-white flex items-center justify-center text-3xl font-bold"
      onClick={onClick}
    >
      Apply
    </Button>
  );
};

export default ApplyButton;
