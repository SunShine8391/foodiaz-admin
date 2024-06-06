"use client"

import { Heading } from "@/components/elements/headings";
import UserLoginForm from "./code-form-view";
import { Text } from "@/components/elements/typography";

export default function CodePage() {
  const email = localStorage.getItem('changeEmail');

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col justify-center items-center gap-8 w-89.5 px-2 sm:px-0">
        <div className="flex flex-col items-center justify-center gap-4">
          <Heading level={4} className="text-white">
            Forgot Password
          </Heading>
          <Text level={"sub"} className="text-white text-center">
            Enter the code we&apos;ve sent to {email}
          </Text>
        </div>
        <UserLoginForm />
      </div>
    </div>
  );
}
