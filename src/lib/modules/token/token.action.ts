"use server";

import { AUTH_KEY, BACKEND_URL } from "@/constants";
import { TToken } from "./token.type";
import { cookies } from "next/headers";

export const tokenCreateAction = async (payload: Partial<TToken>) => {
  const response = await fetch(`${BACKEND_URL}/api/token`, {
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

export const tokenGetAllAction = async (params: string) => {
  const response = await fetch(`${BACKEND_URL}/api/token?${params}`, {
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

export const tokenGetByIdAction = async (id: string) => {
  const response = await fetch(`${BACKEND_URL}/api/token/${id}`, {
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

export const tokenDeleteByIdAction = async (id: string) => {
  const response = await fetch(`${BACKEND_URL}/api/token/${id}`, {
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

export const tokenDeleteExpiredAction = async () => {
  const response = await fetch(`${BACKEND_URL}/api/token/expired`, {
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

export const dashboardAction = async () => {
  const response = await fetch(`${BACKEND_URL}/api/token/dashboard`, {
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
