/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tags } from "@/constants/tags";
import { useScrapeMutation } from "@/lib/modules/scrape/scrape.query";
import { useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";
import LoadingImage from "../../../../assets/images/scrape-loading.gif";
import Image from "next/image";

type TProps = {
  setResult: (data: any) => void;
};

const UrlInputBox = ({ setResult }: TProps) => {
  const searchParams = useSearchParams();

  let defaultValue = "";
  if (searchParams.has("url")) {
    defaultValue = decodeURIComponent(searchParams.get("url") as string) || "";
  }

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
          queryKey: [Tags.PRODUCT],
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
    <div>
      <div className="max-w-2xl mx-auto flex items-stretch gap-2">
        <Input
          type="url"
          placeholder="Enter URL to scrape"
          className="!text-xl rounded-none text-sky-600 placeholder:text-slate-400 py-2 h-auto"
          ref={ref}
          defaultValue={defaultValue}
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
      {isPending && (
        <div className="mt-5">
          <Image
            src={LoadingImage.src}
            alt="Scrape Loading"
            height={166 * 2}
            width={220 * 2}
            className="mx-auto rounded-md"
          />
          <p className="text-center">Scraping...</p>
        </div>
      )}
    </div>
  );
};

export default UrlInputBox;
