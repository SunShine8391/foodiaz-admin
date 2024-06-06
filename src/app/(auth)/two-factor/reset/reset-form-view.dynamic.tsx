import dynamic from "next/dynamic";

export const ResetFormViewDynamic = dynamic(
  () => import("./reset-form-view").then((mod) => mod.default),
  { ssr: false }
);
