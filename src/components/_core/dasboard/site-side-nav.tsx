"use client";
import { ArrowIcon, ChartIcon, PortfolioIcon } from "@/components/svg";
import React, { useState } from "react";

const SIDE_NAV = [
  { title: "Trade", icon: <ChartIcon /> },
  { title: "Total Portfolio", icon: <PortfolioIcon />, route: "/dashboard" },
  { title: "Trading History", icon: <ChartIcon /> },
  { title: "Market Analysis", icon: <ChartIcon /> },
  { title: "Alerts", icon: <ChartIcon /> },
  { title: "LeaderBoard", icon: <ChartIcon /> },
  { title: "Promo", icon: <ChartIcon /> },
  { title: "Settings", icon: <ChartIcon /> },
  { title: "Support", icon: <ChartIcon /> },
];
const SideNav = () => {
  const [showText, setShowText] = useState(false);
  return (
    <div className="p-6 grid gap-8">
      <div onClick={() => setShowText(!showText)} role="button" className="cursor-pointer flex max-w-[80px] justify-center items-center mb-3">
        <span className={`${showText ? "rotate-180" : ""} text-[#B0B0B2]`}>
          <ArrowIcon />
        </span>
      </div>
      {SIDE_NAV.map((nav) => (
        <div className={`${showText ? "bg-[#2E4CE51A] py-3 px-2 rounded-md": ""} cursor-pointer transition-all duration-300 flex gap-3 flex-col items-center justify-center text-center max-w-[90px]`}>
          {nav.icon}
          <div className={`${showText ? "block" : "hidden"} text-sm`}>{nav.title}</div>
        </div>
      ))}
    </div>
  );
};

export default SideNav;
