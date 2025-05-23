import Toasts from "@nizar-repo/toast/Toasts";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import PageHeader from "./PageHeader";
import SideBar from "./SideBar";
import { links, sideBarLinks } from "./links";
import useLayout from "./useLayout";

// Extract PageName as a union of pageName values
export type PageName = (typeof links)[number]["pageName"];

const Layout: React.FC = () => {
  const { isAuthenticated, toasts } = useLayout();

  return (
    <div className="flex flex-col h-screen">
      <Toasts toasts={toasts} />
      <Navbar />
      <div className="flex flex-grow">
        {isAuthenticated && <SideBar links={sideBarLinks} />}
        <div className="flex flex-grow flex-col">
          {isAuthenticated && <PageHeader />}
          <div className="flex-grow mt-12">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
