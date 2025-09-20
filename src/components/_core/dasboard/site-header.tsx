"use client";
import { X, Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface WatchlistItem {
  id: string;
  title: string;
  symbol: string;
  logo: string;
}

const SiteHeader = () => {
  const [active, setActive] = useState("Apple");
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([
    { id: "1", title: "Apple", symbol: "AAPL", logo: "/apple_logo.svg.svg" },
    { id: "2", title: "Orange", symbol: "ORNG", logo: "/apple_logo.svg.svg" },
    { id: "3", title: "Avalanche", symbol: "AVAX", logo: "/apple_logo.svg.svg" },
    { id: "4", title: "BTCUSD", symbol: "BTCUSD", logo: "/apple_logo.svg.svg" },
  ]);

  const removeFromWatchlist = (id: string) => {
    setWatchlist(prev => prev.filter(item => item.id !== id));
    // If we removed the active item, set a new active
    if (active === watchlist.find(item => item.id === id)?.title) {
      const remaining = watchlist.filter(item => item.id !== id);
      if (remaining.length > 0) {
        setActive(remaining[0].title);
      }
    }
  };

  const addToWatchlist = () => {
    // This would typically open a modal to search and add new symbols
    const newItem: WatchlistItem = {
      id: Date.now().toString(),
      title: "New Stock",
      symbol: "NEW",
      logo: "/apple_logo.svg.svg"
    };
    setWatchlist(prev => [...prev, newItem]);
  };

  return (
    <div className="flex gap-4 bg-black items-center px-6 py-4 sticky w-full top-0 z-50">
      <Image src="/logo.svg" width={100} height={100} alt="olive option" />
      <div className="flex justify-between items-center gap-4"></div>
      <div className="flex gap-3 items-center">
        {watchlist.map((item) => (
          <div
            role="button"
            onClick={() => setActive(item.title)}
            key={item.id}
            className={`flex items-center min-h-[58px] border border-[#8F8E8E] px-4 py-2 rounded-md cursor-pointer transition-colors ${
              active === item.title ? "bg-[#8F8E8E]" : "hover:bg-gray-800"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="flex bg-[#26262BBA] justify-center items-center rounded-full h-[36px] w-[36px]">
                <Image
                  src={item.logo}
                  width={20}
                  height={20}
                  alt={item.title}
                />
              </div>
              <div>
                <div className="flex gap-2 text-center">
                  <div className="font-medium">{item.title}</div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWatchlist(item.id);
                    }}
                    className="hover:bg-gray-600 rounded p-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <div className="text-sm text-gray-400">{item.symbol}</div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addToWatchlist}
          className="min-h-[64px] w-[64px] flex justify-center items-center rounded-md border border-[#8F8E8E] hover:bg-gray-800 transition-colors"
        >
          <Plus className="text-2xl font-bold" />
        </button>
      </div>
    </div>
  );
};

export default SiteHeader;
