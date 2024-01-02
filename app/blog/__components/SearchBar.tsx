import { Input } from "@/components/ui/input";
import React from "react";
import { CiSearch } from "react-icons/ci";

type Props = {
  setSearchReady: (ready: boolean) => void;
  searchFilter: string;
  setSearchFilter: (filter: string) => void;
};

const SearchBar: React.FC<Props> = ({
  setSearchReady,
  searchFilter,
  setSearchFilter,
}) => {
  return (
    <div className="w-96 relative">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearchReady(true);
        }}
      >
        <Input
          type="text"
          placeholder="Search for posts..."
          className="pr-10"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        />
        <CiSearch
          size={30}
          className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500 right-3"
          onClick={() => setSearchReady(true)}
        />
      </form>
    </div>
  );
};

export default SearchBar;
