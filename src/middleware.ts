/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { AUTH_KEY } from "./constants";
import { jwtHelpers } from "./utils/jwtHelpers";

export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const jwt = request.cookies.get(AUTH_KEY);

  if (!jwt?.value) {
    return NextResponse.redirect(new URL(`/sign-in`, request.url));
  }

  try {
    const decoded = await jwtHelpers.verifyToken(
      jwt.value,
      process.env.JWT_SECRET as string
    );

    if (pathName.includes("api-key") && decoded.payload?.access !== "admin") {
      return NextResponse.redirect(new URL(`/sign-in`, request.url));
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: any) {
    return NextResponse.redirect(new URL(`/sign-in`, request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/products",
    "/price-updates",
    "/scrape",
    "/saved-urls",
    "/history",
    "/api-key",
  ],
};
