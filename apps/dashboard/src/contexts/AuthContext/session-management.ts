import Api from "../../sdks";

const expiresIn = process.env.VITE_JWT_EXPIRES_IN
  ? Number(process.env.VITE_JWT_EXPIRES_IN)
  : 1;

// Helper function to set a cookie
function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
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

// Create a session by setting a token cookie
export const createSession = (token: string) => {
  setCookie("AUTH_SESSION", token, expiresIn);
};

// Update session by refreshing the token
export const updateSession = async () => {
  const oldToken = getCookie("AUTH_SESSION");
  if (!oldToken) return null;

  try {
    const res = await Api.authSDK.refreshAccessToken();
    setCookie("AUTH_SESSION", res.accessToken, expiresIn);

    return {
      sessionStatus: "Session Updated",
      userData: {
        email: res.email,
        username: res.username,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    deleteSession();
    return {
      sessionStatus: "Session Deleted",
      userData: null,
    };
  }
};

// Delete session by removing the token cookie
export const deleteSession = () => {
  deleteCookie("AUTH_SESSION");
};
