"use server";

import { BACKEND_URL } from "@/constants";

export const scrapeAction = async (url: string) => {
  const response = await fetch(`${BACKEND_URL}/api/scrape`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
    cache: "no-store",
  });

  const result = await response.json();

  return result;
};
