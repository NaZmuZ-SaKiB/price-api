import { Tags } from "@/constants/tags";
import { useQuery } from "@tanstack/react-query";
import { productGetAllAction } from "./product.action";

export const useProductGetAllQuery = (params: string) =>
  useQuery({
    queryKey: [Tags.PRODUCT, Tags.ALL, params],
    queryFn: () => productGetAllAction(params),
  });
