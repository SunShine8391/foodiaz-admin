"use client";

import { ButtonLoadingSpinner } from "@/components/elements/loading";
import FadeInTransition from "@/components/elements/motion/fade-in-transition";
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
import { routes } from "@/config/routes";
import { sendResetPasswordCode } from "@/lib/firebase";
import { FirebaseError } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export const forgotPasswordFormSchema = z.object({
  emailAddress: z
    .string({
      required_error: "Email address is required",
    })
    .email("Please enter a valid email address"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;

const UserLoginForm = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginForm = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordFormSchema),
  });

  async function onSubmit(values: ForgotPasswordFormData) {
    setIsLoading(true);
    try {
      await sendResetPasswordCode(values.emailAddress);
      router.push(routes.auth.forgotPasswordCode + '?email=' + values.emailAddress);
    } catch (err) {
      toast.error((err as FirebaseError).userDisplayMessage);
    }
    setIsLoading(false);
  }

  return (
    <FadeInTransition className="flex w-full items-center justify-center lg:max-w-lg">
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onSubmit)}
          className="flex w-full max-w-sm flex-col items-center gap-8 xl:max-w-md"
        >
          <FormField
            control={loginForm.control}
            name="emailAddress"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="mail@example.com"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              <ButtonLoadingSpinner isLoading={isLoading} />
              SEND CODE
            </Button>
            <Button variant={"link"} asChild className="text-white">
              <Link href={routes.auth.signIn}>BACK TO LOGIN</Link>
            </Button>
          </div>
        </form>
      </Form>
    </FadeInTransition>
  );
};

export default UserLoginForm;
