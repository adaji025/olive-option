import React from "react";
import SideNav from "./site-side-nav";
import SiteHeader from "./site-header";

const DashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex flex-col items-start">
      <SiteHeader />
      <div className="flex items-start">
        <SideNav />
        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
