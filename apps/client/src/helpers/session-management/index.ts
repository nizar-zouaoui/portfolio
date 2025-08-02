import { cookies } from "next/headers";
import Api from "sdks";
import "server-only";
import { SESSION_STATUS, UpdateSessionReturnType } from "./SessionTypes";

const expiresIn = process.env.NEXT_PUBLIC_JWT_EXPIRES_IN
  ? Number(process.env.NEXT_PUBLIC_JWT_EXPIRES_IN)
  : 1;

export const createSession = (token: string) => {
  const expires = new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000);
  const isProduction = process.env.NODE_ENV === "production";

  // Primary secure token (server-side only) - shared across same domain via Nginx
  cookies().set("AUTH_SESSION", token, {
    httpOnly: true, // ✅ Enhanced security - prevent XSS
    secure: true, // Always secure since Nginx serves HTTPS
    expires,
    sameSite: "lax", // ✅ 'lax' for same-site requests through Nginx
    path: "/", // Available across entire domain
  });

  // API access token (client-readable for backend requests) - shorter expiration for security
  const apiExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
  cookies().set("API_TOKEN", token, {
    httpOnly: false, // Client needs to read this for API requests
    secure: true, // Always secure since Nginx serves HTTPS
    expires: apiExpires, // Shorter expiration for added security
    sameSite: "lax", // ✅ 'lax' for same-site requests through Nginx
    path: "/", // Available across entire domain
  });

  // Session status indicator (client-readable for UI state) - shared across same domain
  cookies().set("AUTH_STATUS", "authenticated", {
    httpOnly: false, // Client needs to read this
    secure: true, // Always secure since Nginx serves HTTPS
    expires,
    sameSite: "lax", // ✅ 'lax' for same-site requests through Nginx
    path: "/", // Available across entire domain
  });
};

export const updateSession = async (): Promise<UpdateSessionReturnType> => {
  const oldToken = cookies().get("AUTH_SESSION")?.value;
  if (!oldToken) return null;
  Api.mainApi.setBearerToken(oldToken);
  try {
    const res = await Api.authSDK.refreshAccessToken();
    const expires = new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000);
    const apiExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

    // Update secure token - shared across same domain via Nginx
    cookies().set("AUTH_SESSION", res.accessToken, {
      httpOnly: true,
      secure: true,
      expires: expires,
      sameSite: "lax",
      path: "/",
    });

    // Update API access token - shared across same domain via Nginx
    cookies().set("API_TOKEN", res.accessToken, {
      httpOnly: false,
      secure: true,
      expires: apiExpires,
      sameSite: "lax",
      path: "/",
    });

    // Update status indicator - shared across same domain via Nginx
    cookies().set("AUTH_STATUS", "authenticated", {
      httpOnly: false,
      secure: true,
      expires: expires,
      sameSite: "lax",
      path: "/",
    });

    return {
      sessionStatus: SESSION_STATUS.SESSION_UPDATED,
      userData: {
        email: res.email,
        username: res.username,
      },
    };
  } catch (error) {
    deleteSession();
    return {
      sessionStatus: SESSION_STATUS.SESSION_DELETED,
      userData: null,
    };
  }
};

export const deleteSession = () => {
  cookies().delete("AUTH_SESSION");
  cookies().delete("API_TOKEN");
  cookies().delete("AUTH_STATUS");
};
