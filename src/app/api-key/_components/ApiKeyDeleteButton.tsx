/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Tags } from "@/constants/tags";
import { useTokenDeleteByIdMutation } from "@/lib/modules/token/token.query";

type TProps = {
  id: string;
  children?: React.ReactNode;
};

const ApiKeyDeleteButton = ({ id, children }: TProps) => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const queryClient = useQueryClient();

  const { mutateAsync: deleteApiKey, isPending } = useTokenDeleteByIdMutation();

  const handleDelete = async () => {
    try {
      const result = await deleteApiKey(id);

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
    } finally {
      setOpen(false);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent className="!rounded-none">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this Api Key?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This will delete all this Api Key permanently. You can not reverse
            this. Do you understand that?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <label className="flex items-center gap-2">
          <Input
            type="checkbox"
            className="size-4"
            onChange={(e) => setDisabled(!e.target.checked)}
          />{" "}
          <span className="text-slate-700">Yes, I understand.</span>
        </label>

        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-none">Cancel</AlertDialogCancel>
          <Button
            className="rounded-none"
            disabled={disabled || isPending}
            variant="destructive"
            onClick={handleDelete}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ApiKeyDeleteButton;
