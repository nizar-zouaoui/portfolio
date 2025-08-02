import { NextConfig } from "next";
import { NextRequest, NextResponse } from "next/server";
import { redirectAuth } from "./helpers/authRedirection";
import { isAuthenticated } from "./helpers/authStatus.server";
export const publicPaths = ["/", "/about-us"];
export const authPaths = ["/login", "/sign-up"];

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/api/session") {
    return NextResponse.next();
  }

  const isPublicPath = publicPaths.includes(req.nextUrl.pathname);

  if (isPublicPath) {
    return NextResponse.next();
  }

  const isAuthPath = authPaths.includes(req.nextUrl.pathname);

  try {
    const authenticated = await isAuthenticated();
    return redirectAuth(req.url, authenticated, isAuthPath);
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config: NextConfig = {
  matcher: ["/", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
