import Api from "sdks";

const expiresIn = process.env.VITE_JWT_EXPIRES_IN
  ? Number(process.env.VITE_JWT_EXPIRES_IN)
  : 1;

// Helper function to set a cookie with enhanced security - matching client app
function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  // Match client app settings: Secure, SameSite=Lax for same-domain sharing
  document.cookie = `${name}=${value}; ${expires}; path=/; Secure; SameSite=Lax`;
}

// Helper function to get a cookie
export function getCookie(name: string) {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const c = cookies[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length);
    }
  }
  return null;
}

// Helper function to delete a cookie
function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Lax`;
}

// Create a session by calling the client app's session API (shared domain)
export const createSession = async (token: string) => {
  try {
    // Since both apps are behind Nginx on https://localhost:3000,
    // we can make requests to the client app's API endpoints
    const response = await fetch("/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error("Failed to create session");
    }

    // The client app's API will set the httpOnly cookies,
    // and they'll be shared across the domain
    return response.json();
  } catch (error) {
    console.error("Failed to create session:", error);
    // Fallback: set status cookie manually
    setCookie("AUTH_STATUS", "authenticated", expiresIn);
  }
};

// Update session by calling the client app's session API (shared domain)
export const updateSession = async (): Promise<
  | {
      sessionStatus: SESSION_STATUS.SESSION_UPDATED;
      userData: {
        email: string;
        username: string;
      };
    }
  | {
      sessionStatus: SESSION_STATUS.SESSION_DELETED;
      userData: null;
    }
  | null
> => {
  try {
    // Use the client app's session API for consistency
    const response = await fetch("/api/session", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to update session");
    }

    return response.json();
  } catch (error) {
    console.error("Failed to update session:", error);
    // Fallback to local token refresh
    const oldToken = getCookie("API_TOKEN"); // Use API_TOKEN instead of AUTH_SESSION
    if (!oldToken) {
      return null;
    }

    try {
      const res = await Api.authSDK.refreshAccessToken();
      setCookie("API_TOKEN", res.accessToken, expiresIn / 48); // 30 minutes (1/48 of a day)
      setCookie("AUTH_STATUS", "authenticated", expiresIn);

      return {
        sessionStatus: SESSION_STATUS.SESSION_UPDATED,
        userData: {
          email: res.email,
          username: res.username,
        },
      };
    } catch {
      deleteSession();
      return {
        sessionStatus: SESSION_STATUS.SESSION_DELETED,
        userData: null,
      };
    }
  }
};

// Delete session by calling the client app's session API (shared domain)
export const deleteSession = async () => {
  try {
    // Use the client app's session API for consistency
    await fetch("/api/session", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Failed to delete session via API:", error);
  }

  // Also clear local cookies as fallback
  deleteCookie("AUTH_SESSION");
  deleteCookie("API_TOKEN");
  deleteCookie("AUTH_STATUS");
};

export enum SESSION_STATUS {
  SESSION_UPDATED = "SESSION_UPDATED",
  SESSION_DELETED = "SESSION_DELETED",
}
