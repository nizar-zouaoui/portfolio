import { NextConfig } from "next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { redirectAuth } from "./helpers/authRedirection";
import verifyJwt from "./helpers/verify-jwt";
export const publicPaths = ["/", "/about-us"];
export const authPaths = ["/login", "/sign-up"];

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/api/session") {
    return NextResponse.next();
  }
  if (!process.env.NEXT_PUBLIC_JWT_SECRET_KEY) {
    throw new Error("NEXT_PUBLIC_JWT_SECRET_KEY is not provided!");
  }
  const isPublicPath = publicPaths.includes(req.nextUrl.pathname);

  if (isPublicPath) {
    return NextResponse.next();
  }

  const isAuthPath = authPaths.includes(req.nextUrl.pathname);
  const authSession = cookies().get("AUTH_SESSION");
  const token = authSession?.value;
  if (!token) {
    return redirectAuth(req.url, false, isAuthPath);
  }

  try {
    const isValid = await verifyJwt(
      token,
      process.env.NEXT_PUBLIC_JWT_SECRET_KEY
    );
    if (!isValid) throw new Error("Invalid token");
    return redirectAuth(req.url, true, isAuthPath);
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config: NextConfig = {
  matcher: ["/", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
