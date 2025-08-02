import { cookies } from "next/headers";
import verifyJwt from "./verify-jwt";

/**
 * Server-side authentication check using httpOnly cookies
 * @returns Promise<boolean> - true if authenticated, false otherwise
 */
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    if (!process.env.NEXT_PUBLIC_JWT_SECRET_KEY) {
      return false;
    }

    const authSession = cookies().get("AUTH_SESSION");
    const token = authSession?.value;

    if (!token) {
      return false;
    }

    const isValid = await verifyJwt(
      token,
      process.env.NEXT_PUBLIC_JWT_SECRET_KEY
    );

    return isValid;
  } catch (error) {
    return false;
  }
};
