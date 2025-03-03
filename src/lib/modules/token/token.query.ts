import { Tags } from "@/constants/tags";
import {
  dashboardAction,
  tokenCreateAction,
  tokenDeleteByIdAction,
  tokenDeleteExpiredAction,
  tokenGetAllAction,
  tokenGetByIdAction,
} from "./token.action";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useTokenGetAllQuery = (params: string) =>
  useQuery({
    queryKey: [Tags.TOKEN, Tags.ALL, params],
    queryFn: () => tokenGetAllAction(params),
  });

export const useTokenGetByIdQuery = (id: string) =>
  useQuery({
    queryKey: [Tags.TOKEN, id],
    queryFn: () => tokenGetByIdAction(id),
  });

export const useTokenCreateMutation = () =>
  useMutation({
    mutationFn: tokenCreateAction,
  });

export const useTokenDeleteByIdMutation = () =>
  useMutation({
    mutationFn: tokenDeleteByIdAction,
  });

export const useTokenDeleteExpiredMutation = () =>
  useMutation({
    mutationFn: tokenDeleteExpiredAction,
  });

export const useDashboardQuery = () =>
  useQuery({
    queryKey: [Tags.DASHBOARD],
    queryFn: dashboardAction,
  });
