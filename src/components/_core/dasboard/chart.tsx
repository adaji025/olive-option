"use client";
import { Button } from "@/components/ui/button";
import { POPULAR_STOCKS } from "@/lib/constant";
import { Maximize2, Minimize2, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";



const StockChart = () => {
  const [currentSymbol, setCurrentSymbol] = useState("AAPL");
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
      symbol: `NASDAQ:${currentSymbol}`, // Add exchange prefix for stocks
      container_id: chartContainerRef.current.id,
      interval: "1D",
      timezone: "America/New_York", // US market timezone
      theme: "dark",
      style: "1",
      locale: "en",
      toolbar_bg: "#1e1e1e",
      enable_publishing: false,
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      studies: [
        "Volume@tv-basicstudies",
        "RSI@tv-basicstudies",
        "MACD@tv-basicstudies"
      ],
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
      // Stock symbols are typically 1-5 characters, uppercase
      const symbol = searchTerm.toUpperCase().trim();
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
      className={`bg-black w-full rounded-lg shadow-lg ${
        isFullScreen ? "fixed inset-0 z-50 rounded-none" : "relative"
      }`}
    >
      {/* Headers with controls */}
      <div className="w-full bg-black p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-white">
              {currentSymbol}
            </h2>
            <span className="text-sm text-gray-300">
              {POPULAR_STOCKS.find((stock) => stock.symbol === currentSymbol)
                ?.name || "Stock"}
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
                  placeholder="Enter stock symbol"
                  // value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-white bg-gray-800 border border-gray-600 rounded-md focus:outline-none text-sm w-full sm:w-48"
                />
              </div>
              <Button>Search</Button>
            </form>
            <button
              onClick={toggleFullScreen}
              className="flex items-center gap-2 px-3 text-gray-200 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors text-sm"
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

        {/* Popular stock buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          {POPULAR_STOCKS.map((stock) => (
            <button
              onClick={() => handleSymbolChange(stock.symbol)}
              key={stock.symbol}
              className={`px-3 py-1 text-sm transition-colors rounded-md ${
                currentSymbol === stock.symbol
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-gray-200 hover:bg-gray-600"
              }`}
            >
              {stock.name}
            </button>
          ))}
        </div>

        {/* Chart container */}
        <div
          className={`bg-black mt-4 ${
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

export default StockChart;
