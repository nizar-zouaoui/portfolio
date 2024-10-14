import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import SideBar from "./SideBar";
import useAuth from "../../contexts/AuthContext/useAuth";
import PageHeader from "./PageHeader";
import { links, sideBarLinks } from "./links";

// Extract PageName as a union of pageName values
export type PageName = (typeof links)[number]["pageName"];

const Layout = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="flex flex-col h-screen">
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
