"use server";

import { AUTH_KEY, BACKEND_URL } from "@/constants";
import { cookies } from "next/headers";

export const scrapeAction = async (url: string) => {
  const response = await fetch(`${BACKEND_URL}/api/scrape`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: (await cookies()).get(AUTH_KEY)?.value || "",
    },
    body: JSON.stringify({ url }),
    cache: "no-store",
  });

  const result = await response.json();

  return result;
};
