import { NextResponse } from "next/server";

export async function POST(request) {
  const { username, password } = await request.json();

  if (username === "admin" && password === "admin") {
    const response = NextResponse.json({ success: true });

    response.cookies.set("authToken", "authenticated", {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 5,
    });

    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
