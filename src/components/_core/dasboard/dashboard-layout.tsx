import React from "react";
import SideNav from "./site-side-nav";
import SiteHeader from "./site-header";

const DashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="w-full flex flex-col items-start">
      <SiteHeader />
      <div className="w-full flex items-start">
        <SideNav />
        <div className="flex-1 py-4 w-full">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
