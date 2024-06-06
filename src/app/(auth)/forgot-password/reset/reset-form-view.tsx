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
import { resetPasswordUsingToken } from "@/lib/firebase";
import { FirebaseError } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeNoneIcon } from "@radix-ui/react-icons";
import { EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export const resetFormSchema = z.object({
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
  confirm: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
});

export type ResetFormData = z.infer<typeof resetFormSchema>;

const ResetForm = ({
  redirect,
  token
}: {
  redirect: boolean;
  token: string | undefined;
}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const loginForm = useForm<ResetFormData>({
    resolver: zodResolver(resetFormSchema),
  });

  async function onSubmit(values: ResetFormData) {
    if (values.confirm !== values.password) {
      return toast.error("Confirm password mismatch.");
    }

    setIsLoading(true);
    try {
      if (token) {
        const result = await resetPasswordUsingToken(token, values.password);
        if (result.success) {
          toast.success("Your password has changed successfully!");
          router.push(routes.auth.signIn);
        } else {
          toast.error(result.error);
        }
      } else {
        router.push(routes.auth.signIn);
      }
    } catch (err) {
      console.log(err);
      toast.error((err as FirebaseError).userDisplayMessage);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (redirect || !token) {
      router.push(routes.auth.signIn);
    }
  }, [token, redirect]);

  return (
    <FadeInTransition className="flex w-full items-center justify-center lg:max-w-lg">
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onSubmit)}
          className="flex w-full max-w-sm flex-col items-center gap-8 xl:max-w-md"
        >
          <div className="w-full flex flex-col gap-4">
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-white">New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="New Password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                        value={field.value ?? ""}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
                        {showPassword ? (
                          <EyeNoneIcon
                            className="h-5 w-5"
                            onClick={() => setShowPassword((prev) => !prev)}
                          />
                        ) : (
                          <EyeIcon
                            className="h-5 w-5"
                            onClick={() => setShowPassword((prev) => !prev)}
                          />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="confirm"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-white">Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Confirm Password"
                        type={showConfirmPassword ? "text" : "password"}
                        {...field}
                        value={field.value ?? ""}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
                        {showConfirmPassword ? (
                          <EyeNoneIcon
                            className="h-5 w-5"
                            onClick={() =>
                              setShowConfirmPassword((prev) => !prev)
                            }
                          />
                        ) : (
                          <EyeIcon
                            className="h-5 w-5"
                            onClick={() =>
                              setShowConfirmPassword((prev) => !prev)
                            }
                          />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            <ButtonLoadingSpinner isLoading={isLoading} />
            SUBMIT
          </Button>
        </form>
      </Form>
    </FadeInTransition>
  );
};

export default ResetForm;
