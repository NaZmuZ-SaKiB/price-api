"use server";

import { BACKEND_URL } from "@/constants";
import { TProduct } from "./product.type";

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

export const productUpdateAction = async ({
  id,
  payload,
}: {
  id: string;
  payload: Partial<TProduct>;
}) => {
  const response = await fetch(`${BACKEND_URL}/api/product/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const result = await response.json();

  return result;
};
