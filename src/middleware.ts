/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { AUTH_KEY } from "./constants";
import { jwtHelpers } from "./utils/jwtHelpers";

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get(AUTH_KEY);

  if (!jwt?.value) {
    return NextResponse.redirect(new URL(`/sign-in`, request.url));
  }

  try {
    await jwtHelpers.verifyToken(jwt.value, process.env.JWT_SECRET as string);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: any) {
    return NextResponse.redirect(new URL(`/sign-in`, request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - /sign-in (case insensitive)
     * - /api (API routes)
     * - /_next/static (static files)
     * - /_next/image (Next.js image optimization)
     * - /favicon.ico (favicon file)
     * - /public (public files)
     */
    "/((?!sign-in|api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
