/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Tags } from "@/constants/tags";
import { useProductDeleteNotInStockMutation } from "@/lib/modules/product/product.query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const DeleteNotInStockButton = () => {
  const { mutateAsync: deleteNotInStock, isPending } =
    useProductDeleteNotInStockMutation();

  const queryClient = useQueryClient();

  const handleClick = async () => {
    try {
      const result = await deleteNotInStock();

      if (result?.success) {
        queryClient.invalidateQueries({
          queryKey: [Tags.PRODUCT, Tags.ALL],
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
      Delete Not in Stock
    </Button>
  );
};

export default DeleteNotInStockButton;
