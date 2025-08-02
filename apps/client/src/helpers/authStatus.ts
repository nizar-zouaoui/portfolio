/**
 * Get authentication status from client-readable cookie (client-side only)
 * @returns boolean - true if status cookie indicates authenticated
 */
export const getClientAuthStatus = (): boolean => {
  if (typeof window === "undefined") return false;

  try {
    const cookies = document.cookie.split(";");
    const authStatus = cookies.find((cookie) =>
      cookie.trim().startsWith("AUTH_STATUS=")
    );

    return authStatus?.includes("authenticated") || false;
  } catch (error) {
    return false;
  }
};

/**
 * Client-side session check using sessionStorage as fallback
 * @returns boolean - true if session appears valid
 */
export const hasValidClientSession = (): boolean => {
  if (typeof window === "undefined") return false;

  try {
    // Check for client-readable auth status cookie
    const cookieAuth = getClientAuthStatus();
    if (cookieAuth) return true;

    // Fallback: check if we recently had a valid session
    const lastAuthCheck = sessionStorage.getItem("last_auth_check");
    if (lastAuthCheck) {
      const lastCheck = parseInt(lastAuthCheck);
      const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
      return lastCheck > fiveMinutesAgo;
    }

    return false;
  } catch (error) {
    return false;
  }
};

/**
 * Mark successful authentication in client storage
 */
export const markAuthSuccess = (): void => {
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem("last_auth_check", Date.now().toString());
    } catch (error) {
      // Ignore storage errors
    }
  }
};

/**
 * Clear client-side auth indicators
 */
export const clearClientAuth = (): void => {
  if (typeof window !== "undefined") {
    try {
      sessionStorage.removeItem("last_auth_check");
    } catch (error) {
      // Ignore storage errors
    }
  }
};
