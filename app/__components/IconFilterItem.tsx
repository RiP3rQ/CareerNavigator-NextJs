"use client";

import Image from "next/image";
import React from "react";

type Props = {
  image: string;
  filterValue: string;
  searchTagFilter: string;
  setSearchTagFilter: (filter: string) => void;
};

const IconFilterItem: React.FC<Props> = ({
  image,
  filterValue,
  searchTagFilter,
  setSearchTagFilter,
}) => {
  const handleFilterIconClick = () => {
    if (searchTagFilter === filterValue) {
      setSearchTagFilter("");
      return;
    }
    setSearchTagFilter(filterValue);
  };

  const isFilterActive = searchTagFilter === filterValue;

  return (
    <div className="w-full h-full relative  flex items-center justify-center">
      <Image
        src={image}
        alt={filterValue}
        width={40}
        height={40}
        className={`rounded-full cursor-pointer hover:border-2 hover:border-slate-800 ${
          isFilterActive ? "border-2 border-purple-700 animate-bounce" : ""
        }`}
        onClick={handleFilterIconClick}
      />
    </div>
  );
};

export default IconFilterItem;
