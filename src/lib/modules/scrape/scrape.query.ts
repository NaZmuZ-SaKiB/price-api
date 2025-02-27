import { useMutation } from "@tanstack/react-query";
import { scrapeAction } from "./scrape.action";

export const useScrapeMutation = () =>
  useMutation({
    mutationFn: scrapeAction,
  });
