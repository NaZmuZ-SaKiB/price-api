import { Tags } from "@/constants/tags";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  productGetAllAction,
  productGetUpdateCountAction,
  productUpdateAction,
} from "./product.action";

export const useProductGetAllQuery = (params: string) =>
  useQuery({
    queryKey: [Tags.PRODUCT, Tags.ALL, params],
    queryFn: () => productGetAllAction(params),
  });

export const useProductGetUpdateCountQuery = () =>
  useQuery({
    queryKey: [Tags.PRODUCT, "update-count"],
    queryFn: productGetUpdateCountAction,
  });

export const useProductUpdateMutation = () =>
  useMutation({
    mutationFn: productUpdateAction,
  });
