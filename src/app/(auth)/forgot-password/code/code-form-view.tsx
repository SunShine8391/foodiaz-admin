"use client";

import { ButtonLoadingSpinner } from "@/components/elements/loading";
import FadeInTransition from "@/components/elements/motion/fade-in-transition";
import { Text } from "@/components/elements/typography";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { routes } from "@/config/routes";
import { sendResetPasswordCode, verifyPasswordResetOtp } from "@/lib/firebase";
import { FirebaseError } from "@/types";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import ReactCodeInput from "react-code-input";
import { toast } from "sonner";
import * as z from "zod";

export const codeFormSchema = z.object({
  emailAddress: z
    .string({
      required_error: "Email address is required",
    })
    .email("Please enter a valid email address"),
});

export type CodeFormData = z.infer<typeof codeFormSchema>;

const UserLoginForm = () => {
  const router = useRouter();
  const searchParam = useSearchParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [code, setCode] = useState<string>();
  const [resending, setResending] = useState(false);

  const handleVerifyCode = useCallback(async () => {
    if (!code || code.length < 5) {
      setShowMessage(true);
      return;
    }

    setIsLoading(true);
    try {
      const email = searchParam.get('email');
      if (email === null) {
        return toast.error('Invalid email');
      }

      const { success, token, error } = await verifyPasswordResetOtp(email, code);
      if (success) {
        router.push(`${routes.auth.resetPassword}?token=${token}`);
      } else {
        toast.error(error);
      }
    } catch (err) {
      toast.error((err as Error).message);
    }
    setIsLoading(false);
  }, [code, router]);

  const handleResendCode = useCallback(async () => {
    const email = localStorage.getItem('changeEmail');
    if (!email) return toast.error('Unexpected error occured, please try again.');
    setResending(true);
    try {
      await sendResetPasswordCode(email);
      toast.info("Verification code sent successfully!");
    } catch (err) {
      toast.error((err as FirebaseError).userDisplayMessage);
    }
    setResending(false);
  }, []);

  return (
    <FadeInTransition className="flex w-full flex-col gap-8 items-center justify-center lg:max-w-md">
      <div className="flex flex-col gap-1 w-full items-center">
        <ReactCodeInput
          inputMode="numeric"
          name="two-factor"
          type="number"
          fields={5}
          className="!grid grid-cols-5 gap-3 grid-rows-1"
          inputStyle={{
            textAlign: "center",
            height: "56px",
            borderRadius: "8px",
            borderColor: "hsl(var(--input))",
            backgroundColor: "hsl(var(--background))",
            padding: "8px 12px 8px 12px",
            gridColumn: "span 1 / span 1",
            fontSize: "20px",
          }}
          onChange={(e) => {
            setCode(e);
            setShowMessage(false);
          }}
        />
        {showMessage && (
          <Text className="text-destructive transition-all self-start">
            Please input your code.
          </Text>
        )}
      </div>
      <div className="flex flex-col w-full gap-4 justify-center">
        <Button
          className="w-full"
          disabled={isLoading}
          onClick={handleVerifyCode}
        >
          <ButtonLoadingSpinner isLoading={isLoading} />
          VERIFY
        </Button>
        <Button variant={"link"} asChild className="text-white">
          <Link href={routes.auth.forgotPassword}>CHANGE EMAIL</Link>
        </Button>
        <div className="flex flex-row items-center justify-center">
          <Text className="text-white">Didn&#39;t receive it?</Text>
          <Button
            disabled={resending}
            variant={"link"}
            className="text-white"
            onClick={handleResendCode}
          >
            {resending && <LoadingSpinner className="w-3" />}
            SEND AGAIN
          </Button>
        </div>
      </div>
    </FadeInTransition>
  );
};

export default UserLoginForm;
