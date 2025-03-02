"use server";

import { AUTH_KEY, BACKEND_URL } from "@/constants";
import { TUrl } from "./url.type";
import { cookies } from "next/headers";

export const urlCreateAction = async (payload: Partial<TUrl>) => {
  const response = await fetch(`${BACKEND_URL}/api/url`, {
    method: "POST",
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

export const urlGetByIdAction = async (id: string) => {
  const response = await fetch(`${BACKEND_URL}/api/url/${id}`, {
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

export const urlGetAllAction = async (params: string) => {
  const response = await fetch(`${BACKEND_URL}/api/url?${params}`, {
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

export const urlUpdateAction = async ({
  id,
  payload,
}: {
  id: string;
  payload: Partial<TUrl>;
}) => {
  const response = await fetch(`${BACKEND_URL}/api/url/${id}`, {
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

export const urlDeleteByIdAction = async (id: string) => {
  const response = await fetch(`${BACKEND_URL}/api/url/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: (await cookies()).get(AUTH_KEY)?.value || "",
    },
    cache: "no-store",
  });

  const result = await response.json();

  return result;
};
