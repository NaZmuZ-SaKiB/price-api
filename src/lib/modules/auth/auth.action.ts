"use server";

import { AUTH_KEY, BACKEND_URL } from "@/constants";
import { cookies } from "next/headers";

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
};
