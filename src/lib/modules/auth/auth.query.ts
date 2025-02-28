import { useMutation } from "@tanstack/react-query";
import { signInAction, signOutAction } from "./auth.action";

export const useSignInMutation = () =>
  useMutation({
    mutationFn: signInAction,
  });

export const useSignOutMutation = () =>
  useMutation({
    mutationFn: signOutAction,
  });
