"use client";

import { useCallback, useState } from "react";
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
import { EyeIcon } from "lucide-react";
import { EyeNoneIcon } from "@radix-ui/react-icons";
import { signInUserWithEmailAndPass } from "@/lib/firebase";
import { FirebaseError } from "@/types";
import { userMessages } from "@/config/message";

export const userLoginFormSchema = z.object({
  emailAddress: z
    .string({
      required_error: "Email address is required",
    })
    .email("Please enter a valid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
});

export type UserLoginFormData = z.infer<typeof userLoginFormSchema>;

const UserLoginForm = () => {
  const router = useRouter();
  const searchParam = useSearchParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const loginForm = useForm<UserLoginFormData>({
    resolver: zodResolver(userLoginFormSchema),
  });

  async function onSubmit(values: UserLoginFormData) {
    setIsLoading(true);
    try {
      await signInUserWithEmailAndPass(values.emailAddress, values.password);

      toast.success(userMessages.LOGIN_SUCCESS);

      router.push(routes.user.management);
    } catch (err: any) {
      toast.error((err as FirebaseError).userDisplayMessage);
    }
    setIsLoading(false);
  }

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

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
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter Password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                        value={field.value ?? ""}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
                        {showPassword ? (
                          <EyeNoneIcon
                            className="h-5 w-5"
                            onClick={togglePasswordVisibility}
                          />
                        ) : (
                          <EyeIcon
                            className="h-5 w-5"
                            onClick={togglePasswordVisibility}
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
          <div className="flex flex-col gap-4 w-full">
            <Button type="submit" className="w-full gap-1" disabled={isLoading}>
              <ButtonLoadingSpinner isLoading={isLoading} />
              LOG IN
            </Button>
            <Button variant={"link"} asChild className="text-white">
              <Link href={routes.auth.forgotPassword}>FORGOT PASSWORD</Link>
            </Button>
          </div>
        </form>
      </Form>
    </FadeInTransition>
  );
};

export default UserLoginForm;
