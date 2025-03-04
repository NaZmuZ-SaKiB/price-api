/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Tags } from "@/constants/tags";
import { useTokenDeleteExpiredMutation } from "@/lib/modules/token/token.query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const DeleteExpiredKeysButton = () => {
  const { mutateAsync: deleteTokens, isPending } =
    useTokenDeleteExpiredMutation();

  const queryClient = useQueryClient();

  const handleClick = async () => {
    try {
      const result = await deleteTokens();

      if (result?.success) {
        queryClient.invalidateQueries({
          queryKey: [Tags.TOKEN, Tags.ALL],
          exact: false,
        });

        toast.success(result?.message);
      } else {
        toast.error(result?.message || "A server error occurred.");
      }
    } catch (error: any) {
      toast.error(error?.message || "A client error occurred.");
    }
  };

  return (
    <Button
      variant="destructive"
      className="rounded-none"
      disabled={isPending}
      onClick={handleClick}
    >
      Delete Expired
    </Button>
  );
};

export default DeleteExpiredKeysButton;
