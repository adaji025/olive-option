"use client";

import dynamic from "next/dynamic";

const TradingChart = dynamic(
  () => import("@/components/_core/dasboard/chart"),
  { ssr: false }
);

const Page = () => {
  return (
    <div className="flex-1 bg-white w-full">
      <TradingChart />
    </div>
  );
};

export default Page;
