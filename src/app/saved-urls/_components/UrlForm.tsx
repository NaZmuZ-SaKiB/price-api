/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tags } from "@/constants/tags";
import { useUrlCreateMutation } from "@/lib/modules/url/url.query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  url: z.string().min(1),
});

const UrlForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutateAsync: createUrl, isPending } = useUrlCreateMutation();

  const router = useRouter();

  const queryClient = useQueryClient();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await createUrl(values);

      if (result?.success) {
        toast.success(result?.message);
        queryClient.invalidateQueries({
          queryKey: [Tags.URL, Tags.ALL],
          exact: false,
        });

        router.push("/saved-urls");
      } else {
        toast.error(result?.message || "A Server Error Occured.");
      }
    } catch (error: any) {
      toast.error(error?.message || "A Client Error Occured.");
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-lg mx-auto py-10"
      >
        <h1 className="text-3xl font-semibold mb-8">Save URL</h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  className="rounded-none"
                  placeholder="Name"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Give a name to easily identify this URL
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input
                  className="rounded-none"
                  placeholder="URL"
                  type="text"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} className="rounded-none" type="submit">
          {isPending ? "Saving..." : "Save Url"}
        </Button>
      </form>
    </Form>
  );
};

export default UrlForm;
