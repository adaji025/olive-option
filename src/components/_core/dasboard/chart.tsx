"use client";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

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

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);

  // Load TradingView script only once
  useEffect(() => {
    // Check if script is already loaded
    if (window.TradingView) {
      setIsScriptLoaded(true);
      return;
    }

    // Create and load the TradingView script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      setIsScriptLoaded(true);
    };
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Only remove if we added it
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Initialize or update the TradingView widget
  useEffect(() => {
    if (!isScriptLoaded || !chartContainerRef.current) return;

    // Clear previous widget if it exists
    if (widgetRef.current) {
      widgetRef.current.remove();
    }
    // Clear the container
    chartContainerRef.current.innerHTML = "";

    // Create new widget
    widgetRef.current = new window.TradingView.widget({
      autosize: true,
      symbol: currentSymbol,
      container_id: chartContainerRef.current.id,
      interval: "1D",
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
    });

    // Cleanup function
    return () => {
      if (widgetRef.current) {
        widgetRef.current.remove();
        widgetRef.current = null;
      }
    };
  }, [isScriptLoaded, currentSymbol]);

  // Handle custom search
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Ensure the symbol ends with USD for crypto pairs
      const symbol = searchTerm.toUpperCase().endsWith("USD")
        ? searchTerm.toUpperCase()
        : searchTerm.toUpperCase() + "USD";
      handleSymbolChange(symbol);
    }
  };

  // Handle symbol change
  const handleSymbolChange = (symbol: string) => {
    setCurrentSymbol(symbol.toUpperCase());
    setSearchTerm("");
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div
      className={`bg-white w-full rounded-lg shadow-lg ${
        isFullScreen ? "fixed inset-0 z-50 rounded-none" : "relative"
      }`}
    >
      {/* Headers with controls */}
      <div className="w-full bg-gray-100 p-4 border-green-500 border-b">
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
          <div className="flex flex-col sm:flex-row w-full gap-2 sm:w-auto">
            {/* Search form */}
            <form className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter crypto symbol"
                  // value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-black pr-4 py-2 border border-gray-300 rounded-md focus:outline-none text-sm w-full sm:w-48"
                />
              </div>
              <Button>Search</Button>
            </form>
            <button
              onClick={toggleFullScreen}
              className="flex items-center gap-2 px-3 text-gray-700 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors text-sm"
            >
              {isFullScreen ? (
                <>
                  <Minimize2 className="w-4 h-4" /> Exit Fullscreen
                </>
              ) : (
                <>
                  <Maximize2 className="w-4 h-4" />
                  Fullscreen
                </>
              )}
            </button>
          </div>
        </div>

        {/* Popular crypt buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          {POPULAR_CRYPTOS.map((crypto) => (
            <button
              onClick={() => handleSymbolChange(crypto.symbol)}
              key={crypto.symbol}
              className={`px-3 py-1 text-sm transition-colors rounded-md ${
                currentSymbol === crypto.symbol
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {crypto.name}
            </button>
          ))}
        </div>

        {/* Chart container */}
        <div
          className={`bg-white mt-4 ${
            isFullScreen ? "h-[calc(100vh-140px)]" : "h-[500px]"
          }`}
        >
          <div
            ref={chartContainerRef}
            id="tradingView-chart"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TradingChart;
