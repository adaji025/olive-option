"use client";
import { Search } from "lucide-react";
import React, { useState } from "react";

const POPULAR_CRYPTOS = [
  { symbol: "BTCUSD", name: "Bitcoin" },
  { symbol: "ETHUSD", name: "Etherium" },
  { symbol: "BNBUSD", name: "BNB" },
  { symbol: "SOLUUSD", name: "Solana" },
  { symbol: "ADAUSD", name: "Cardana" },
  { symbol: "XRTUSD", name: "XRP" },
  { symbol: "DOTUSD", name: "Polkadol" },
  { symbol: "AVAXUSD", name: "Avalanche" },
];

const TradingChart = () => {
  const [currentSymbol, setCurrentSymbol] = useState("BTCUSD");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  return (
    <div
      className={`bg-white rounded-lg shadow-lg ${
        isFullScreen ? "fixed inset-0 z-50 rounded-none" : "relative"
      }`}
    >
      <div className="bg-gray-100 p-4 border-green-500 border-b">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-800">
              {currentSymbol}
            </h2>
            <span className="text-sm text-gray-500">
              {POPULAR_CRYPTOS.find((crypto) => crypto.symbol === currentSymbol)
                ?.name || "Cryptocurrency"}
            </span>
          </div>
          {/* controls */}
          <div className="flex flex-col sm:flex-row w-full sm:w-auto">
            {/* Search form */}
            <form >
                <div className="relative">
                    <Search className="abso" />
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingChart;
