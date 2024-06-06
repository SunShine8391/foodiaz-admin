import { Heading } from "@/components/elements/headings";
import UserLoginForm from "./forgot-password-form-view";
import { Text } from "@/components/elements/typography";

export default function ForgotPasswordPage() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col justify-center items-center gap-8 w-89.5 px-2 sm:px-0">
        <div className="flex flex-col items-center justify-center gap-4">
          <Heading level={4} className="text-white">
            Forgot Password
          </Heading>
          <Text level={"sub"} className="text-white text-center">
            Enter the email associated with the admin account and we’ll send a
            code to reset the password
          </Text>
        </div>
        <UserLoginForm />
      </div>
    </div>
  );
}
