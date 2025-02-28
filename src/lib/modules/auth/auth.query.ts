import { useMutation, useQuery } from "@tanstack/react-query";
import { isTokenValidAction, signInAction, signOutAction } from "./auth.action";
import { AUTH_KEY } from "@/constants";

export const useSignInMutation = () =>
  useMutation({
    mutationFn: signInAction,
  });

export const useSignOutMutation = () =>
  useMutation({
    mutationFn: signOutAction,
  });

export const useIsTokenValidQuery = () =>
  useQuery({
    queryKey: [AUTH_KEY],
    queryFn: isTokenValidAction,
  });
