import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import SideBar from "./SideBar";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <SideBar />
        <div className="flex-grow mt-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
