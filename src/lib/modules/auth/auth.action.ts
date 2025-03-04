/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { AUTH_KEY, BACKEND_URL } from "@/constants";
import { jwtHelpers } from "@/utils/jwtHelpers";
import { cookies } from "next/headers";
import { TTokenAccess } from "../token/token.type";
import { redirect } from "next/navigation";

export const signInAction = async (payload: { token: string }) => {
  const response = await fetch(`${BACKEND_URL}/api/token/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const result = await response.json();

  if (!result.success) {
    return result;
  }

  const token = result?.data;

  (await cookies()).set(AUTH_KEY, token, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    path: "/",
  });

  return result;
};

export const signOutAction = async () => {
  (await cookies()).delete(AUTH_KEY);
  redirect("/sign-in");
};

export const isTokenValidAction = async (): Promise<{
  token: string;
  access: TTokenAccess;
} | null> => {
  try {
    const jwt = (await cookies()).get(AUTH_KEY);
    if (!jwt?.value) {
      return null;
    }

    const decoded = (await jwtHelpers.verifyToken(
      jwt.value,
      process.env.JWT_SECRET as string
    )) as unknown as { payload: any };

    return decoded.payload;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
};
