import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import React from "react";

type Props = {};

const MoreFiltersButton = (props: Props) => {
  return (
    <Button className="w-full h-full flex items-center justify-center rounded-lg hover:bg-purple-500">
      More filters
      <ChevronDown className="w-6 h-6 ml-2" />
    </Button>
  );
};

export default MoreFiltersButton;
