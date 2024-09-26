// pages/api/session.ts
import {
  createSession,
  deleteSession,
  updateSession,
} from "../../../src/helpers/session-management";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import Api from "../../../src/sdks";
import { redirectAuth } from "../../../src/helpers/authRedirection";
import { authPaths } from "../../../middleware";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const body = await req.json();
    const { token } = body;
    if (!token) {
      return NextResponse.json({ error: "Token not provided" });
    }
    try {
      createSession(token);
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json({ error: "Failed to create session" });
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" });
  }
}

export async function GET(_: Request) {
  const token = cookies().get("AUTH_SESSION")?.value;
  return NextResponse.json({ token });
}

export async function PUT(req: Request) {
  const token = cookies().get("AUTH_SESSION")?.value;
  const isAuthPath = authPaths.includes(req.url);
  if (!token) {
    return redirectAuth(req.url, false, isAuthPath);
  }
  try {
    await Api.authSDK.verifyAccessToken({
      params: {
        token,
      },
    });
  } catch (error) {
    return redirectAuth(req.url, false, isAuthPath);
  }
  const sessionUpdate = await updateSession();
  if (!sessionUpdate || sessionUpdate.sessionStatus === "Session Deleted") {
    return redirectAuth(req.url, false, isAuthPath);
  }
  return NextResponse.json({ success: true, userData: sessionUpdate.userData });
}

export async function DELETE(req: Request) {
  await deleteSession();
  return NextResponse.json({ success: true });
}
