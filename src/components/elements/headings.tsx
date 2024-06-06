import { createElement, forwardRef, memo } from "react";
import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";

import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const headingVariants = cva("font-normal font-montserrat block", {
  variants: {
    level: {
      lgDisplay: "text-7xl lg:text-8xl text-accent-foreground",
      mdDisplay: "text-6xl lg:text-7xl text-accent-foreground",
      smDisplay: "text-5xl lg:text-6xl text-accent-foreground",
      xsDisplay: "text-4xl lg:text-5xl text-accent-foreground",
      1: "text-4xl sm:text-5xl lg:text-6xl text-secondary-foreground",
      2: "text-3xl sm:text-4xl lg:text-5xl text-secondary-foreground",
      3: "text-2xl sm:text-3xl lg:text-4xl text-secondary-foreground",
      4: "text-xl sm:text-2xl lg:text-3xl text-secondary-foreground sm:font-semibold",
      5: "text-lg leading-lgTitle sm:text-xl lg:text-2xl text-secondary-foreground",
      6: "text-lg leading-lgTall sm:leading-lgTitle md:text-xl text-secondary-foreground",
      sub: "text-base leading-baseTall md:text-lg md:leading-lgTall text-muted-foreground tracking-wide",
      "7": "text-2xl font-semibold not-italic tracking-tight text-[#333]",
      "8": "font-medium not-italic text-base text-[#333]",
      "9": "leading-[22px] font-semibold not-italic text-base text-center text-[#333]",
      "10": "text-[#919191] text-center font-medium not-italic leading-5 text-xs",
      "11": "font-medium text-sm not-italic text-[#333]",
      "12": "leading-8 text-[32px] font-semibold not-italic",
      "13": "text-xl not-italic font-semibold leading-6",
      "14": "text-sm font-normal not-italic text-white",
      "15": "font-semibold text-[20px] not-italic tracking-tight leading-6",
      "16": "text-[14px] leading-5 not-italic text-[#333333] font-medium",
      "17": "text-sm font-normal not-italic text-[#919191]",
      "18": "text-4xl font-semibold not-italic text-[#333333]",
    },
  },
  defaultVariants: {
    level: 1,
  },
});

interface HeadingProps
  extends ComponentPropsWithoutRef<"h1">,
    VariantProps<typeof headingVariants> {}

export const Heading = memo(
  forwardRef<HTMLHeadingElement, HeadingProps>(
    ({ level = 2, className, ...props }, _ref) => {
      // const C = level === "sub" ? "p" : `h${level}`;
      const C = typeof level !== "number" ? "span" : `h${level}`;
      return createElement(C, {
        ref: _ref,
        className: cn(headingVariants({ level: level }), className),
        ...props,
      });
    }
  )
);

Heading.displayName = "Heading";
