import { Button } from "@/components/ui/button";
import React from "react";

type Props = {};

const ApplyButton = (props: Props) => {
  return (
    <Button className="w-full h-16 bg-purple-400 rounded-lg text-white flex items-center justify-center text-3xl font-bold">
      Apply
    </Button>
  );
};

export default ApplyButton;
