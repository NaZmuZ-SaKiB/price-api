"use server";

import { BACKEND_URL } from "@/constants";

export const productGetAllAction = async (params: string) => {
  const response = await fetch(`${BACKEND_URL}/api/product?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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
