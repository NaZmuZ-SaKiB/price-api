/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSignInMutation } from "@/lib/modules/auth/auth.query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  token: z.string().min(1),
});

const SignInForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const { mutateAsync: signIn, isPending } = useSignInMutation();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await signIn(values);

      if (result?.success) {
        toast.success(result?.message);

        router.push("/");
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
        className="space-y-4 w-[min(500px,100%)] max-w-lg mx-auto py-10"
      >
        <h1 className="text-3xl font-semibold mb-8 text-center">Price Api</h1>

        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Your Api Key"
                  className="rounded-none"
                  type="password"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} className="rounded-none" type="submit">
          {isPending ? "Getting in..." : "Get In"}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
