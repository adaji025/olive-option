"use client";
import {
  AlertIcon,
  AnalysisIcon,
  ArrowIcon,
  ChartIcon,
  HistoryIcon,
  LearderBoardIcon,
  PortfolioIcon,
  PromoIcon,
  SupportIcon,
} from "@/components/svg";
import { SettingsIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const SIDE_NAV = [
  {
    title: "Trade",
    icon: <ChartIcon />,
    route: "/dashboard",
    key: ["dashboard"],
  },
  {
    title: "Total Portfolio",
    icon: <PortfolioIcon />,
    route: "/dashboard/portfolio",
    key: ["portfolio"],
  },
  {
    title: "Trading History",
    icon: <HistoryIcon />,
    route: "/dashboard/trading-history",
    key: ["trading-history"],
  },
  {
    title: "Market Analysis",
    icon: <AnalysisIcon />,
    route: "/dashboard/market-analysis",
    key: ["market-analysis"],
  },
  { title: "Alerts", icon: <AlertIcon />, route: "/alerts", key: ["alerts"] },
  {
    title: "LeaderBoard",
    icon: <LearderBoardIcon />,
    route: "/dashboard/leader-board",
    key: ["learder-board"],
  },
  {
    title: "Promo",
    icon: <PromoIcon />,
    route: "/dashboard/promo",
    key: ["promo"],
  },
  {
    title: "Settings",
    icon: <SettingsIcon />,
    route: "/dashboard/settings",
    key: ["settings"],
  },
  {
    title: "Support",
    icon: <SupportIcon />,
    route: "/dashboard/support",
    key: ["support"],
  },
];
const SideNav = () => {
  const [showText, setShowText] = useState(false);
  const pathName = usePathname();

  const segment = pathName.split("/dashboard")[1];
  const currentRoute = pathName === "/dashboard" ? ["dashboard"] : segment;

  return (
    <div className="site-nav-bar-scrollbar px-6 pb-6 h-screen grid gap-8 sticky top-10 overflow-auto">
      <div className="relative">
        <div className="ab max-w-[80px]  w-full">
          <div
            onClick={() => setShowText(!showText)}
            role="button"
            className="cursor-pointer flex max-w-[80px] p-4 bg-[#2E4CE51A] justify-center items-center mb-3"
          >
            <span className={`${showText ? "rotate-180" : ""} text-[#B0B0B2]`}>
              <ArrowIcon />
            </span>
          </div>
        </div>
      </div>
      {SIDE_NAV.map((nav) => {
        const isActive = nav.key.some((key) => currentRoute.includes(key));
        return (
          <Link href={nav.route}>
            <div
              className={`${
                isActive
                  ? "bg-[#2E4CE51A] py-3 px-2 rounded-md text-[#4C66EB]"
                  : "text-[#6B6C70]"
              } cursor-pointer transition-all duration-300 flex gap-3 flex-col items-center justify-center text-center max-w-[90px]`}
            >
              {nav.icon}
              <div className={`${showText ? "block" : "hidden"} text-sm`}>
                {nav.title}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SideNav;
