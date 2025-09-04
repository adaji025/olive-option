import Image from "next/image";
import React from "react";

const SiteHeader = () => {
  return (
    <div className="flex gap-4 items-center px-6 py-2">
      <Image src="/logo.svg" width={100} height={100} alt="olive option" />
    </div>
  );
};

export default SiteHeader;
