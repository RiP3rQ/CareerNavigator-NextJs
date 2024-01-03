"use client";

import SearchBar from "@/components/SearchBar";
import React, { useEffect, useState } from "react";
import IconFilterItem from "./IconFilterItem";
import MoreFiltersButton from "./MoreFiltersButton";
import { filterIconsData } from "@/lib/filterIconsData";
import {
  useFilterJobOffersBySkillsMutation,
  useFilterJobOffersByTitleMutation,
} from "@/redux/features/jobOffer/jobOfferApi";
import { JobOffer } from "@/types/jobOffer";
import { toast } from "sonner";

type Props = {
  setJobOffers: (jobOffers: JobOffer[]) => void;
  handleRefetch: () => void;
};

const JobOffersFilters: React.FC<Props> = ({ setJobOffers, handleRefetch }) => {
  const [searchFilter, setSearchFilter] = useState<string>(""); // "title"
  const [searchTagFilter, setSearchTagFilter] = useState<string>(""); // "tags"
  const [searchReady, setSearchReady] = useState<boolean>(false);

  // redux filter jobOffers
  const [filterJobOffersByTitle, { isSuccess, error }] =
    useFilterJobOffersByTitleMutation();

  // redux filter jobOffers by tags
  const [
    filterJobOffersBySkills,
    { isSuccess: isSuccessTag, error: errorTag },
  ] = useFilterJobOffersBySkillsMutation();

  // Actions base on searchFilterStates
  useEffect(() => {
    if (searchTagFilter) {
      filterJobOffersBySkills({ tag: searchTagFilter }).then((res: any) => {
        setJobOffers(res.data.jobOffers);
      });
      console.log("filterJobOffersBySkills");
      return;
    } else if (searchTagFilter === "" && !searchFilter && !searchReady) {
      setSearchReady(false);
      handleRefetch();
      console.log("handleRefetch via tag");
      return;
    } else if (searchFilter === "" && searchReady) {
      setSearchReady(false);
      handleRefetch();
      console.log("handleRefetch");
      return;
    } else if (searchFilter && searchReady) {
      filterJobOffersByTitle({ title: searchFilter }).then((res: any) => {
        setJobOffers(res.data.jobOffers);
      });
      console.log("filterJobOffersByTitle");
      return;
    }
  }, [searchFilter, searchReady, searchTagFilter]);

  // Actions after fetching data with SearchBar
  useEffect(() => {
    if (isSuccess) {
      setSearchReady(false);
    }
    if (error) {
      console.log(error);
    }
  }, [isSuccess, error]);

  // Actions after fetching data with IconFilterItem
  useEffect(() => {
    if (isSuccessTag) {
      setSearchReady(false);
    }
    if (errorTag) {
      console.log(errorTag);
    }
  }, [isSuccessTag, errorTag]);

  return (
    <div
      className="w-full h-fit flex mb-2 bg-slate-200 p-1 rounded-lg"
      id="top-search-filters"
    >
      <div className="w-[40%] h-10">
        <SearchBar
          setSearchReady={setSearchReady}
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
          placeholder="Search job titles..."
        />
      </div>
      <div className="w-[45%] h-10 flex flex-row items-center justify-center overflow-x-auto">
        {filterIconsData.map((filterIconData, index) => (
          <IconFilterItem
            key={index}
            image={filterIconData.image}
            filterValue={filterIconData.filterValue}
            searchTagFilter={searchTagFilter}
            setSearchTagFilter={setSearchTagFilter}
          />
        ))}
      </div>
      <div className="w-[15%] h-10">
        <MoreFiltersButton />
      </div>
    </div>
  );
};

export default JobOffersFilters;
