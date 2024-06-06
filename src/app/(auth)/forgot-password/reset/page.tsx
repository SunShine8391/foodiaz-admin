import { Heading } from "@/components/elements/headings";
import { Text } from "@/components/elements/typography";
import ResetForm from "./reset-form-view";
import { verify } from "jsonwebtoken";

const secret = process.env.SECRET || "";

export default function ResetPage({
  searchParams: {
    token
  }
}: {
  searchParams: {
    token: string | undefined;
  }
}) {
  let redirect = !token;

  if (token) {
    try {
      verify(token, secret);
    } catch {
      redirect = true;
    }
  }
  
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col justify-center items-center gap-8 w-89.5 px-2 sm:px-0">
        <div className="flex flex-col items-center justify-center gap-4">
          <Heading level={4} className="text-white">
            New Password
          </Heading>
          <Text level={"sub"} className="text-white">
            Enter a new password and confirm it
          </Text>
        </div>
        <ResetForm redirect={redirect} token={token} />
      </div>
    </div>
  );
}
