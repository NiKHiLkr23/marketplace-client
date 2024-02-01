import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get a cookie
  request.cookies.get("isWalletConnected")?.value;

  // Get all cookies
  if (request.cookies.get("isWalletConnected")?.value === "true") {
    return NextResponse.redirect(new URL("/jobs", request.url));
  }

  // To change a cookie, first create a response
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
