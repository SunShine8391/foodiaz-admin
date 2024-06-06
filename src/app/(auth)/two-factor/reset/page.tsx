import { Heading } from "@/components/elements/headings";
import { ResetFormViewDynamic } from "./reset-form-view.dynamic";
import { Text } from "@/components/elements/typography";

export default function ResetPage() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col justify-center items-center gap-10 w-134.25 px-2 sm:px-0">
        <div className="flex flex-col items-center justify-center gap-4">
          <Heading level={4} className="text-white">
            Reset Two-Factor Authentication
          </Heading>
          <Text level={"sub"} className="text-white text-center w-89.5">
            Enter the backup code that you saved when enabling two-factor
            authentication
          </Text>
        </div>
        <div className="w-89.5">
          <ResetFormViewDynamic />
        </div>
      </div>
    </div>
  );
}
