/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tags } from "@/constants/tags";
import { useScrapeMutation } from "@/lib/modules/scrape/scrape.query";
import { useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

type TProps = {
  setResult: (data: any) => void;
};

const UrlInputBox = ({ setResult }: TProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const { mutateAsync: startScraping, isPending } = useScrapeMutation();

  const handleClick = async () => {
    const url = ref.current?.value;

    if (!url) {
      toast.message("URL is required");
      return;
    }
    setResult(null);

    const loadingId = toast.loading("Scraping Started...");

    try {
      const result = await startScraping(url);

      if (result?.success) {
        setResult(result?.data);
        queryClient.invalidateQueries({
          queryKey: [Tags.PRODUCT, Tags.ALL],
          exact: false,
        });
        toast.success(result?.message, { id: loadingId });
      } else {
        toast.error(result?.message || "A Server Error Occurred", {
          id: loadingId,
        });
      }
    } catch (error: any) {
      toast.error(error?.message || "A Client Error Occurred", {
        id: loadingId,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto flex items-stretch gap-2">
      <Input
        type="url"
        placeholder="Enter URL to scrape"
        className="!text-xl rounded-none text-sky-600 placeholder:text-slate-400 py-2 h-auto"
        ref={ref}
      />
      <Button
        className="rounded-none h-auto px-8"
        variant="outline"
        type="button"
        disabled={isPending}
        onClick={handleClick}
      >
        {isPending ? <LoaderCircle className="animate-spin" /> : "Start"}
      </Button>
    </div>
  );
};

export default UrlInputBox;
