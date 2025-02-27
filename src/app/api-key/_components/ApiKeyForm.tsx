/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { cn } from "@/lib/utils";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import generateRandomString from "@/utils/generateRandomString";
import { useTokenCreateMutation } from "@/lib/modules/token/token.query";
import { useQueryClient } from "@tanstack/react-query";
import { Tags } from "@/constants/tags";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1),
  access: z.enum(["user", "admin"]),
  token: z.string().min(1).optional(),
  exp: z.coerce.date(),
});

const ApiKeyForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      access: "user",
      token: generateRandomString(16),
    },
  });

  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutateAsync: createToken, isPending } = useTokenCreateMutation();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await createToken(values);

      if (result?.success) {
        toast.success(result?.message);
        queryClient.invalidateQueries({
          queryKey: [Tags.TOKEN, Tags.ALL],
          exact: false,
        });

        router.push("/api-key");
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
        <h1 className="text-3xl font-semibold mb-8">Create Api Token</h1>
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
                Give a name to easily identify your token
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="access"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Access</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={"user"}>
                <FormControl>
                  <SelectTrigger className="rounded-none">
                    <SelectValue placeholder="Select Access" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token</FormLabel>
              <FormControl>
                <Input
                  className="rounded-none"
                  placeholder="shadcn"
                  type="text"
                  {...field}
                  readOnly
                />
              </FormControl>
              <FormDescription>Token is auto generated</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="exp"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Expiration Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild className="rounded-none">
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Set a expiration date for the token.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit" className="rounded-none">
          {isPending ? "Creating..." : "Create Token"}
        </Button>
      </form>
    </Form>
  );
};

export default ApiKeyForm;
