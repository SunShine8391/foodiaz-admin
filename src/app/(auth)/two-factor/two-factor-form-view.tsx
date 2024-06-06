"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { ButtonLoadingSpinner } from "@/components/elements/loading";
import FadeInTransition from "@/components/elements/motion/fade-in-transition";
import ReactCodeInput from "react-code-input";
import { Text } from "@/components/elements/typography";

const TwoFactorForm = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [code, setCode] = useState<string>();

  const handleVerifyCode = useCallback(() => {
    if (code?.length && code.length < 6) {
      setShowMessage(true);
      return;
    }
    setIsLoading(true);

    if (code === "123456") {
      router.push(routes.user.management);
    }

    setIsLoading(false);
  }, [code, router]);

  return (
    <FadeInTransition className="flex w-full flex-col gap-8 items-center justify-center lg:max-w-md">
      <div className="flex flex-col gap-1 w-full">
        <ReactCodeInput
          inputMode="numeric"
          name="two-factor"
          type="number"
          fields={6}
          className="!grid grid-cols-6 gap-3 grid-rows-1"
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
          <Text className="text-destructive transition-all">
            Please input your code.
          </Text>
        )}
      </div>

      <div className="flex flex-col w-full gap-4">
        <Button
          className="w-full"
          disabled={isLoading}
          onClick={handleVerifyCode}
        >
          <ButtonLoadingSpinner isLoading={isLoading} />
          VERIFY
        </Button>
        <Button variant={"link"} asChild className="text-white">
          <Link href={routes.auth.resetTwoFactor}>
            RESET TWO-FACTOR AUTHENTICATION
          </Link>
        </Button>
      </div>
    </FadeInTransition>
  );
};

export default TwoFactorForm;
