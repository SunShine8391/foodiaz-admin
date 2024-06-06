import { imagePaths } from "@/config/image-paths";
import Image from "next/image";
import { SignInFormViewDynamic } from "./signin-form-view.dynamic";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col justify-center items-center gap-10 w-89.5 px-2 sm:px-0">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={imagePaths.auth.logo}
            width={300}
            height={84}
            alt="Foodiaz Logo"
          />
        </div>
        <SignInFormViewDynamic />
      </div>
    </div>
  );
}
