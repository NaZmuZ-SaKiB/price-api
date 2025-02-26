"use server";

import { BACKEND_URL } from "@/constants";
import { TToken } from "./token.type";

export const tokenCreateAction = async ({ payload }: { payload: TToken }) => {
  const response = await fetch(`${BACKEND_URL}/api/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
    },
    cache: "no-store",
  });

  const result = await response.json();

  return result;
};
