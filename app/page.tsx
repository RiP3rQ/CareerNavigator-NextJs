"use client";

import { Separator } from "@/components/ui/separator";
import MetaDataProvider from "./providers/MetaDataProvider";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import IconFilterItem from "./__components/IconFilterItem";
import { filterIconsData } from "@/lib/filterIconsData";
import MoreFiltersButton from "./__components/MoreFiltersButton";
import JobOffers from "./__components/JobOffers";
import Map from "@/components/Map";

export default function Home() {
  const [searchFilter, setSearchFilter] = useState<string>(""); // "title"
  const [searchTagFilter, setSearchTagFilter] = useState<string>(""); // "tags"
  const [searchReady, setSearchReady] = useState<boolean>(false);

  return (
    <div className="">
      <MetaDataProvider
        title="CareerNavigator"
        description="Fullstack Job Searching Site by @RiP3rQ"
      />
      <div className="w-full h-full mt-4 px-4" id="Wrapper">
        <div className="w-full h-fit flex" id="top-search-filters">
          <div className="w-[40%] h-10">
            <SearchBar
              setSearchReady={setSearchReady}
              searchFilter={searchFilter}
              setSearchFilter={setSearchFilter}
              placeholder="Search job titles..."
            />
          </div>
          <div className="w-[45%] h-10 flex flex-row items-center justify-center">
            {filterIconsData.map((filterIconData, index) => (
              <IconFilterItem
                key={index}
                image={filterIconData.image}
                filterValue={filterIconData.filterValue}
                setFilter={setSearchTagFilter}
              />
            ))}
          </div>
          <div className="w-[15%] h-10">
            <MoreFiltersButton />
          </div>
        </div>
        <div className="w-full h-[80vh] flex" id="main-content">
          <div className="w-[50%] h-full">
            <JobOffers />
          </div>
          <div className="w-[50%] h-full bg-green-400">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
}

// Main page
// TODO: Edit job offer functionality
// TODO: Crated job offer functionality
// TODO: Sindle job offer page
// TODO: Filter job offers by tags
// TODO: Filter job offers by title

// TODO: Add job offer to favorites
// TODO: Add job offer to applied

// TODO: Pro modal for payments
// TODO: Socket.io for alerts
// TODO: Chat functionality

{
  /* <div className="w-full min-h-[90vh] flex items-center justify-center flex-col">
        <h1 className="text-6xl font-bold text-purple-700 mb-2 animate-pulse">
          CareerNavigator
        </h1>
        <h5>Loading page ...</h5>
      </div> */
}
