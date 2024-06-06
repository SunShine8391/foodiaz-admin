import dynamic from "next/dynamic";

export const TwoFactorFormViewDynamic = dynamic(
  () => import("./two-factor-form-view").then((mod) => mod.default),
  { ssr: false }
);
