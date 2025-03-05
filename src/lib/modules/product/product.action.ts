"use server";

import { AUTH_KEY, BACKEND_URL } from "@/constants";
import { TProduct } from "./product.type";
import { cookies } from "next/headers";

export const productGetAllAction = async (params: string) => {
  const response = await fetch(`${BACKEND_URL}/api/product?${params}`, {
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

export const productGetUpdateCountAction = async () => {
  const response = await fetch(`${BACKEND_URL}/api/product/update-count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: (await cookies()).get(AUTH_KEY)?.value || "",
    },
    cache: "no-store",
  });

  const result = await response.json();

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
      Authorization: (await cookies()).get(AUTH_KEY)?.value || "",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const result = await response.json();

  return result;
};

export const productDeleteNotInStockAction = async () => {
  const response = await fetch(
    `${BACKEND_URL}/api/product/remove-not-in-stock`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get(AUTH_KEY)?.value || "",
      },
      cache: "no-store",
    }
  );

  const result = await response.json();

  return result;
};
