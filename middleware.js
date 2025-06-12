import { NextResponse } from "next/server";

export function middleware(request) {
  const urlPath = request.nextUrl.pathname;
  const authToken = request.cookies.get("authToken");

  if (
    urlPath.startsWith("/admin") &&
    urlPath !== "/admin/login" &&
    !authToken
  ) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (urlPath === "/admin/login" && authToken) {
    const dashboardUrl = new URL("/admin/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
