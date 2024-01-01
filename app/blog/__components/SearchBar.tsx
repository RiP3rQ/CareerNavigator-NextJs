import { Input } from "@/components/ui/input";
import React from "react";
import { CiSearch } from "react-icons/ci";

type Props = {};

const SearchBar = (props: Props) => {
  return (
    <div className="w-96 relative">
      <Input type="text" placeholder="Search for posts..." className="pr-10" />
      <CiSearch
        size={30}
        className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500 right-3"
      />
    </div>
  );
};

export default SearchBar;
