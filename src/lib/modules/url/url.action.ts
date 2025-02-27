"use server";

import { BACKEND_URL } from "@/constants";
import { TUrl } from "./url.type";

export const urlCreateAction = async (payload: Partial<TUrl>) => {
  const response = await fetch(`${BACKEND_URL}/api/url`, {
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

export const urlGetByIdAction = async (id: string) => {
  const response = await fetch(`${BACKEND_URL}/api/url/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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
    },
    cache: "no-store",
  });

  const result = await response.json();

  return result;
};
