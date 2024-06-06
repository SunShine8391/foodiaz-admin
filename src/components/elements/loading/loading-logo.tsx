import Image from "next/image";

import { imagePaths } from "@/config/image-paths";

export const LoadingLogoFullPage = ({
  showLoadingText,
}: {
  showLoadingText?: boolean;
}) => {
  return (
    <div className="grid h-full w-full place-items-center gap-4 bg-background">
      <div className="flex h-full w-full items-center justify-center">
        <div className="relative flex items-center justify-center justify-self-center">
          <Image
            src={imagePaths.auth.logo}
            alt="Yolohealth Animated Logo"
            width={350}
            height={375}
            priority
          />
        </div>
        {showLoadingText ? (
          <div className="text-center text-base font-medium leading-6 tracking-wide text-foreground">
            Loading...
          </div>
        ) : null}
      </div>
    </div>
  );
};

export const LoadingLogo = ({ className }: { className?: string }) => {
  return (
    <div className="relative flex items-center justify-center justify-self-center">
      <Image
        src={imagePaths.auth.logo}
        alt="Yolohealth Animated Logo"
        width={140}
        height={150}
        className={className}
        priority
      />
    </div>
  );
};
