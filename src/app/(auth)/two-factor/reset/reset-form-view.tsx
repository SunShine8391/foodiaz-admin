"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

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
import { ButtonLoadingSpinner } from "@/components/elements/loading";
import FadeInTransition from "@/components/elements/motion/fade-in-transition";

export const resetFormSchema = z.object({
  code: z
    .string({
      required_error: "Backup Code is required",
    })
    .min(1, "Please enter backup code."),
});

export type ResetFormData = z.infer<typeof resetFormSchema>;

const ResetForm = () => {
  const router = useRouter();
  const searchParam = useSearchParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const loginForm = useForm<ResetFormData>({
    resolver: zodResolver(resetFormSchema),
  });

  async function onSubmit(values: ResetFormData) {
    console.log(values);
    router.push(routes.user.management);
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
            name="code"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-white">Backup Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter backup code"
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
              VERIFY
            </Button>
            <Button variant={"link"} className="text-white" asChild>
              <Link href={routes.auth.twoFactorAuthentication}>BACK</Link>
            </Button>
          </div>
        </form>
      </Form>
    </FadeInTransition>
  );
};

export default ResetForm;
