"use server";

import { AUTH_KEY, BACKEND_URL } from "@/constants";
import { cookies } from "next/headers";

export const historyGetAllAction = async (params: string) => {
  const response = await fetch(`${BACKEND_URL}/api/history?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: (await cookies()).get(AUTH_KEY)?.value || "",
    },
    cache: "no-store",
  });

  const result = await response.json();

  if (!result?.success) {
    return {
      data: [],
      meta: {},
    };
  }

  return result;
};

export const historyClearAction = async () => {
  const response = await fetch(`${BACKEND_URL}/api/history/clear`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: (await cookies()).get(AUTH_KEY)?.value || "",
    },
  });

  return await response.json();
};
