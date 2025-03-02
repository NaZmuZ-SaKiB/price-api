import { Tags } from "@/constants/tags";
import { useMutation, useQuery } from "@tanstack/react-query";
import { historyClearAction, historyGetAllAction } from "./history.action";

export const useHistoryGetAllQuery = (params: string) =>
  useQuery({
    queryKey: [Tags.HISTORY, Tags.ALL, params],
    queryFn: () => historyGetAllAction(params),
  });

export const useHistoryClearMutation = () =>
  useMutation({
    mutationFn: historyClearAction,
  });
