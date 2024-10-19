// pages/api/session.ts
import {
  createSession,
  deleteSession,
  updateSession,
} from "helpers/session-management";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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

export async function PUT(_: Request) {
  const token = cookies().get("AUTH_SESSION")?.value;
  if (!token) {
    return NextResponse.json({ success: false, userData: null });
  }
  const sessionUpdate = await updateSession();
  return NextResponse.json(sessionUpdate);
}

export async function DELETE(req: Request) {
  await deleteSession();
  return NextResponse.json({ success: true });
}
