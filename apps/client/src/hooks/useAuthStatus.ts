import { useEffect, useState } from "react";
import { hasValidClientSession } from "../helpers/authStatus";

/**
 * Custom hook to monitor authentication status from client-side indicators
 */
export const useAuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Initial check
    const checkAuthStatus = () => {
      const authStatus = hasValidClientSession();
      setIsAuthenticated(authStatus);
    };

    checkAuthStatus();

    // Poll for changes every 5 seconds (reasonable interval)
    const interval = setInterval(checkAuthStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  return isAuthenticated;
};
