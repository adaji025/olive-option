"use client";
import React, { useState } from "react";
import HistoryTable from "./history-table";

const TradeHistory = () => {
  const [tab, setTab] = useState<"trade" | "pending">("trade");
  return (
    <div>
      <div className="flex border-b border-[#6B6C70CC] px-4 gap-4">
        <div
          role="button"
          onClick={() => setTab("trade")}
          className={`cursor-pointer font-bold py-2 ${
            tab === "trade" ? "border-b-4 border-[#4C66EB]" : "text-[#6B6C70CC]"
          }`}
        >
          Trade History
        </div>
        <div
          role="button"
          onClick={() => setTab("pending")}
          className={`cursor-pointer font-bold py-2 ${
            tab === "pending"
              ? "border-b-4 border-[#4C66EB]"
              : "text-[#6B6C70CC]"
          }`}
        >
          Pending History
        </div>
      </div>

      <div className="mt-10">
        <HistoryTable />
      </div>
    </div>
  );
};

export default TradeHistory;
