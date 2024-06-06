import dynamic from "next/dynamic";

export const SignInFormViewDynamic = dynamic(
  () => import("./signin-form-view").then((mod) => mod.default),
  { ssr: false }
);
