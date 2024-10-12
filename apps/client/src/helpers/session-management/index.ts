import "server-only";
import { cookies } from "next/headers";
import Api from "../../sdks";

const expiresIn = process.env.NEXT_PUBLIC_JWT_EXPIRES_IN
  ? Number(process.env.NEXT_PUBLIC_JWT_EXPIRES_IN)
  : 1;

export const createSession = (token: string) => {
  const expires = new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000);
  cookies().set("AUTH_SESSION", token, {
    httpOnly: false,
    secure: true,
    expires,
    sameSite: "lax",
    path: "/",
    name: "AUTH_SESSION",
  });
};

export const updateSession = async (): Promise<UpdateSessionReturnType> => {
  const oldToken = cookies().get("AUTH_SESSION")?.value;
  if (!oldToken) return null;
  Api.mainApi.setBearerToken(oldToken);
  try {
    const res = await Api.authSDK.refreshAccessToken();
    const expires = new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000);
    cookies().set("AUTH_SESSION", res.accessToken, {
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
};

export enum SESSION_STATUS {
  SESSION_UPDATED = "SESSION_UPDATED",
  SESSION_DELETED = "SESSION_DELETED",
}

export type UpdateSessionReturnType =
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
  | null;
