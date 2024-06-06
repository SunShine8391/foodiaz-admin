import type { PropsWithChildren } from "react";

import { m } from "framer-motion";

import { cn } from "@/lib/utils";

export const FadeInTransition = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className={cn("w-full", className)}
    >
      {children}
    </m.div>
  );
};

export default FadeInTransition;
