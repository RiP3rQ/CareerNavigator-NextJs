"use client";

import Image from "next/image";
import React from "react";

type Props = {
  image: string;
  filterValue: string;
  setFilter: (filter: string) => void;
};

const IconFilterItem: React.FC<Props> = ({ image, filterValue, setFilter }) => {
  return (
    <div className="w-full h-full relative  flex items-center justify-center">
      <Image
        src={image}
        alt={filterValue}
        width={40}
        height={40}
        className="rounded-full cursor-pointer hover:border-2 hover:border-slate-800"
        onClick={() => setFilter(filterValue)}
      />
    </div>
  );
};

export default IconFilterItem;
