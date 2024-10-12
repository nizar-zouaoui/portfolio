import { useQuery } from "react-query";
import { updateSession } from "../../../Contexts/AuthContext/sessionHandlers";
import { useAuth } from "../../../Contexts/AuthContext";
import { useState } from "react";

const useUserIcon = () => {
  const { logout, userData } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  return {
    userData,
    dropdownOpen,
    setDropdownOpen,
    handleLogout,
  };
};

export default useUserIcon;
