"use client";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const SiteHeader = () => {
  const [active, setActive] = useState("Apple");

  const DATA = [
    { title: "Apple" },
    { title: "Orange" },
    { title: "Avalanche" },
    { title: "BTCUSD" },
  ];
  return (
    <div className="flex gap-4 bg-black items-center px-6 py-4 sticky w-full top-0 z-50">
      <Image src="/logo.svg" width={100} height={100} alt="olive option" />
      <div className="flex justify-between items-center gap-4"></div>
      <div className="flex gap-3 items-center">
        {DATA.map((item, index) => (
          <div
            role="button"
            onClick={() => setActive(item.title)}
            key={index}
            className={`flex items-center min-h-[58px] border border-[#8F8E8E] px-4 py-2 rounded-md cursor-pointer ${
              active === item.title ? "bg-[#8F8E8E]" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="flex bg-[#26262BBA] justify-center items-center rounded-full h-[36px] w-[36px]">
                <Image
                  src="/apple_logo.svg.svg"
                  width={20}
                  height={20}
                  alt="apple"
                />
              </div>
              <div>
                <div className="flex gap-2 text-center">
                  <div className="font-medium">{item.title}</div>
                  <X className="w-3 h-3" />
                </div>
                <div>Stock</div>
              </div>
            </div>
          </div>
        ))}

        <div className="min-h-[64px] w-[64px] flex justify-center items-center in-checked: rounded-md border border-[#8F8E8E]">
          <div className="text-2xl font-bold">+</div>
        </div>
      </div>
    </div>
  );
};

export default SiteHeader;
