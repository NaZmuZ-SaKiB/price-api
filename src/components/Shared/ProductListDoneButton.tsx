/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useProductUpdateMutation } from "@/lib/modules/product/product.query";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Tags } from "@/constants/tags";

type TProps = {
  id: string;
  defaultDone: boolean;
};

const ProductListDoneButton = ({ id, defaultDone }: TProps) => {
  const [done, setDone] = useState(defaultDone);
  const { mutateAsync: updateProduct, isPending } = useProductUpdateMutation();

  const queryClient = useQueryClient();

  const handleClick = async () => {
    try {
      const result = await updateProduct({ id, payload: { done: true } });

      if (result?.success) {
        setDone(true);
        toast.success(result?.message);

        queryClient.invalidateQueries({
          queryKey: [Tags.PRODUCT, "update-count"],
          exact: false,
        });
      } else {
        toast.error(result?.message || "A Server Error Occured.");
      }
    } catch (error: any) {
      toast.error(error?.message || "A Client Error Occured.");
    }
  };

  return (
    <Button
      disabled={isPending || done}
      className="disabled:bg-slate-300 disabled:text-slate-500"
      size="sm"
      onClick={handleClick}
    >
      {isPending ? "Updating..." : done ? "Done" : "Mark As Done"}
    </Button>
  );
};

export default ProductListDoneButton;
