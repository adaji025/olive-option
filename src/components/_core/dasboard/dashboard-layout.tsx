import React from "react";
import SideNav from "./site-side-nav";
import SiteHeader from "./site-header";

const DashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
      <SiteHeader />
      <div className="flex">
        <SideNav />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
