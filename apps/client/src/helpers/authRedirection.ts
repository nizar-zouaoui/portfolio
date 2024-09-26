import { NextResponse } from "next/server";

export const redirectAuth = (
  url: string,
  isAuth: boolean,
  isAuthPath: boolean
) => {
  if (!isAuth) {
    if (isAuthPath) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", url));
  }
  if (isAuth && isAuthPath) {
    return NextResponse.redirect(new URL("/", url));
  }
  return NextResponse.next();
};
