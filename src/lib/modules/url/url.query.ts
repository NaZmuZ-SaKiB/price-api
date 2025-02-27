import { useMutation, useQuery } from "@tanstack/react-query";
import {
  urlCreateAction,
  urlDeleteByIdAction,
  urlGetAllAction,
  urlGetByIdAction,
  urlUpdateAction,
} from "./url.action";
import { Tags } from "@/constants/tags";

export const useUrlCreateMutation = () =>
  useMutation({
    mutationFn: urlCreateAction,
  });

export const useUrlUpdateMutation = () =>
  useMutation({
    mutationFn: urlUpdateAction,
  });

export const useUrlGetByIdQuery = (id: string) =>
  useQuery({
    queryKey: [Tags.URL, id],
    queryFn: () => urlGetByIdAction(id),
  });

export const useUrlGetAllQuery = (params: string) =>
  useQuery({
    queryKey: [Tags.URL, Tags.ALL, params],
    queryFn: () => urlGetAllAction(params),
  });

export const useUrlDeleteByIdMutation = () =>
  useMutation({
    mutationFn: urlDeleteByIdAction,
  });
