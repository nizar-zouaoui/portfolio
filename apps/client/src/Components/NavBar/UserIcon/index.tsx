"use client";
import { Button } from "@nizar-repo/ui";
import Icons from "@nizar-repo/ui/src/components/Icons";
import Link from "next/link";
import React from "react";
import useUserIcon from "./useUserIcon";

const UserIcon: React.FC = () => {
  const { dropdownOpen, setDropdownOpen, userData, handleLogout } =
    useUserIcon();
  return userData ? (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center text-gray-800 dark:text-gray-100 space-x-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
      >
        <Icons.User className="text-2xl" />
        <span>
          {userData.username
            ? userData.username.length > 8
              ? `${userData.username.slice(0, 3)}...`
              : userData.username
            : "User"}
        </span>
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 border-solid bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
          <div className="p-4">
            <p className="font-bold text-gray-800 dark:text-gray-100">
              {userData.username}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {userData.email}
            </p>
            <hr className="my-2 border-neutral-200 dark:border-neutral-600" />
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
    <Link href="/login">
      <Button variant="primary">Login</Button>
    </Link>
  );
};

export default UserIcon;
