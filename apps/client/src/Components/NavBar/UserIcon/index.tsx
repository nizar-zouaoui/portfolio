"use client";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Button from "../../Button";
import { useAuth } from "../../../Contexts/AuthContext";

const UserIcon: React.FC = () => {
  const { logout, userData } = useAuth(); // Access user and logout from AuthContext
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout(); // Call logout function from AuthContext
    setDropdownOpen(false); // Close dropdown after logging out
  };
  return userData ? (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center space-x-2"
      >
        <FaUserCircle className="text-2xl" />
        <span>
          {userData.username.length > 8
            ? `${userData.username.slice(0, 3)}...`
            : userData.username}
        </span>
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
          <div className="p-4">
            <p className="font-bold">{userData.username}</p>
            <p className="text-sm text-gray-600">{userData.email}</p>
            <hr className="my-2" />
            <Button
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </div>
  ) : (
    <a
      href="/login"
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Login
    </a>
  );
};

export default UserIcon;
